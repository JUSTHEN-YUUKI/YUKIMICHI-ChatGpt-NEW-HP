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
  if (width < 640) return 16
  return 32
}

function createFlake(width: number, height: number, spreadAcrossCanvas: boolean): Flake {
  return {
    x: Math.random() * width,
    y: spreadAcrossCanvas ? Math.random() * height : -Math.random() * 24,
    radius: 0.6 + Math.random() * 1.6,
    speed: 0.08 + Math.random() * 0.27,
    opacity: 0.06 + Math.random() * 0.16,
    phase: Math.random() * Math.PI * 2,
    sway: 0.035 + Math.random() * 0.11,
    swaySpeed: 0.006 + Math.random() * 0.012,
    baseDrift: (Math.random() - 0.5) * 0.035,
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

        ctx.beginPath()
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${flakeColor}, ${flake.opacity})`
        ctx.fill()
      }

      animationFrame = requestAnimationFrame(drawFrame)
    }

    function startAnimation() {
      if (motionQuery.matches) {
        stopAnimation()
        clearCanvas()
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
