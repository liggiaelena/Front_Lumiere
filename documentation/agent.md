
# Role & Goal
You are an expert Senior Frontend Engineer and UI/UX Design System specialist. Your goal is to eliminate all hardcoded/legacy colors and typography values within the Lumière project, refactoring the codebase to use a unified Design Token system as specified below.

---

## Task 1: Expand Global Design Tokens in `src/App.css`

Locate the `:root` pseudo-class in `src/App.css` and append the following new design tokens under their respective sections. Do not overwrite existing tokens unless specified.

```css
:root {
  /* [APPEND] 3. Functional/Auxiliary Colors - Add Warning States */
  --color-warning: #D97706;
  --color-warning-light: #FFF4E5;
  --color-warning-text: #3D2300;

  /* [APPEND] 5. Hover & Overlay Variants */
  --color-accent-hover: #c49363;
  --color-overlay: rgba(61, 47, 32, 0.65);

  /* [APPEND] 6. Spacing Scale Tokens */
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
}

```

---

## Task 2: Critical Refactoring of `FaceScanningAnimation.css`

Purge all legacy high-saturation pink (`#E91E8C`) and purple (`#6B3FA0`) colors that contradict the warm chestnut/amber brand identity.

1. **Remove Fallbacks**: Replace any `var(--color-*, #6B3FA0)` or `var(--color-*, #E91E8C)` with clean, fallback-free `var(--color-primary)` or `var(--color-accent)`.
2. **Convert Glow/Shadow Effects**:
* Change pink scanline glow `rgba(233, 30, 140, 0.6)` to an Amber Gold glow using `rgba(212, 163, 115, 0.6)` (or `var(--color-accent)` with alpha).
* Change legacy purple shadow `rgba(107, 63, 160, 0.15)` to Warm Chestnut shadow using `rgba(140, 98, 57, 0.15)`.



---

## Task 3: Cleanup `ConditionsPanel.css` Legacy Fallbacks

1. **Remove all custom fallbacks** that hardcode the old muddy orange color (`#c78466`), old text (`#34231d`), and generic values.
* *Example*: Change `var(--color-accent, #c78466)` ➡️ `var(--color-accent)`.
* *Example*: Change `var(--color-text, #34231d)` ➡️ `var(--color-text)`.


2. **Replace Hardcoded Colors**:
* Change background `#fffaf7` to `var(--color-surface)`.
* Change border `#f0dfd6` to `var(--color-border)` or `var(--color-accent-light)`.



---

## Task 4: Tokenize Alerts and Status Components

Refactor hardcoded alert/warning configurations in `AnalysisResult.css` and `Recommendations.css` to use the newly expanded functional tokens.

1. **In `src/components/AnalysisResult/AnalysisResult.css**`:
* Replace Medical Alerts/Restrictions styles (`#f5c542`, `#d97706`, `#fff4e5`, `#3d2300`) with the unified warning system:
* `background-color` ➡️ `var(--color-warning-light)`
* `border-color` ➡️ `var(--color-warning)`
* `color` ➡️ `var(--color-warning-text)`


* Replace pop-up overlays (`rgba(61, 47, 32, 0.65)`) with `var(--color-overlay)`.


2. **In `src/components/Recommendations/Recommendations.css**`:
* Replace the hardcoded SPF Warning Banner style with the standard warning variables: `var(--color-warning-light)`, `var(--color-warning)`, and `var(--color-warning-text)`.



---

## Task 5: Standardize Button Hover Colors across Components

Find all instances of hardcoded hover color `#c49363` across the following component CSS files and replace them with `var(--color-accent-hover)`:

* `src/components/UploadZone/UploadZone.css`
* `src/components/FacePreview/FacePreview.css`
* `src/components/ErrorBoundary/ErrorBoundary.css`
* `src/components/CameraCapture/CameraCapture.css`

---

## Strict Constraints for the Agent

* Do NOT alter any class names or HTML structures.
* Do NOT add external third-party fonts; adhere strictly to `var(--font-sans)`.
* Ensure all updated CSS properties remain highly readable and properly formatted.


