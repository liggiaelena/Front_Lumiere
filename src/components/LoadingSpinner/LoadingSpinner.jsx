import './LoadingSpinner.css'

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <div className="loading-spinner__circle" aria-hidden="true" />
      <p className="loading-spinner__message">{message}</p>
    </div>
  )
}
