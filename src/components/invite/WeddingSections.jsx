import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Clock, MapPin, Shirt, Car, Gift, Mail, Heart } from 'lucide-react'
import { weddingData } from '../../data/weddingData'
import CountdownTimer from './CountdownTimer'
import ScratchReveal from './ScratchReveal'
import RevealSection from './RevealSection'

export default function WeddingSections({ skipWelcome = false }) {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  const onRSVP = () => {
    setSubmitted(true)
    reset()
  }

  return (
    <div className="pb-24">
      {!skipWelcome && (
        <RevealSection className="px-6 py-8 text-center">
          <p className="font-serif text-base leading-relaxed text-ink">{weddingData.welcomeMessage}</p>
          <span className="mt-4 inline-block text-sage">♥</span>
        </RevealSection>
      )}

      <ScratchReveal />

      <RevealSection className="py-8">
        <CountdownTimer />
      </RevealSection>

      <RevealSection className="px-6 py-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <Clock className="mb-2 text-sage" size={20} strokeWidth={1.4} />
          <h2 className="font-script text-4xl text-ink">Program Timeline</h2>
          <div className="heart-divider mt-3">
            <span className="text-xs">♥</span>
          </div>
        </div>
        <div className="relative ml-3 border-l border-champagne pl-6">
          {weddingData.timeline.map((item) => (
            <div key={item.id} className="relative mb-8 last:mb-0">
              <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-sage" />
              <h3 className="font-display text-xl text-olive">{item.title}</h3>
              <p className="mt-1 font-serif text-sm text-ink/70">{item.datetime}</p>
              <p className="mt-1 text-sm text-sage">{item.note}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <RevealSection className="px-6 py-8 text-center">
        <MapPin className="mx-auto mb-2 text-sage" size={22} strokeWidth={1.4} />
        <h2 className="font-script text-4xl text-ink">Venue</h2>
        <div className="heart-divider my-3">
          <span className="text-xs">♥</span>
        </div>
        <p className="font-display text-2xl text-olive">{weddingData.venue.name}</p>
        <p className="mt-1 font-serif text-lg text-ink/70">{weddingData.venue.city}</p>
        <p className="mt-1 text-sm text-sage">{weddingData.venue.address}</p>

        <div className="mt-6 overflow-hidden rounded-xl border border-champagne/70 bg-cream">
          <iframe
            title="Venue map"
            src={weddingData.venue.mapsEmbed}
            className="h-52 w-full border-0 grayscale-[20%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          href={weddingData.venue.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex rounded-full bg-olive px-6 py-3 text-xs tracking-[0.18em] text-cream"
        >
          VIEW ON GOOGLE MAPS
        </a>
      </RevealSection>

      <RevealSection className="px-6 py-10 text-center">
        <Shirt className="mx-auto mb-2 text-sage" size={22} strokeWidth={1.4} />
        <h2 className="font-script text-4xl text-ink">Dress Code</h2>
        <div className="heart-divider my-3">
          <span className="text-xs">♥</span>
        </div>
        <div className="space-y-5 text-left">
          <div>
            <p className="font-display text-lg text-olive">Women</p>
            <p className="mt-1 font-serif text-base leading-relaxed text-ink/70">
              {weddingData.dressCode.women}
            </p>
          </div>
          <div>
            <p className="font-display text-lg text-olive">Men</p>
            <p className="mt-1 font-serif text-base leading-relaxed text-ink/70">
              {weddingData.dressCode.men}
            </p>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="px-6 py-8 text-center">
        <Car className="mx-auto mb-2 text-sage" size={22} strokeWidth={1.4} />
        <h2 className="font-script text-4xl text-ink">Transportation</h2>
        <div className="heart-divider my-3">
          <span className="text-xs">♥</span>
        </div>
        <p className="font-serif text-base leading-relaxed text-ink/70">{weddingData.transportation}</p>
      </RevealSection>

      <RevealSection className="px-6 py-8 text-center">
        <Gift className="mx-auto mb-2 text-sage" size={22} strokeWidth={1.4} />
        <h2 className="font-script text-4xl text-ink">Gifts</h2>
        <div className="heart-divider my-3">
          <span className="text-xs">♥</span>
        </div>
        <p className="font-serif text-lg italic leading-relaxed text-ink/70">{weddingData.gifts}</p>
      </RevealSection>

      <RevealSection className="px-6 py-10">
        <div className="mb-6 flex flex-col items-center text-center">
          <Mail className="mb-2 text-sage" size={22} strokeWidth={1.4} />
          <h2 className="font-script text-5xl text-ink">RSVP</h2>
          <div className="heart-divider my-3">
            <span className="text-xs">♥</span>
          </div>
        </div>

        {submitted ? (
          <div className="rounded-xl border border-champagne bg-white/40 px-5 py-10 text-center">
            <Heart className="mx-auto text-sage" size={22} />
            <p className="mt-4 font-display text-2xl text-olive">Thank you</p>
            <p className="mt-2 font-serif text-ink/70">Your response has been received with love.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onRSVP)} className="space-y-5">
            <label className="block">
              <span className="invite-label">Your Name</span>
              <input className="invite-input" placeholder="Your full name" required {...register('name')} />
            </label>
            <label className="block">
              <span className="invite-label">Email</span>
              <input
                className="invite-input"
                type="email"
                placeholder="you@example.com"
                required
                {...register('email')}
              />
            </label>
            <label className="block">
              <span className="invite-label">Will you be attending?</span>
              <select className="invite-input" {...register('attendance')}>
                <option value="yes">Joyfully attending</option>
                <option value="no">Unable to attend</option>
                <option value="maybe">Hopefully attending</option>
              </select>
            </label>
            <label className="block">
              <span className="invite-label">Your Message</span>
              <textarea
                className="invite-input min-h-[88px] resize-none"
                placeholder="Your message"
                {...register('message')}
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-olive py-3.5 text-xs tracking-[0.22em] text-cream"
            >
              SEND MESSAGE
            </button>
          </form>
        )}
      </RevealSection>

      <RevealSection className="px-6 pb-8 pt-4 text-center">
        <div className="heart-divider mb-6">
          <span className="text-xs">♥</span>
        </div>
        <p className="font-script text-3xl text-olive">{weddingData.closing}</p>
        <p className="mt-4 font-serif text-sm tracking-[0.18em] text-sage">{weddingData.date.display}</p>
      </RevealSection>
    </div>
  )
}
