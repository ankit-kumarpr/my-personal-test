import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Palette, Share2, Heart } from 'lucide-react'
import { dummyTemplates } from '../../data/dummyTemplates'
import { testimonials, pricingPlans, faqs } from '../../data/dummyRSVP'
import { useApp } from '../../context/AppContext'
import TemplateCard from '../../components/templates/TemplateCard'
import SectionHeading from '../../components/common/SectionHeading'
import FloralDivider from '../../components/common/FloralDivider'
import Button from '../../components/common/Button'
import { useState } from 'react'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

const steps = [
  { title: 'Choose a design', text: 'Browse curated invitation templates crafted for modern luxury weddings.' },
  { title: 'Personalize every detail', text: 'Add names, events, photos, colors, and typography in a live editor.' },
  { title: 'Share & collect RSVPs', text: 'Publish a beautiful link and manage guest responses in one place.' },
]

const features = [
  { icon: Palette, title: 'Design atelier', text: 'Color themes, florals, and editorial type pairings.' },
  { icon: Sparkles, title: 'Cinematic reveal', text: 'Envelope opening and elegant scroll storytelling.' },
  { icon: Share2, title: 'Shareable links', text: 'Demo URLs your guests can open instantly.' },
  { icon: Heart, title: 'RSVP studio', text: 'Track confirmations, declines, and guest notes.' },
]

export default function HomePage() {
  const { invitations } = useApp()
  const featured = dummyTemplates.slice(0, 4)
  const [openFaq, setOpenFaq] = useState(0)
  const demo = invitations.find((i) => i.shareSlug === 'ananya-aarav-jaipur')

  return (
    <div>
      <section className="relative min-h-[92vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=2000&h=1400&fit=crop"
          alt="Wedding celebration"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-olive/75 via-olive/55 to-ivory" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-4 pb-20 pt-28 md:px-6 md:pb-28">
          <motion.div {...fadeUp} className="max-w-3xl text-ivory">
            <p className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05]">Velvet Vow</p>
            <h1 className="mt-6 max-w-2xl font-serif text-2xl italic text-champagne md:text-3xl lg:text-4xl leading-snug">
              Your Love Story Deserves a Beautiful Invitation.
            </h1>
            <p className="mt-5 max-w-xl text-base text-ivory/85 md:text-lg leading-relaxed">
              Design a premium digital wedding invitation with live preview, cinematic animations, and effortless RSVP management.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/create" size="lg">
                Create Your Invitation <ArrowRight size={16} />
              </Button>
              <Button to="/templates" variant="secondary" size="lg" className="border-champagne text-ivory hover:bg-ivory/10">
                Explore Designs
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeading
          eyebrow="Featured Atelier"
          title="Invitation designs with distinct character"
          subtitle="Eight curated directions — from royal Jaipur crests to quiet linen minimalism."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button to="/templates" variant="secondary">View all templates</Button>
        </div>
      </section>

      <section className="border-y border-champagne/50 bg-beige/40 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading eyebrow="How it works" title="From blank page to cherished keepsake" />
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div key={step.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="text-center md:text-left">
                <p className="font-display text-5xl text-champagne">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 font-display text-2xl text-olive">{step.title}</h3>
                <p className="mt-3 font-serif text-lg text-brown/75 leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeading eyebrow="Premium features" title="Everything a modern wedding studio needs" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="border border-champagne/60 bg-ivory/80 p-6">
              <f.icon className="text-sage" size={22} />
              <h3 className="mt-4 font-display text-xl text-olive">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brown/75">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-olive py-20 text-ivory">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            eyebrow="Gallery"
            title="A glimpse of invitation storytelling"
            subtitle="Photography-led layouts designed for mobile-first guest experiences."
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[
              'https://images.unsplash.com/photo-1511285560929-80b456fe3caa?w=700&h=900&fit=crop',
              'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=700&h=900&fit=crop',
              'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&h=900&fit=crop',
              'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&h=900&fit=crop',
            ].map((src) => (
              <div key={src} className="aspect-[3/4] overflow-hidden">
                <img src={src} alt="Wedding gallery" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          {demo && (
            <div className="mt-10 text-center">
              <Button to={`/invite/${demo.shareSlug}`} className="bg-champagne text-olive hover:bg-[#cbb894]">
                Open live demo invitation
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeading eyebrow="Kind words" title="Loved by couples preparing their big day" />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote key={t.id} className="border border-champagne/70 bg-beige/30 p-6">
              <p className="font-serif text-xl leading-relaxed text-brown/85">“{t.quote}”</p>
              <footer className="mt-6 text-sm uppercase tracking-[0.16em] text-sage">
                {t.name} · {t.city}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="border-y border-champagne/50 bg-beige/30 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading eyebrow="Pricing" title="Demo plans for your invitation atelier" subtitle="All plans are illustrative for this frontend demo." />
          <div className="grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`border p-7 ${plan.highlighted ? 'border-olive bg-olive text-ivory' : 'border-champagne bg-ivory'}`}
              >
                <p className="text-xs uppercase tracking-[0.22em] opacity-80">{plan.name}</p>
                <p className="mt-4 font-display text-4xl">{plan.price}</p>
                <p className="mt-1 text-sm opacity-70">{plan.period}</p>
                <ul className="mt-6 space-y-2 text-sm opacity-90">
                  {plan.features.map((f) => (
                    <li key={f}>· {f}</li>
                  ))}
                </ul>
                <Button
                  className="mt-8 w-full"
                  variant={plan.highlighted ? 'soft' : 'primary'}
                  to="/create"
                >
                  Start designing
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 md:px-6">
        <SectionHeading eyebrow="FAQ" title="Questions, answered calmly" />
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <div key={item.q} className="border border-champagne/70 bg-ivory">
              <button
                type="button"
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                <span className="font-display text-lg text-olive">{item.q}</span>
                <span className="text-sage">{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && (
                <p className="border-t border-champagne/50 px-5 py-4 font-serif text-brown/75 leading-relaxed">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
        <FloralDivider className="mt-14" />
      </section>
    </div>
  )
}
