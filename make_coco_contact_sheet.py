import json, random, sys
from collections import defaultdict
from pathlib import Path
import cv2
import numpy as np

root, output = Path(sys.argv[1]), Path(sys.argv[2])
random.seed(17)
items=[]
for split in ("train","valid","test"):
    data=json.loads((root/split/"_annotations.coco.json").read_text(encoding="utf-8"))
    cats={c["id"]:c["name"] for c in data["categories"]}
    anns=defaultdict(list)
    for a in data["annotations"]: anns[a["image_id"]].append(a)
    for info in data["images"]:
        names={cats[a["category_id"]] for a in anns[info["id"]]}
        if "Vitiligo_Patch" in names: items.append((split,info,anns[info["id"]],cats))
sample=random.sample(items,min(36,len(items)))
tiles=[]
for split,info,image_anns,cats in sample:
    img=cv2.imread(str(root/split/info["file_name"])); overlay=img.copy()
    for ann in image_anns:
        if cats[ann["category_id"]]!="Vitiligo_Patch": continue
        for poly in ann.get("segmentation",[]):
            pts=np.asarray(poly,dtype=np.int32).reshape(-1,2); cv2.fillPoly(overlay,[pts],(0,0,255)); cv2.polylines(img,[pts],True,(255,255,255),2)
    img=cv2.addWeighted(img,.72,overlay,.28,0); img=cv2.resize(img,(240,240))
    cv2.putText(img,info["file_name"][:22],(4,232),cv2.FONT_HERSHEY_SIMPLEX,.34,(0,255,0),1,cv2.LINE_AA)
    tiles.append(img)
sheet=np.vstack([np.hstack(tiles[i:i+6]) for i in range(0,len(tiles),6)])
cv2.imwrite(str(output),sheet)
print(output)
