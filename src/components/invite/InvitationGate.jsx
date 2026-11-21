import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import EmbossedLeaves from './EmbossedLeaves'
import OrnateSeal from './OrnateSeal'

gsap.registerPlugin(useGSAP)

function GatePanel({ side, onOpen }) {
  const isLeft = side === 'left'
  return (
    <button
      type="button"
      aria-label="Open invitation"
      onClick={onOpen}
      className={`gate-panel gate-${side} absolute inset-y-0 ${isLeft ? 'left-0' : 'right-0'} w-1/2 cursor-pointer border-0 p-0 overflow-hidden`}
      style={{
        background: isLeft
          ? 'linear-gradient(105deg, #3d4634 0%, #505a42 28%, #5f6a50 55%, #6a755c 100%)'
          : 'linear-gradient(255deg, #3d4634 0%, #505a42 28%, #5f6a50 55%, #6a755c 100%)',
        boxShadow: isLeft
          ? 'inset -18px 0 28px rgba(0,0,0,0.18)'
          : 'inset 18px 0 28px rgba(0,0,0,0.18)',
      }}
    >
      {/* Paper fiber texture */}
      <span
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Embossed botanical field */}
      <span className="pointer-events-none absolute inset-0 opacity-[0.92]">
        <EmbossedLeaves mirror={!isLeft} />
      </span>
      {/* Soft vignette toward spine */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          background: isLeft
            ? 'linear-gradient(90deg, rgba(0,0,0,0.22) 0%, transparent 35%, rgba(255,255,255,0.04) 85%, rgba(0,0,0,0.12) 100%)'
            : 'linear-gradient(270deg, rgba(0,0,0,0.22) 0%, transparent 35%, rgba(255,255,255,0.04) 85%, rgba(0,0,0,0.12) 100%)',
        }}
      />
    </button>
  )
}

export default function InvitationGate({ onOpened }) {
  const rootRef = useRef(null)
  const openingRef = useRef(false)

  useGSAP(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    gsap.from('.gate-panel', { opacity: 0, duration: 0.9, ease: 'power2.out' })
    gsap.from('.gate-seal', {
      scale: 0.72,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'back.out(1.7)',
    })
    gsap.from('.gate-hint', { opacity: 0, y: 10, duration: 0.7, delay: 0.55 })
  }, { scope: rootRef })

  const openGate = () => {
    if (openingRef.current) return
    openingRef.current = true

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      onOpened()
      return
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => onOpened(),
    })

    tl.to('.gate-seal', { scale: 1.08, duration: 0.18 })
      .to('.gate-seal', { scale: 0.7, opacity: 0, duration: 0.4 }, '+=0.02')
      .to('.gate-hint', { opacity: 0, duration: 0.25 }, '<')
      .to('.gate-spine', { scaleY: 0.2, opacity: 0, duration: 0.45 }, '-=0.15')
      .to(
        '.gate-left',
        { xPercent: -108, rotateY: -8, duration: 1.25, transformOrigin: 'left center' },
        '-=0.2',
      )
      .to(
        '.gate-right',
        { xPercent: 108, rotateY: 8, duration: 1.25, transformOrigin: 'right center' },
        '<',
      )
      .to(rootRef.current, { opacity: 0, duration: 0.35 }, '-=0.3')
  }

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: '#141612', perspective: '1200px' }}
    >
      <div
        className="relative h-[100dvh] w-full max-w-[480px] overflow-hidden"
        style={{
          boxShadow: '0 0 0 1px rgba(196,165,116,0.12), 0 30px 80px rgba(0,0,0,0.55)',
        }}
      >
        <GatePanel side="left" onOpen={openGate} />
        <GatePanel side="right" onOpen={openGate} />

        {/* Metallic ribbed spine */}
        <div className="gate-spine pointer-events-none absolute inset-y-0 left-1/2 z-10 w-[14px] -translate-x-1/2">
          <div
            className="h-full w-full"
            style={{
              background: `
                repeating-linear-gradient(
                  180deg,
                  transparent 0 7px,
                  rgba(90,70,40,0.18) 7px 8px
                ),
                linear-gradient(
                  90deg,
                  #7a5f35 0%,
                  #c4a574 18%,
                  #f0e2c4 36%,
                  #d4b884 50%,
                  #f0e2c4 64%,
                  #c4a574 82%,
                  #7a5f35 100%
                )
              `,
              boxShadow:
                '0 0 18px rgba(196,165,116,0.35), inset 1px 0 0 rgba(255,255,255,0.35), inset -1px 0 0 rgba(0,0,0,0.25)',
            }}
          />
        </div>

        {/* Ornate seal */}
        <button
          type="button"
          onClick={openGate}
          className="gate-seal seal-pulse seal-shimmer absolute left-1/2 top-1/2 z-20 flex h-[148px] w-[148px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center overflow-hidden border-0 bg-transparent p-0"
          aria-label="Tap to open invitation"
        >
          <OrnateSeal />
          <span className="relative z-10 flex flex-col items-center" style={{ color: '#3d3428' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mb-1.5 opacity-65">
              <path
                d="M12 5c-2 4-6 6-6 10a6 6 0 0 0 12 0c0-4-4-6-6-10z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
            <span className="font-display text-[10px] font-semibold tracking-[0.28em]">TAP TO</span>
            <span className="mt-0.5 font-display text-[14px] font-semibold tracking-[0.32em]">OPEN</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-1.5 opacity-65">
              <path
                d="M12 5c-2 4-6 6-6 10a6 6 0 0 0 12 0c0-4-4-6-6-10z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </span>
        </button>

        <p
          className="gate-hint pointer-events-none absolute bottom-10 left-0 right-0 text-center font-serif text-[13px] tracking-[0.32em]"
          style={{
            color: '#E8D5B0',
            textShadow: '0 1px 2px rgba(0,0,0,0.45)',
          }}
        >
          TOUCH TO OPEN
        </p>
      </div>
    </div>
  )
}
