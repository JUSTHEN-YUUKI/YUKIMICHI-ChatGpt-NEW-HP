'use client'

import { useEffect, useRef } from 'react'

interface Flake {
  x: number; y: number; r: number
  speed: number; drift: number; opacity: number
}

export default function Snow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number

    const flakes: Flake[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.6 + 0.3,
      speed: Math.random() * 0.45 + 0.1,
      drift: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.3 + 0.05,
    }))

    const resize = () => {
      const hero = canvas.parentElement
      if (hero) { canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight }
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      flakes.forEach(f => {
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(248,245,239,${f.opacity})`
        ctx.fill()
        f.y += f.speed; f.x += f.drift
        if (f.y > canvas.height + 5) { f.y = -5; f.x = Math.random() * canvas.width }
        if (f.x < -5 || f.x > canvas.width + 5) f.x = Math.random() * canvas.width
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId) }
  }, [])

  return (
    <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />
  )
}
