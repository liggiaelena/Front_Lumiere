import { useState, useRef } from 'react'
import './UploadZone.css'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_BYTES = 10 * 1024 * 1024 // 10MB

function validateFile(file) {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return 'Formato inválido. Use JPG, PNG ou WebP.'
  }
  if (file.size > MAX_SIZE_BYTES) {
    return 'Arquivo muito grande. Tamanho máximo: 10MB.'
  }
  return null
}

export default function UploadZone({ onImageSelected, onOpenCamera }) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const inputRef = useRef(null)

  function handleFile(file) {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      setPreviewUrl(null)
      return
    }
    setError(null)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    onImageSelected(file, url)
  }

  function handleDragEnter(e) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragOver(e) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(e) {
    e.preventDefault()
    setIsDragging(false)
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleInputChange(e) {
    const file = e.target.files[0]
    if (file) handleFile(file)
  }

  function handleClick() {
    inputRef.current?.click()
  }

  const zoneClass = [
    'upload-zone',
    isDragging ? 'upload-zone--active' : '',
    error ? 'upload-zone--error' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={zoneClass}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Área de upload de imagem"
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={handleInputChange}
        onClick={(e) => e.stopPropagation()}
      />

      <svg className="upload-zone__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>

      <h2 className="upload-zone__title">Envie uma foto do seu rosto</h2>
      <p className="upload-zone__subtitle">Arraste e solte aqui ou escolha uma opção abaixo</p>

      <div className="upload-zone__actions" onClick={(e) => e.stopPropagation()}>
        <button
          className="upload-zone__btn upload-zone__btn--primary"
          onClick={handleClick}
          type="button"
        >
          Escolher arquivo
        </button>

        <span className="upload-zone__divider">ou</span>

        <button
          className="upload-zone__btn upload-zone__btn--secondary"
          onClick={onOpenCamera}
          type="button"
        >
          Usar câmera
        </button>
      </div>

      <p className="upload-zone__hint">JPG, PNG ou WebP · máx. 10MB</p>

      {error && <p className="upload-zone__error" role="alert">{error}</p>}

      {previewUrl && !error && (
        <div className="upload-zone__preview">
          <img src={previewUrl} alt="Preview da imagem selecionada" className="upload-zone__preview-img" />
        </div>
      )}
    </div>
  )
}
