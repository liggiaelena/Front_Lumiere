# New vitiligo dataset screening

Dataset: `vitiligo.v1i.coco-segmentation`

Source: https://universe.roboflow.com/sedki/vitiligo-amw4r

License: CC BY 4.0

## Decision

Quarantine. Do not merge the full export into training and do not use its
original validation/test split for model selection.

## Findings

- 2,118 readable 640x640 JPEG files and 4,340 valid COCO polygon annotations.
- No corrupt images, empty image records, missing annotations, or malformed
  polygons were found.
- Although the COCO file declares both `vitiligo` and `Vitiligo`, every image
  annotation uses only `Vitiligo`; the duplicate category definition should be
  normalized during conversion.
- Filename grouping leaves only 468 apparent source images. Most sources occur
  six times; some occur twelve times. There are also exact and perceptual
  duplicate groups.
- Source leakage exists between train/valid and train/test, so the supplied
  metrics and split are not trustworthy.
- The summed annotated-area fraction has median 0.6703; 1,235 images exceed
  60% of the frame. Many samples are lesion-focused crops rather than the
  full-face deployment domain. This distribution can teach the model that a
  large region of ordinary bright skin is vitiligo.
- A local frontal-face detector found 273/2,118 exports. Requiring both a face
  and an annotated fraction between 0.5% and 40% leaves 144 exports, but only
  58 filename-grouped sources. One of these sources also crosses train/valid.
- No exact dHash matches were found against the previously downloaded raw
  vitiligo dataset, although filename-independent near-duplicate and manual
  visual checks remain advisable.

## Safe use

The dataset may be used only as a small supplementary source after one sample
per source is selected, masks are visually checked, and all variants of a
source are assigned to the same patient/source-grouped split. The 58 automated
face-domain candidates are not considered medically approved labels. Human
review should reject collages, before/after composites, makeup examples,
non-frontal faces, false face detections, and masks covering normal skin.

Machine-readable audit: `AUDIT_REPORT.json` in the dataset folder.
