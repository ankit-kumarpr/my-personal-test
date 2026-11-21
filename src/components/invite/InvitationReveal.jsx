import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { weddingData } from '../../data/weddingData'
import CurtainHeader from './CurtainHeader'
import GardenArt from './GardenArt'
import CornerOrnaments from './CornerOrnaments'
import WeddingSections from './WeddingSections'
import MusicToggle from './MusicToggle'

gsap.registerPlugin(useGSAP)

export default function InvitationReveal({ animateIntro = true }) {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      if (!animateIntro) return
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.from('.reveal-curtain', { y: -36, opacity: 0, duration: 1 })
        .from('.reveal-ornament', { opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.reveal-heart', { scale: 0.7, opacity: 0, duration: 0.45 }, '-=0.2')
        .from('.reveal-tagline', { y: 14, opacity: 0, duration: 0.5 }, '-=0.1')
        .from('.reveal-name', { y: 22, opacity: 0, duration: 0.7, stagger: 0.14 }, '-=0.15')
        .from('.reveal-meta', { y: 10, opacity: 0, duration: 0.45, stagger: 0.06 }, '-=0.35')
        .from('.reveal-garden', { y: 28, opacity: 0, duration: 0.85 }, '-=0.25')
        .from('.reveal-welcome', { y: 16, opacity: 0, duration: 0.6 }, '-=0.35')
    },
    { scope: rootRef, dependencies: [animateIntro], revertOnUpdate: true },
  )

  return (
    <div
      ref={rootRef}
      className="invite-shell paper-bg relative"
      style={{ backgroundColor: '#F7F1E6', color: '#2C2824' }}
    >
      {animateIntro && <MusicToggle />}

      <div className="reveal-curtain">
        <CurtainHeader />
      </div>

      <div className="reveal-ornament">
        <CornerOrnaments />
      </div>

      <section className="relative z-[2] px-8 pb-1 pt-1 text-center">
        <div className="reveal-heart mx-auto mb-3" style={{ color: '#3d3428' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 21s-7-4.5-9.5-8.2C.4 9.4 2.2 6 5.5 6c1.8 0 3.1 1 3.9 2.1C10.3 7 11.6 6 13.4 6c3.3 0 5.1 3.4 3 6.8C19 16.5 12 21 12 21z" />
          </svg>
        </div>

        <p
          className="reveal-tagline font-serif text-[13px] tracking-[0.12em]"
          style={{ color: '#5a534c' }}
        >
          {weddingData.tagline}
        </p>

        <h1
          className="reveal-name mt-5 leading-none"
          style={{
            color: '#1f1b18',
            fontFamily: '"Great Vibes", cursive',
            fontSize: 'clamp(3.6rem, 15vw, 4.8rem)',
            fontWeight: 400,
          }}
        >
          {weddingData.groom.firstName}
        </h1>
        <p
          className="reveal-meta mx-auto mt-2 max-w-[16rem] font-serif text-[12px] leading-relaxed"
          style={{ color: '#6b645c' }}
        >
          {weddingData.groom.parents}
          <br />
          <span style={{ color: '#8a8278' }}>{weddingData.groom.title}</span>
        </p>

        <p
          className="reveal-name my-2 leading-none"
          style={{ color: '#7B8467', fontFamily: '"Great Vibes", cursive', fontSize: '2.6rem' }}
        >
          &
        </p>

        <h2
          className="reveal-name leading-none"
          style={{
            color: '#1f1b18',
            fontFamily: '"Great Vibes", cursive',
            fontSize: 'clamp(3.6rem, 15vw, 4.8rem)',
            fontWeight: 400,
          }}
        >
          {weddingData.bride.firstName}
        </h2>
        <p
          className="reveal-meta mx-auto mt-2 max-w-[16rem] font-serif text-[12px] leading-relaxed"
          style={{ color: '#6b645c' }}
        >
          {weddingData.bride.parents}
          <br />
          <span style={{ color: '#8a8278' }}>{weddingData.bride.title}</span>
        </p>
      </section>

      <div className="reveal-garden relative z-[2] -mt-1 px-1">
        <GardenArt className="mx-auto w-full max-w-lg" />
      </div>

      <div className="reveal-welcome relative z-[2] px-8 pb-2 pt-2 text-center">
        <div className="heart-divider mb-5">
          <span className="text-xs">♥</span>
        </div>
        <p
          className="mx-auto max-w-sm font-serif text-[15px] leading-[1.75]"
          style={{ color: '#4a433c' }}
        >
          {weddingData.welcomeMessage}
        </p>
        <span className="mt-4 inline-block text-sm" style={{ color: '#7B8467' }}>
          ♥
        </span>
      </div>

      <WeddingSections skipWelcome />
    </div>
  )
}
