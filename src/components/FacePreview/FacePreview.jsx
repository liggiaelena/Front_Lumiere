import './FacePreview.css'

const checklist = [
  'Rosto bem iluminado e centralizado',
  'Sem óculos ou acessórios cobrindo o rosto',
  'Expressão neutra, olhando para a frente',
  'Maquiagem removida para melhor resultado',
]

export default function FacePreview({ imageUrl, onAnalyze, onChangePhoto }) {
  return (
    <div className="face-preview">
      <div className="face-preview__layout">
        <div className="face-preview__image-wrap">
          <img
            src={imageUrl}
            alt="Foto selecionada para análise"
            className="face-preview__image"
          />
        </div>

        <div className="face-preview__info">
          <div>
            <h2 className="face-preview__title">Pronto para analisar?</h2>
            <ul className="face-preview__checklist">
              {checklist.map((item) => (
                <li key={item} className="face-preview__checklist-item">
                  <svg
                    className="face-preview__check-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="face-preview__actions">
            <button
              className="face-preview__btn face-preview__btn--primary"
              onClick={onAnalyze}
              type="button"
            >
              Analisar pele
            </button>
            <button
              className="face-preview__btn face-preview__btn--ghost"
              onClick={onChangePhoto}
              type="button"
            >
              Trocar foto
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
