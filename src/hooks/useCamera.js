import { useState, useRef, useCallback } from 'react'

export function useCamera() {
  const [error, setError] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const startCamera = useCallback(async () => {
    setError(null)
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })
      streamRef.current = mediaStream
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
          setIsReady(true)
        }
      }
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setError('Camera permission denied. Check your browser settings.')
      } else if (err.name === 'NotFoundError') {
        setError('No camera found on this device.')
      } else {
        setError('Could not access the camera. Please try again.')
      }
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
      setIsReady(false)
    }
  }, [])

  const capture = useCallback(() => {
    return new Promise((resolve) => {
      if (!videoRef.current || !isReady) {
        resolve(null)
        return
      }

      const video = videoRef.current
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)

      canvas.toBlob(
        (blob) => {
          const previewUrl = URL.createObjectURL(blob)
          resolve({ blob, previewUrl })
        },
        'image/jpeg',
        0.9
      )
    })
  }, [isReady])

  return { videoRef, error, isReady, startCamera, stopCamera, capture }
}
