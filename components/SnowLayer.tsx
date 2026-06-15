'use client'

import { useEffect, useRef } from 'react'

type Flake = {
  x: number
  y: number
  radius: number
  speed: number
  opacity: number
  phase: number
  sway: number
  swaySpeed: number
  baseDrift: number
}

const flakeColor = '248,245,239'

function getFlakeCount(width: number) {
  if (width < 640) return 22
  if (width < 1024) return 27
  return 34
}

function createFlake(width: number, height: number, spreadAcrossCanvas: boolean): Flake {
  return {
    x: Math.random() * width,
    y: spreadAcrossCanvas ? Math.random() * height : -Math.random() * 24,
    radius: 0.7 + Math.random() * 1.3,
    speed: 0.14 + Math.random() * 0.18,
    opacity: 0.075 + Math.random() * 0.13,
    phase: Math.random() * Math.PI * 2,
    sway: 0.08 + Math.random() * 0.16,
    swaySpeed: 0.012 + Math.random() * 0.018,
    baseDrift: (Math.random() - 0.5) * 0.08,
  }
}

export default function SnowLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const layer = canvas
    const ctx = context
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let animationFrame = 0
    let width = 0
    let height = 0
    let lastFrameTime = performance.now()
    let flakes: Flake[] = []

    function stopAnimation() {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
        animationFrame = 0
      }
    }

    function clearCanvas() {
      ctx.clearRect(0, 0, width, height)
    }

    function getReadabilityFade(flake: Flake) {
      if (width < 640) {
        const nearMobileCopy = flake.x < width * 0.94 && flake.y > height * 0.12 && flake.y < height * 0.78
        return nearMobileCopy ? 0.42 : 0.82
      }

      const leftContentWidth = Math.min(840, width * 0.62)
      const isLeftContent = flake.x < leftContentWidth
      const isHeroTextBand = flake.y > height * 0.16 && flake.y < height * 0.82
      const isHeadlineBand = flake.y > height * 0.22 && flake.y < height * 0.54
      const isCopyOrCtaBand = flake.y > height * 0.55 && flake.y < height * 0.88

      if (isLeftContent && isHeadlineBand) return 0.28
      if (isLeftContent && isCopyOrCtaBand) return 0.34
      if (isLeftContent && isHeroTextBand) return 0.46

      return 1
    }

    function drawFlake(flake: Flake) {
      const visibility = getReadabilityFade(flake)
      if (visibility <= 0) return

      ctx.beginPath()
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${flakeColor}, ${flake.opacity * visibility})`
      ctx.fill()
    }

    function drawStaticFlakes() {
      clearCanvas()

      for (const flake of flakes) {
        drawFlake(flake)
      }
    }

    function resizeCanvas() {
      const rect = layer.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      layer.width = Math.floor(width * pixelRatio)
      layer.height = Math.floor(height * pixelRatio)
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      flakes = Array.from({ length: getFlakeCount(width) }, () => createFlake(width, height, true))
      clearCanvas()
    }

    function drawFrame(time: number) {
      const delta = Math.min((time - lastFrameTime) / 16.67, 2)
      lastFrameTime = time
      clearCanvas()

      for (const flake of flakes) {
        flake.phase += flake.swaySpeed * delta
        flake.y += flake.speed * delta
        flake.x += (flake.baseDrift + Math.sin(flake.phase) * flake.sway) * delta

        if (flake.y > height + flake.radius + 4) {
          Object.assign(flake, createFlake(width, height, false))
          flake.y = -flake.radius - 4
        }

        if (flake.x < -8) flake.x = width + 8
        if (flake.x > width + 8) flake.x = -8

        drawFlake(flake)
      }

      animationFrame = requestAnimationFrame(drawFrame)
    }

    function startAnimation() {
      if (motionQuery.matches) {
        stopAnimation()
        resizeCanvas()
        drawStaticFlakes()
        return
      }

      stopAnimation()
      resizeCanvas()
      lastFrameTime = performance.now()
      animationFrame = requestAnimationFrame(drawFrame)
    }

    function handleResize() {
      if (motionQuery.matches) return
      resizeCanvas()
    }

    function handleMotionChange() {
      startAnimation()
    }

    startAnimation()
    window.addEventListener('resize', handleResize)
    motionQuery.addEventListener('change', handleMotionChange)

    return () => {
      stopAnimation()
      window.removeEventListener('resize', handleResize)
      motionQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'block',
        width: '100%',
        height: '100%',
        zIndex: 12,
        pointerEvents: 'none',
      }}
    />
  )
}
