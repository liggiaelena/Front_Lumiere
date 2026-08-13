import argparse
import hashlib
import json
from collections import Counter, defaultdict
from pathlib import Path

import cv2
from PIL import Image


def dhash(image: Image.Image) -> str:
    gray = image.convert("L").resize((9, 8))
    pixels = list(gray.getdata())
    value = 0
    for y in range(8):
        for x in range(8):
            value = (value << 1) | (pixels[y * 9 + x] > pixels[y * 9 + x + 1])
    return f"{value:016x}"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("root", type=Path)
    args = parser.parse_args()
    paths = sorted(p for p in args.root.rglob("*") if p.suffix.lower() in {".jpg", ".jpeg", ".png"})
    face_detector = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    rows, corrupt = [], []
    exact, perceptual = defaultdict(list), defaultdict(list)
    for path in paths:
        rel = path.relative_to(args.root).as_posix()
        parts = path.relative_to(args.root).parts
        split = next((p for p in parts if p.lower() in {"train", "val", "valid", "test"}), "unknown")
        label = next((p for p in parts if p.lower() in {"yes", "no"}), "unknown")
        try:
            raw = path.read_bytes()
            with Image.open(path) as im:
                im.load()
                width, height = im.size
                phash = dhash(im)
            bgr = cv2.imread(str(path))
            gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
            faces = face_detector.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=4, minSize=(40, 40))
            face_area = max((w * h for _, _, w, h in faces), default=0) / (width * height)
            digest = hashlib.sha256(raw).hexdigest()
            exact[digest].append(rel)
            perceptual[phash].append(rel)
            rows.append({"path": rel, "split": split.lower(), "label": label.lower(), "width": width,
                         "height": height, "faces": len(faces), "largest_face_ratio": round(face_area, 5)})
        except Exception as exc:
            corrupt.append({"path": rel, "error": str(exc)})

    exact_groups = [v for v in exact.values() if len(v) > 1]
    perceptual_groups = [v for v in perceptual.values() if len(v) > 1]
    cross_split_exact = [g for g in exact_groups if len({next((p for p in x.split("/") if p in {"train", "val", "valid", "test"}), "unknown") for x in g}) > 1]
    cross_label_exact = [g for g in exact_groups if len({next((p for p in x.split("/") if p in {"yes", "no"}), "unknown") for x in g}) > 1]
    report = {
        "root": str(args.root),
        "images": len(paths),
        "readable": len(rows),
        "corrupt": corrupt,
        "counts": dict(Counter(f"{r['split']}/{r['label']}" for r in rows)),
        "dimensions": {"min_width": min((r["width"] for r in rows), default=0), "min_height": min((r["height"] for r in rows), default=0),
                       "max_width": max((r["width"] for r in rows), default=0), "max_height": max((r["height"] for r in rows), default=0)},
        "face_detection": {"at_least_one": sum(r["faces"] > 0 for r in rows), "face_ratio_ge_0_10": sum(r["largest_face_ratio"] >= .10 for r in rows)},
        "duplicates": {"exact_groups": len(exact_groups), "exact_extra_images": sum(len(g) - 1 for g in exact_groups),
                       "perceptual_same_hash_groups": len(perceptual_groups), "perceptual_extra_images": sum(len(g) - 1 for g in perceptual_groups),
                       "cross_split_exact_groups": len(cross_split_exact), "cross_label_exact_groups": len(cross_label_exact),
                       "cross_split_exact_examples": cross_split_exact[:20], "cross_label_exact_examples": cross_label_exact[:20]},
    }
    out = args.root / "AUDIT_REPORT.json"
    out.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(report, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
