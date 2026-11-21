import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      const t = setTimeout(() => {
        if (!done.current) {
          done.current = true
          onComplete()
        }
      }, 400)
      return () => clearTimeout(t)
    }

    const duration = 2200
    const started = Date.now()
    const id = setInterval(() => {
      const p = Math.min(100, Math.round(((Date.now() - started) / duration) * 100))
      setProgress(p)
      if (p >= 100) {
        clearInterval(id)
        setTimeout(() => {
          if (!done.current) {
            done.current = true
            onComplete()
          }
        }, 280)
      }
    }, 40)

    return () => clearInterval(id)
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(165deg, #5F6850, #414B35 55%, #2f3627)' }}
    >
      <div className="gate-leaf-pattern absolute inset-0 opacity-40" />
      <motion.div
        className="relative z-10 flex w-[min(86vw,340px)] flex-col items-center text-center"
        style={{ color: '#F4EFE6' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <svg width="72" height="72" viewBox="0 0 80 80" fill="none" className="mb-6" style={{ color: '#D8C5A5' }}>
          <path
            d="M40 12c-4 10-14 16-14 28a14 14 0 1 0 28 0c0-12-10-18-14-28z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle cx="40" cy="42" r="3.5" fill="currentColor" />
          <path
            d="M18 58c8-6 16-8 22-8s14 2 22 8"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.7"
          />
        </svg>
        <p className="font-serif text-sm uppercase tracking-[0.35em]" style={{ color: '#D8C5A5' }}>
          Wedding Invitation
        </p>
        <h1 className="mt-4 font-script text-5xl leading-none" style={{ color: '#F8F5EF' }}>
          Ananya & Aarav
        </h1>
        <div className="mt-10 h-[2px] w-40 overflow-hidden rounded-full bg-white/15">
          <div className="h-full transition-[width] duration-75" style={{ width: `${progress}%`, background: '#D8C5A5' }} />
        </div>
        <p className="mt-4 font-serif text-sm tracking-widest" style={{ color: '#D8C5A5' }}>
          {progress}%
        </p>
      </motion.div>
    </div>
  )
}
