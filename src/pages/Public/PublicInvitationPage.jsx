import { useMemo, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useForm } from 'react-hook-form'
import { MapPin, Heart } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { getThemeColors } from '../../data/dummyInvitations'
import { fontCombos } from '../../data/dummyTemplates'
import { coupleNames, formatDate, formatTime } from '../../utils/format'
import Countdown from '../../components/invitation/Countdown'
import Lightbox from '../../components/invitation/Lightbox'
import FloralDivider from '../../components/common/FloralDivider'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

gsap.registerPlugin(useGSAP)

export default function PublicInvitationPage() {
  const { slug } = useParams()
  const { getInvitationBySlug, submitRSVP, ready } = useApp()
  const invitation = getInvitationBySlug(slug)
  const [opened, setOpened] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [rsvpDone, setRsvpDone] = useState(false)
  const rootRef = useRef(null)
  const envelopeRef = useRef(null)

  const theme = useMemo(
    () => getThemeColors(invitation?.design?.colorTheme),
    [invitation],
  )
  const fonts = fontCombos.find((f) => f.id === invitation?.design?.fontCombo) || fontCombos[0]
  const couple = coupleNames(invitation)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      guestName: '',
      email: '',
      phone: '',
      guests: 1,
      attendance: 'yes',
      message: '',
    },
  })

  useGSAP(
    () => {
      if (!invitation) return
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.from('.float-petal', {
        y: reduce ? 0 : 20,
        opacity: 0,
        duration: reduce ? 0.2 : 1.4,
        stagger: 0.15,
        ease: 'power2.out',
      })
      gsap.to('.float-petal', {
        y: reduce ? 0 : '+=12',
        rotation: reduce ? 0 : 3,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.4,
      })
    },
    { scope: rootRef, dependencies: [invitation] },
  )

  const openEnvelope = () => {
    if (opened) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => setOpened(true),
    })

    if (reduce) {
      setOpened(true)
      return
    }

    tl.to('.wax-seal', { scale: 0.7, opacity: 0, duration: 0.45 })
      .to('.envelope-flap', { rotateX: 180, transformOrigin: 'top center', duration: 0.9 }, '-=0.1')
      .to('.envelope-body', { y: 40, opacity: 0.35, duration: 0.7 }, '-=0.35')
      .fromTo(
        '.invitation-sheet',
        { y: 80, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.85 },
        '-=0.45',
      )
      .to('.opening-screen', { opacity: 0, duration: 0.55, pointerEvents: 'none' }, '+=0.15')
  }

  useGSAP(
    () => {
      if (!opened || !invitation) return
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.from('.reveal-block', {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power2.out',
      })
    },
    { scope: rootRef, dependencies: [opened, invitation] },
  )

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-olive text-champagne">
        Opening invitation…
      </div>
    )
  }

  if (!invitation) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-4 text-center">
        <h1 className="font-display text-3xl text-olive">Invitation not found</h1>
        <p className="mt-3 font-serif text-brown/70">This demo link may have been reset or mistyped.</p>
        <Button className="mt-6" to="/">Return home</Button>
      </div>
    )
  }

  const onRSVP = (data) => {
    submitRSVP({
      invitationId: invitation.id,
      guestName: data.guestName,
      email: data.email,
      phone: data.phone,
      guests: Number(data.guests) || 1,
      attendance: data.attendance,
      message: data.message,
    })
    setRsvpDone(true)
    reset()
  }

  return (
    <div ref={rootRef} className="min-h-screen" style={{ background: theme.background, color: theme.primary }}>
      {!opened && (
        <div
          className="opening-screen fixed inset-0 z-50 flex items-center justify-center overflow-hidden grain"
          style={{ background: `linear-gradient(160deg, ${theme.secondary}, ${theme.primary})` }}
        >
          <div className="float-petal absolute left-[12%] top-[18%] h-16 w-16 rounded-full opacity-30" style={{ background: theme.accent }} />
          <div className="float-petal absolute right-[14%] top-[28%] h-10 w-10 rounded-full opacity-25" style={{ background: theme.accent }} />
          <div className="float-petal absolute bottom-[20%] left-[20%] h-12 w-12 rounded-full opacity-20" style={{ background: theme.accent }} />

          <div ref={envelopeRef} className="relative w-[min(90vw,380px)] perspective-[1200px]">
            <div className="invitation-sheet absolute inset-x-6 top-10 z-0 rounded-sm bg-ivory p-6 text-center opacity-0 shadow-xl">
              <p className="font-serif text-sm text-olive/70">You are invited</p>
              <p className="mt-2 font-display text-2xl text-olive">{couple}</p>
            </div>

            <div className="envelope-body relative z-10 mx-auto mt-8 h-56 rounded-sm shadow-2xl" style={{ background: theme.accent }}>
              <div
                className="envelope-flap absolute inset-x-0 top-0 h-28 origin-top"
                style={{
                  background: `linear-gradient(180deg, ${theme.secondary}, ${theme.accent})`,
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transformStyle: 'preserve-3d',
                }}
              />
              <button
                type="button"
                onClick={openEnvelope}
                className="wax-seal absolute left-1/2 top-[42%] z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-champagne/40 text-ivory shadow-lg transition hover:scale-105"
                style={{ background: theme.primary }}
                aria-label="Open invitation"
              >
                <Heart size={18} fill="currentColor" />
                <span className="mt-1 text-[9px] uppercase tracking-[0.14em]">Open</span>
              </button>
              <p className="absolute inset-x-0 bottom-6 text-center font-serif text-lg" style={{ color: theme.primary }}>
                {invitation.brideName?.split(' ')[0]} & {invitation.groomName?.split(' ')[0]}
              </p>
            </div>

            <p className="mt-8 text-center text-xs uppercase tracking-[0.28em] text-ivory/80">
              Tap the seal to open
            </p>
          </div>
        </div>
      )}

      <div className={`mx-auto max-w-md md:max-w-lg ${opened ? 'block' : 'hidden'}`}>
        <section className="reveal-block relative overflow-hidden px-5 pb-16 pt-14 text-center">
          {invitation.photos?.background && (
            <img
              src={invitation.photos.background}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-20"
            />
          )}
          <div className="relative">
            <p className="text-[10px] uppercase tracking-[0.35em]" style={{ color: theme.secondary }}>
              {invitation.weddingTitle}
            </p>
            <h1
              className="mt-5 text-4xl leading-tight md:text-5xl"
              style={{ fontFamily: `"${fonts.display}", serif` }}
            >
              {couple}
            </h1>
            <FloralDivider className="my-6" />
            <p className="font-serif text-xl" style={{ color: `${theme.primary}cc` }}>
              Request the pleasure of your company
            </p>
          </div>
        </section>

        <section className="reveal-block px-5 pb-14">
          {invitation.photos?.couple && (
            <div className="ornament-border overflow-hidden rounded-sm">
              <img src={invitation.photos.couple} alt={couple} className="aspect-[4/5] w-full object-cover" />
            </div>
          )}
          <p className="mt-8 text-center font-serif text-lg leading-relaxed opacity-85">
            {invitation.welcomeText}
          </p>
        </section>

        <section className="reveal-block mx-5 mb-14 rounded-sm border border-champagne/70 bg-ivory/60 px-5 py-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em]" style={{ color: theme.secondary }}>
            Wedding Day
          </p>
          <p className="mt-3 font-display text-3xl">{formatDate(invitation.weddingDate)}</p>
          <p className="mt-2 font-serif text-lg">{formatTime(invitation.weddingTime)}</p>
          <p className="mt-4 text-sm tracking-wide">{invitation.venue}</p>
          <p className="mt-1 text-sm opacity-70">{invitation.venueAddress}</p>
          <div className="mt-8">
            <Countdown date={invitation.weddingDate} accent={theme.secondary} />
          </div>
        </section>

        {(invitation.events || []).length > 0 && (
          <section className="reveal-block px-5 pb-14">
            <h2 className="mb-6 text-center font-display text-3xl">Celebrations</h2>
            <div className="space-y-5">
              {invitation.events.map((event) => (
                <article
                  key={event.id}
                  className="rounded-sm border border-champagne/60 bg-ivory/50 px-5 py-6"
                >
                  <h3 className="font-display text-2xl">{event.name}</h3>
                  <p className="mt-2 text-sm" style={{ color: theme.secondary }}>
                    {formatDate(event.date)} · {formatTime(event.startTime)}
                  </p>
                  <p className="mt-1 text-sm opacity-80">{event.venue}</p>
                  {event.description && (
                    <p className="mt-3 font-serif leading-relaxed opacity-80">{event.description}</p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {(invitation.photos?.gallery || []).length > 0 && (
          <section className="reveal-block px-5 pb-14">
            <h2 className="mb-6 text-center font-display text-3xl">Gallery</h2>
            <div className="grid grid-cols-2 gap-3">
              {invitation.photos.gallery.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  className="aspect-[3/4] overflow-hidden rounded-sm"
                  onClick={() => setLightbox(src)}
                >
                  <img src={src} alt={`Gallery ${i + 1}`} className="h-full w-full object-cover transition hover:scale-105" />
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="reveal-block mx-5 mb-14 rounded-sm border border-champagne/70 bg-ivory/60 p-6">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 shrink-0" size={18} style={{ color: theme.secondary }} />
            <div>
              <h2 className="font-display text-2xl">Location</h2>
              <p className="mt-2 font-serif text-lg">{invitation.venue}</p>
              <p className="mt-1 text-sm opacity-75">{invitation.venueAddress}</p>
            </div>
          </div>
          <div className="mt-5 overflow-hidden rounded-sm border border-champagne/50 bg-beige">
            <div className="flex aspect-[16/10] items-center justify-center bg-[linear-gradient(135deg,#EDE5D9,#D8C5A5)] p-4 text-center">
              <div>
                <p className="font-serif text-olive">Map preview (demo)</p>
                <p className="mt-1 text-xs text-brown/60">{invitation.venue}</p>
              </div>
            </div>
          </div>
          <Button
            className="mt-5 w-full"
            href={invitation.mapsUrl || '#'}
            target="_blank"
            rel="noreferrer"
            style={{ background: theme.primary, color: theme.background }}
          >
            Get Directions
          </Button>
        </section>

        <section className="reveal-block px-5 pb-16">
          <h2 className="mb-2 text-center font-display text-3xl">RSVP</h2>
          <p className="mb-8 text-center font-serif opacity-75">Kindly respond at your earliest convenience.</p>

          {rsvpDone ? (
            <div className="rounded-sm border border-champagne bg-ivory/80 px-6 py-10 text-center">
              <Heart className="mx-auto text-sage" />
              <h3 className="mt-4 font-display text-2xl">Thank you</h3>
              <p className="mt-2 font-serif leading-relaxed opacity-80">
                Your response has been received. We cannot wait to celebrate with you.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onRSVP)} className="space-y-4 rounded-sm border border-champagne/70 bg-ivory/70 p-5">
              <Input label="Guest Name" error={errors.guestName?.message} {...register('guestName', { required: 'Name is required' })} />
              <Input label="Email" type="email" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />
              <Input label="Phone" {...register('phone')} />
              <Input label="Number of Guests" type="number" min={0} max={20} {...register('guests')} />
              <Input as="select" label="Attendance" {...register('attendance')}>
                <option value="yes">Joyfully Attending</option>
                <option value="no">Unable to Attend</option>
                <option value="maybe">Hopefully Attending</option>
              </Input>
              <Input as="textarea" rows={3} label="Message for the Couple" {...register('message')} />
              <Button type="submit" className="w-full" style={{ background: theme.primary, color: theme.background }}>
                Send RSVP
              </Button>
            </form>
          )}
        </section>

        <section className="reveal-block px-5 pb-20 text-center">
          <FloralDivider />
          <p className="mt-8 font-serif text-lg leading-relaxed opacity-80">{invitation.thankYouText}</p>
          <p
            className="mt-6 text-3xl"
            style={{ fontFamily: `"${fonts.display}", serif` }}
          >
            {couple}
          </p>
          <p className="mt-2 text-sm tracking-[0.2em] uppercase" style={{ color: theme.secondary }}>
            {formatDate(invitation.weddingDate)}
          </p>
          <Link to="/" className="mt-10 inline-block text-xs uppercase tracking-[0.22em] text-sage hover:opacity-80">
            Created with Velvet Vow
          </Link>
        </section>
      </div>

      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </div>
  )
}
