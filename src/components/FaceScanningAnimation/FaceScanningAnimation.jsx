import { useState, useEffect, useRef } from 'react'
import './FaceScanningAnimation.css'

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

const REGIONS = [
  { id: 'forehead', label: 'Forehead', startX: 0.25, startY: 0.15, width: 0.5, height: 0.15 },
  { id: 'left_cheek', label: 'Left Cheek', startX: 0.05, startY: 0.4, width: 0.25, height: 0.25 },
  { id: 'right_cheek', label: 'Right Cheek', startX: 0.7, startY: 0.4, width: 0.25, height: 0.25 },
  { id: 'nose', label: 'Nose', startX: 0.35, startY: 0.35, width: 0.3, height: 0.25 },
  { id: 'chin', label: 'Chin', startX: 0.25, startY: 0.65, width: 0.5, height: 0.2 },
]

export default function FaceScanningAnimation({ imageUrl }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [doneSteps, setDoneSteps] = useState([])
  const [activeRegion, setActiveRegion] = useState(null)
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  // Cycle through steps
  useEffect(() => {
    if (currentStep >= STEPS.length - 1) return
    const timer = setTimeout(() => {
      setDoneSteps((prev) => [...prev, currentStep])
      setCurrentStep((prev) => prev + 1)
    }, 1500)
    return () => clearTimeout(timer)
  }, [currentStep])

  // Light up regions based on step (2-6 are region steps)
  useEffect(() => {
    if (currentStep >= 1 && currentStep <= 5) {
      setActiveRegion(REGIONS[currentStep - 1].id)
    } else {
      setActiveRegion(null)
    }
  }, [currentStep])

  // Canvas animation for wireframe mesh and scan lines
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationTime = 0
    let frameCount = 0

    const animate = () => {
      const width = canvas.width
      const height = canvas.height

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, width, height)

      // Draw wireframe mesh (animated appearance)
      drawWireframeMesh(ctx, width, height, animationTime)

      // Draw horizontal scan lines
      drawScanLines(ctx, width, height, animationTime)

      animationTime += 0.016 // ~60fps
      frameCount++
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const drawWireframeMesh = (ctx, width, height, time) => {
    // Face mesh points (simplified face landmark positions)
    const points = generateFaceMesh(width, height)

    // Animate point appearance based on time
    const appearanceProgress = Math.min((time % 3) / 3, 1)

    // Draw points
    points.forEach((point, idx) => {
      const pointAppearance = Math.min((appearanceProgress * points.length - idx) / 10, 1)
      if (pointAppearance > 0) {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 4)
        gradient.addColorStop(0, `rgba(233, 30, 140, ${pointAppearance * 0.8})`) // Pink
        gradient.addColorStop(1, `rgba(233, 30, 140, ${pointAppearance * 0.2})`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
        ctx.fill()
      }
    })

    // Draw connecting lines with glow
    ctx.strokeStyle = `rgba(107, 63, 160, 0.4)` // Purple
    ctx.lineWidth = 1
    ctx.lineCap = 'round'

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i]
      const p2 = points[i + 1]

      const lineAppearance = Math.min(
        (appearanceProgress * points.length - Math.min(i, i + 1)) / 10,
        1
      )
      if (lineAppearance > 0) {
        ctx.globalAlpha = lineAppearance * 0.6
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
    }
    ctx.globalAlpha = 1
  }

  const drawScanLines = (ctx, width, height, time) => {
    const scanPosition = (time % 2) * height // Sweeps every 2 seconds

    // Main scan line
    const gradient = ctx.createLinearGradient(0, scanPosition - 20, 0, scanPosition + 20)
    gradient.addColorStop(0, 'rgba(233, 30, 140, 0)')
    gradient.addColorStop(0.5, 'rgba(233, 30, 140, 0.8)')
    gradient.addColorStop(1, 'rgba(233, 30, 140, 0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, scanPosition - 2, width, 4)

    // Secondary scan lines (fainter)
    ctx.strokeStyle = 'rgba(107, 63, 160, 0.2)'
    ctx.lineWidth = 1
    for (let i = 0; i < 5; i++) {
      const lineY = (scanPosition + i * 15) % height
      ctx.beginPath()
      ctx.moveTo(0, lineY)
      ctx.lineTo(width, lineY)
      ctx.stroke()
    }
  }

  const generateFaceMesh = (width, height) => {
    // Simplified face mesh points
    const points = []
    const faceWidth = width * 0.4
    const faceHeight = height * 0.6
    const faceX = (width - faceWidth) / 2
    const faceY = (height - faceHeight) / 2

    // Head outline points
    const headPoints = 20
    for (let i = 0; i < headPoints; i++) {
      const angle = (i / headPoints) * Math.PI * 2
      const x = faceX + faceWidth / 2 + Math.cos(angle) * faceWidth / 2
      const y = faceY + faceHeight / 2 + Math.sin(angle) * faceHeight / 2
      points.push({ x, y })
    }

    // Eye points
    const leftEyeX = faceX + faceWidth * 0.33
    const rightEyeX = faceX + faceWidth * 0.67
    const eyeY = faceY + faceHeight * 0.35

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      points.push({
        x: leftEyeX + Math.cos(angle) * 8,
        y: eyeY + Math.sin(angle) * 6,
      })
      points.push({
        x: rightEyeX + Math.cos(angle) * 8,
        y: eyeY + Math.sin(angle) * 6,
      })
    }

    // Nose points
    const noseX = faceX + faceWidth / 2
    const noseY = faceY + faceHeight * 0.5
    points.push({ x: noseX, y: noseY - 15 })
    points.push({ x: noseX, y: noseY })
    points.push({ x: noseX - 6, y: noseY + 5 })
    points.push({ x: noseX + 6, y: noseY + 5 })

    // Mouth points
    const mouthX = faceX + faceWidth / 2
    const mouthY = faceY + faceHeight * 0.72
    for (let i = 0; i < 10; i++) {
      const t = i / 10
      points.push({
        x: mouthX - 20 + t * 40,
        y: mouthY + Math.sin(t * Math.PI) * 8,
      })
    }

    return points
  }

  return (
    <div className="face-scanning">
      <div className="face-scanning__container">
        {/* Image with overlay and canvas */}
        <div className="face-scanning__image-wrapper">
          <img
            src={imageUrl}
            alt="Scanning face"
            className="face-scanning__image"
          />
          <div className="face-scanning__darkened-overlay" />

          {/* Canvas for mesh and scan lines */}
          <canvas
            ref={canvasRef}
            width={400}
            height={600}
            className="face-scanning__canvas"
          />

          {/* Region highlight boxes */}
          {REGIONS.map((region) => (
            <div
              key={region.id}
              className={`face-scanning__region ${
                activeRegion === region.id ? 'face-scanning__region--active' : ''
              }`}
              style={{
                left: `${region.startX * 100}%`,
                top: `${region.startY * 100}%`,
                width: `${region.width * 100}%`,
                height: `${region.height * 100}%`,
              }}
            >
              {activeRegion === region.id && (
                <span className="face-scanning__region-label">{region.label}</span>
              )}
            </div>
          ))}
        </div>

        {/* Progress information */}
        <div className="face-scanning__info">
          <div className="face-scanning__step-text">{STEPS[currentStep]}</div>

          {/* Step indicator */}
          <div className="face-scanning__progress-bar">
            <div
              className="face-scanning__progress-fill"
              style={{
                width: `${((currentStep + 1) / STEPS.length) * 100}%`,
              }}
            />
          </div>

          {/* Step dots */}
          <div className="face-scanning__dots">
            {STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`face-scanning__dot ${
                  doneSteps.includes(idx)
                    ? 'face-scanning__dot--done'
                    : idx === currentStep
                    ? 'face-scanning__dot--active'
                    : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
