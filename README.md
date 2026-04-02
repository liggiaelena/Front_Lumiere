# Skin Analyzer — Frontend

React interface for skin tone analysis via photo upload or camera capture.

## Prerequisites

- Node.js 18+
- npm 9+
- Backend running on port 8001 (see `Back_Lumiere`)

## Setup

```bash
cd Front_Lumiere
npm install
npm run dev
```

Open the URL printed in the terminal (e.g. `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # local preview at http://localhost:4173
```

## Environment variables

Optionally create a `.env` file in the project root to override the backend URL:

```env
VITE_API_URL=http://localhost:8001
```

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8001` | Backend FastAPI base URL |

## Features

- Upload a face photo (JPG/PNG/WebP, max 10MB) or take one with the camera
- Skin tone analysis by facial region (forehead, cheeks, nose, chin)
- Fitzpatrick scale classification + undertone detection
- Imperfection detection (pores, acne, shine, sun spots, etc.)
- Foundation shade recommendations (Fenty Beauty, MAC, Maybelline)
- Multi-language support: **EN / PT / FR / 中文 / 繁中 / TR**

## App flow

```
Upload / Camera → Preview → Analyzing... → Results + Foundation Matches
```

## Project structure

```
src/
├── components/
│   ├── AnalysisResult/     # Main results screen
│   ├── CameraCapture/      # Camera modal
│   ├── FacePreview/        # Photo confirmation screen
│   ├── LoadingSpinner/     # Loading state
│   ├── Recommendations/    # Foundation shade cards
│   ├── RegionCard/         # Per-region analysis card
│   ├── ToneComparison/     # Cross-region color comparison
│   └── UploadZone/         # Drag-and-drop / file upload
├── hooks/
│   ├── useAnalysis.js      # API call + state management
│   └── useCamera.js        # Camera stream management
├── i18n/
│   ├── LanguageContext.jsx # Language context provider
│   └── translations.js     # All UI strings in 6 languages
├── services/
│   └── api.js              # Axios instance (base URL config)
├── mocks/
│   └── analysisResponse.js # Sample response for development
├── utils/
│   └── colorUtils.js       # Helper functions
├── App.jsx
└── main.jsx
```

## Service URLs

| Service | URL |
|---|---|
| Frontend (dev) | http://localhost:5173 |
| Frontend (preview) | http://localhost:4173 |
| Backend | http://localhost:8001 |
| API endpoint | http://localhost:8001/api/analyze |
