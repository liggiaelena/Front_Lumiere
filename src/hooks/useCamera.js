import { useState, useRef, useCallback } from 'react'

export function useCamera() {
  const [stream, setStream] = useState(null)
  const [error, setError] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const videoRef = useRef(null)

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
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
          setIsReady(true)
        }
      }
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setError('Permissão para câmera negada. Verifique as configurações do navegador.')
      } else if (err.name === 'NotFoundError') {
        setError('Nenhuma câmera encontrada neste dispositivo.')
      } else {
        setError('Não foi possível acessar a câmera. Tente novamente.')
      }
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
      setIsReady(false)
    }
  }, [stream])

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

  return { videoRef, stream, error, isReady, startCamera, stopCamera, capture }
}
