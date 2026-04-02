import { useState, useEffect } from 'react'
import './LoadingSpinner.css'

const STEPS = [
  'Detecting face landmarks...',
  'Analyzing forehead...',
  'Analyzing left cheek...',
  'Analyzing right cheek...',
  'Analyzing nose...',
  'Analyzing chin...',
  'Matching foundation shades...',
  'Preparing your results...',
]

export default function LoadingSpinner() {
  const [currentStep, setCurrentStep] = useState(0)
  const [doneSteps, setDoneSteps] = useState([])

  useEffect(() => {
    if (currentStep >= STEPS.length - 1) return
    const timer = setTimeout(() => {
      setDoneSteps((prev) => [...prev, currentStep])
      setCurrentStep((prev) => prev + 1)
    }, 1500)
    return () => clearTimeout(timer)
  }, [currentStep])

  return (
    <div className="loading-steps" role="status" aria-live="polite">
      <div className="loading-steps__spinner" aria-hidden="true" />
      <ul className="loading-steps__list">
        {STEPS.map((step, i) => {
          const isDone = doneSteps.includes(i)
          const isActive = i === currentStep
          const isPending = i > currentStep
          return (
            <li
              key={step}
              className={[
                'loading-steps__item',
                isDone ? 'loading-steps__item--done' : '',
                isActive ? 'loading-steps__item--active' : '',
                isPending ? 'loading-steps__item--pending' : '',
              ].filter(Boolean).join(' ')}
            >
              <span className="loading-steps__icon" aria-hidden="true">
                {isDone ? '✓' : isActive ? '◆' : '○'}
              </span>
              <span className="loading-steps__label">{step}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
