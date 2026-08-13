import argparse, hashlib, json, re
from collections import Counter, defaultdict
from pathlib import Path

import cv2
import numpy as np
from PIL import Image


def base_name(name):
    return re.sub(r"\.rf\.[0-9a-f]+$", "", Path(name).stem, flags=re.I)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("root", type=Path)
    args = ap.parse_args()
    detector = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    records, invalid, empty = [], [], []
    categories, by_base_split = {}, defaultdict(set)
    for split in ("train", "valid", "test"):
        data = json.loads((args.root / split / "_annotations.coco.json").read_text(encoding="utf-8"))
        categories.update({c["id"]: c["name"] for c in data["categories"]})
        by_image = defaultdict(list)
        for ann in data["annotations"]:
            by_image[ann["image_id"]].append(ann)
        for info in data["images"]:
            path = args.root / split / info["file_name"]
            with Image.open(path) as im:
                im.load(); width, height = im.size
            image = cv2.imread(str(path))
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            faces = detector.detectMultiScale(gray, 1.1, 4, minSize=(40, 40))
            anns = by_image[info["id"]]
            if not anns: empty.append(f"{split}/{path.name}")
            areas = defaultdict(float); counts = Counter()
            for ann in anns:
                name = categories[ann["category_id"]]
                areas[name] += float(ann.get("area", 0)); counts[name] += 1
                seg = ann.get("segmentation") or []
                if not seg or any(not isinstance(p, list) or len(p) < 6 or len(p) % 2 for p in seg):
                    invalid.append({"split": split, "id": ann.get("id")})
            base = base_name(path.name); by_base_split[base].add(split)
            records.append({"split": split, "file": path.name, "base": base,
                            "vitiligo_fraction": areas["Vitiligo_Patch"] / (width * height),
                            "healthy_fraction": areas["Healthy_Skin"] / (width * height),
                            "vitiligo_instances": counts["Vitiligo_Patch"],
                            "healthy_instances": counts["Healthy_Skin"], "faces": len(faces),
                            "face_ratio": max((w*h for x,y,w,h in faces), default=0)/(width*height),
                            "sha256": hashlib.sha256(path.read_bytes()).hexdigest()})
    sha = defaultdict(list)
    for r in records: sha[r["sha256"]].append(f"{r['split']}/{r['file']}")
    vf = np.array([r["vitiligo_fraction"] for r in records]); hf = np.array([r["healthy_fraction"] for r in records])
    report = {
        "images": len(records), "annotations": sum(r["vitiligo_instances"]+r["healthy_instances"] for r in records),
        "category_instance_counts": dict(Counter({"Vitiligo_Patch": sum(r["vitiligo_instances"] for r in records), "Healthy_Skin": sum(r["healthy_instances"] for r in records)})),
        "category_image_counts": {k: sum(r[f"{k.lower().split('_')[0]}_instances"] > 0 for r in records) for k in ("Vitiligo_Patch", "Healthy_Skin")},
        "unique_source_groups": len(by_base_split), "source_group_multiplicity": dict(Counter(Counter(r["base"] for r in records).values())),
        "cross_split_source_groups": {b: sorted(s) for b,s in by_base_split.items() if len(s)>1},
        "exact_duplicate_groups": [g for g in sha.values() if len(g)>1], "empty_images": empty, "invalid_annotations": invalid,
        "face_detection": {"any_face": sum(r["faces"]>0 for r in records), "face_ratio_ge_10pct": sum(r["face_ratio"]>=.1 for r in records)},
        "vitiligo_area_fraction": {"median_all": float(np.median(vf)), "median_positive": float(np.median(vf[vf>0])), "p95_positive": float(np.percentile(vf[vf>0],95)), "over_60pct": int((vf>.6).sum()), "zero": int((vf==0).sum())},
        "healthy_area_fraction": {"median_positive": float(np.median(hf[hf>0])), "p95_positive": float(np.percentile(hf[hf>0],95)), "zero": int((hf==0).sum())},
    }
    out=args.root/"AUDIT_REFINED_REPORT.json"; out.write_text(json.dumps(report,indent=2),encoding="utf-8"); print(json.dumps(report,indent=2))


if __name__ == "__main__": main()
