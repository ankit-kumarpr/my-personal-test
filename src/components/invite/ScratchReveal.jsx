import { useEffect, useRef, useState } from 'react'
import { weddingData } from '../../data/weddingData'

export default function ScratchReveal() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const drawing = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    const resize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      drawCover(ctx, rect.width, rect.height)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const drawCover = (ctx, w, h) => {
    ctx.globalCompositeOperation = 'source-over'
    ctx.clearRect(0, 0, w, h)

    const x = w / 2
    const y = h * 0.12
    const s = Math.min(w, h) * 0.42

    const heart = () => {
      ctx.beginPath()
      ctx.moveTo(x, y + s * 0.3)
      ctx.bezierCurveTo(x, y, x - s, y, x - s, y + s * 0.35)
      ctx.bezierCurveTo(x - s, y + s * 0.7, x, y + s * 1.05, x, y + s * 1.2)
      ctx.bezierCurveTo(x, y + s * 1.05, x + s, y + s * 0.7, x + s, y + s * 0.35)
      ctx.bezierCurveTo(x + s, y, x, y, x, y + s * 0.3)
      ctx.closePath()
    }

    heart()
    const metal = ctx.createLinearGradient(x - s, y, x + s, y + s * 1.2)
    metal.addColorStop(0, '#a8b497')
    metal.addColorStop(0.28, '#7B8467')
    metal.addColorStop(0.55, '#4a533d')
    metal.addColorStop(0.78, '#6a755c')
    metal.addColorStop(1, '#9aa485')
    ctx.fillStyle = metal
    ctx.fill()

    heart()
    const gloss = ctx.createRadialGradient(x - s * 0.25, y + s * 0.2, 4, x, y + s * 0.45, s)
    gloss.addColorStop(0, 'rgba(255,255,255,0.38)')
    gloss.addColorStop(0.45, 'rgba(255,255,255,0.08)')
    gloss.addColorStop(1, 'rgba(0,0,0,0.12)')
    ctx.fillStyle = gloss
    ctx.fill()

    // Metallic glitter
    for (let i = 0; i < 70; i++) {
      const px = w * 0.18 + Math.random() * w * 0.64
      const py = h * 0.14 + Math.random() * h * 0.62
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.35)' : 'rgba(212,184,132,0.35)'
      ctx.beginPath()
      ctx.arc(px, py, Math.random() * 1.6 + 0.3, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const scratch = (clientX, clientY) => {
    if (revealed) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 22, 0, Math.PI * 2)
    ctx.fill()
    checkReveal()
  }

  const checkReveal = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas
    const pixels = ctx.getImageData(0, 0, width, height).data
    let transparent = 0
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparent++
    }
    const ratio = transparent / (pixels.length / 4)
    if (ratio > 0.42) {
      setRevealed(true)
      ctx.clearRect(0, 0, width, height)
    }
  }

  const onPointerDown = (e) => {
    drawing.current = true
    scratch(e.clientX, e.clientY)
  }
  const onPointerMove = (e) => {
    if (!drawing.current) return
    scratch(e.clientX, e.clientY)
  }
  const onPointerUp = () => {
    drawing.current = false
  }

  return (
    <section className="px-6 py-10 text-center">
      <p className="font-script text-4xl text-[#7B8467]">Scratch to Reveal</p>
      <div className="heart-divider my-4">
        <span className="text-sm">♥</span>
      </div>

      <div
        ref={containerRef}
        className="relative mx-auto aspect-square w-full max-w-[300px] touch-none select-none"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[40%] px-6">
          <p className="font-display text-2xl text-[#414B35]">You&apos;re Invited!</p>
          <p className="mt-3 font-serif text-lg text-[#2C2824]">{weddingData.date.display}</p>
          <p className="mt-1 font-serif text-base text-[#7B8467]">{weddingData.date.weekday}</p>
          <p className="mt-3 font-script text-3xl text-[#414B35]">
            {weddingData.bride.firstName} & {weddingData.groom.firstName}
          </p>
        </div>

        {!revealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full cursor-crosshair"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          />
        )}
      </div>

      <a
        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
          `${weddingData.bride.firstName} & ${weddingData.groom.firstName} Wedding`,
        )}&dates=20270215T130000Z/20270215T170000Z&details=${encodeURIComponent(
          weddingData.venue.name,
        )}&location=${encodeURIComponent(weddingData.venue.address)}`}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#414B35] px-7 py-3 text-xs font-medium tracking-[0.2em] text-[#F4EFE6]"
      >
        SAVE THE DATE
      </a>
    </section>
  )
}
