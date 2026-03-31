# Skin Analyzer — Frontend

Interface React para análise de tom de pele via upload ou câmera.
 
## Pré-requisitos

- Node.js 18+
- npm 9+

## Instalação

```bash
cd skin-analyzer
npm install
```

## Rodando em desenvolvimento

```bash
npm run dev
```

Acesse em: **http://localhost:5173**

## Build para produção

```bash
npm run build
npm run preview   # preview local do build em http://localhost:4173
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (use `.env.example` como base):

```env
VITE_API_URL=http://localhost:8000
```

| Variável | Padrão | Descrição |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8000` | URL base do backend FastAPI |

## Modo mock (sem backend)

Por padrão o app roda com dados simulados — nenhum backend necessário.

Para ativar o backend real, edite [`src/hooks/useAnalysis.js`](src/hooks/useAnalysis.js):

```js
const USE_MOCK = false  // troque de true para false
```

## Onde cada parte roda

| Serviço | URL | Observação |
|---|---|---|
| Frontend (dev) | http://localhost:5173 | `npm run dev` |
| Frontend (preview) | http://localhost:4173 | `npm run preview` |
| Backend (esperado) | http://localhost:8000 | Projeto `backend-skin-analyzer` |
| API endpoint | http://localhost:8000/api/analyze | POST multipart/form-data |

## Estrutura resumida

```
src/
├── components/     # UploadZone, CameraCapture, FacePreview,
│                   # AnalysisResult, RegionCard, ToneComparison, LoadingSpinner
├── hooks/          # useAnalysis, useCamera
├── services/       # api.js (Axios)
├── utils/          # colorUtils.js (labels em pt-BR)
├── mocks/          # analysisResponse.js (JSON de exemplo)
├── App.jsx
└── main.jsx
```

## Fluxo da aplicação

```
Upload / Câmera → Preview → Analisando... → Resultado
```

1. Usuário faz upload de uma foto (JPG/PNG/WebP, máx. 10MB) ou tira foto pela câmera
2. Visualiza a imagem e confirma antes de enviar
3. App exibe spinner enquanto aguarda resposta do backend
4. Resultado exibe tom Fitzpatrick, subtom, análise por região e imperfeições detectadas
