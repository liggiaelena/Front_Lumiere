import './AnalysisJobLoading.css'

const COPY = {
  uploading: ['Uploading your photo', 'Your analysis will begin shortly.'],
  queued: ['Waiting to start', 'Your photo is safely queued for analysis.'],
  predicting_local: ['Analyzing your photo', 'Detecting facial regions, skin tone, and visible conditions.'],
  analyzing_regions: ['Analyzing facial regions', 'Combining observations from each facial region.'],
}

export default function AnalysisJobLoading({ status }) {
  const stage = status?.analysis_stage || status?.analysis_status || 'queued'
  const [title, description] = COPY[stage] || COPY.queued
  return (
    <section className="analysis-job-loading" role="status" aria-live="polite">
      <div className="analysis-job-loading__spinner" aria-hidden="true" />
      <h2>{title}</h2>
      <p>{description}</p>
      {stage === 'queued' && status?.queue_position && (
        <p className="analysis-job-loading__queue">Queue position: {status.queue_position}</p>
      )}
      <div className="analysis-job-loading__steps" aria-label="Analysis progress">
        <span className={stage !== 'queued' ? 'is-complete' : 'is-active'}>Uploaded</span>
        <span className={stage === 'predicting_local' ? 'is-active' : stage === 'analyzing_regions' ? 'is-complete' : ''}>Local analysis</span>
        <span className={stage === 'analyzing_regions' ? 'is-active' : ''}>Region analysis</span>
      </div>
      <small>This page updates automatically. You do not need to upload again.</small>
    </section>
  )
}
