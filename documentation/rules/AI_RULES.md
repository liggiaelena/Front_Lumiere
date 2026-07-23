# Team AI Development Rules

## 1. Design System & CSS Rules (STRICT)
- BEFORE generating or modifying ANY UI components or styling, you MUST reference `documentation/Design System.md`.
- **NO TailwindCSS**: Do NOT use Tailwind classes or JS-exported theme files. This project DOES NOT use Tailwind.
- **NO Hardcoded Colors/Spacing**: Strictly forbid raw hex colors (e.g., `#3B82F6`), named colors (e.g., `white`, `black`, `red`), or arbitrary pixel values.
- **CSS Variables ONLY**: 
  - ALWAYS use defined CSS Custom Properties (e.g., `var(--color-primary)`, `var(--spacing-md)`, `var(--radius-md)`).
  - Use `var(--color-white)` and `var(--color-black)` instead of `#fff`/`#000`.
- **Opacity Handling**: For custom transparent overlays or shadows, use RGB token variants combined with `rgba()`, for example: `rgba(var(--color-primary-rgb), 0.5)`. Do NOT hardcode the 3-digit RGB values.
- **NO Inline Styles**: Do NOT write styles inside JSX elements using the `style={{...}}` attribute. All styles must go into the component's CSS file.

## 2. SPA Architecture & Routing Rules
- **NO react-router-dom**: This is a Single Page Application (SPA). Do NOT install or import `react-router-dom`.
- **State-based Navigation**: All step and screen transitions MUST be managed via `useState` (e.g., controlling `step` and `showCamera` state inside `AppInner` in `src/App.jsx`).
- Keep the state-machine logic clean and modular so it can be easily mapped to Flutter Pages/Navigators in the future.

## 3. Internationalization (i18n) (STRICT)
- ALWAYS use translations from `src/i18n/translations.js` for user-facing text. Do NOT hardcode display text in components.
- **Synchronous Multi-Language Updates**: If you add or modify any translation key, you MUST update all 6 languages (`en`, `pt`, `fr`, `zh`, `tw`, `tr`) in `src/i18n/translations.js` simultaneously to prevent language-switch crashes.
- For dynamic notes returned from backend AI, utilize the `translateNote` helper provided by `useLanguage()`.

## 4. Component Folder Structure (NEW)
- **One Component, One Folder**: Every React component must have its own dedicated directory in `src/components/ComponentName/`.
- Inside the directory, include exactly two matched files: `ComponentName.jsx` (logic) and `ComponentName.css` (styling).
- Always import the CSS file directly at the top of the JSX file: `import './ComponentName.css'`.
- **Deprecated Reference Warning**: Do NOT reference or copy patterns from `src/components/AnalysisResult/`. It is a deprecated component. Refer to `src/components/SkinAnalysisDashboard/` for the latest layout patterns.

## 5. Code Quality Standards
- Check existing reusable UI components (e.g., `LoadingSpinner`) before creating new ones.
- Maintain a clean, readable folder structure following the established architecture.
- Ensure all code follows the team's coding style guidelines (ES6+ modular JavaScript).
