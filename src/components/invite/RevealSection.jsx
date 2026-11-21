import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function RevealSection({ children, className = '' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.from(ref.current, {
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
        },
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
