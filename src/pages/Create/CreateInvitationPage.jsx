import { useMemo, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import {
  dummyTemplates,
  colorThemes,
  fontCombos,
  layoutStyles,
  floralStyles,
  animationStyles,
} from '../../data/dummyTemplates'
import { createBlankInvitation, defaultEvents } from '../../data/dummyInvitations'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import InvitationCard from '../../components/invitation/InvitationCard'
import { Plus, Trash2 } from 'lucide-react'

const steps = [
  'Basic Information',
  'Wedding Details',
  'Wedding Events',
  'Photos & Media',
  'Design',
  'Preview',
]

export default function CreateInvitationPage() {
  const { user, ready, createInvitation, saveInvitation } = useApp()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const templateId = params.get('template') || 'tpl-royal-jaipur'
  const template = dummyTemplates.find((t) => t.id === templateId) || dummyTemplates[0]

  const initial = useMemo(
    () =>
      createBlankInvitation({
        templateId: template.id,
        brideName: 'Ananya Sharma',
        groomName: 'Aarav Mehta',
        brideFamily: 'Sharma',
        groomFamily: 'Mehta',
        weddingTitle: 'The Wedding of Ananya & Aarav',
        weddingDate: '2027-02-15',
        weddingTime: '18:30',
        venue: 'The Royal Palace, Jaipur',
        venueAddress: 'Amber Road, Jaipur, Rajasthan 302002',
        events: defaultEvents.map((e) => ({ ...e, id: `${e.id}-${Date.now()}` })),
        photos: {
          bride: '',
          groom: '',
          couple: template.previewImage,
          gallery: template.gallery || [],
          background: '',
        },
        design: {
          colorTheme: template.colorTheme,
          fontCombo: template.fontCombo,
          layout: template.layout,
          floral: template.floral,
          background: 'ivory-linen',
          animation: template.animation,
        },
      }),
    [template],
  )

  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState(initial)
  const [invitationId, setInvitationId] = useState(null)

  if (!ready) return null
  if (!user) return <Navigate to="/login" replace state={{ from: '/create' }} />

  const update = (patch) => setDraft((d) => ({ ...d, ...patch }))
  const updateDesign = (patch) => setDraft((d) => ({ ...d, design: { ...d.design, ...patch } }))
  const updatePhotos = (patch) => setDraft((d) => ({ ...d, photos: { ...d.photos, ...patch } }))

  const onFile = (key, files, multiple = false) => {
    if (!files?.length) return
    if (multiple) {
      const urls = [...(draft.photos.gallery || [])]
      Array.from(files).forEach((f) => urls.push(URL.createObjectURL(f)))
      updatePhotos({ gallery: urls })
      return
    }
    updatePhotos({ [key]: URL.createObjectURL(files[0]) })
  }

  const persist = (status = 'draft') => {
    const payload = { ...draft, status, id: invitationId || draft.id }
    let saved
    if (invitationId) {
      saved = saveInvitation(payload)
    } else {
      saved = createInvitation(payload)
      setInvitationId(saved.id)
      setDraft(saved)
    }
    return saved
  }

  const addEvent = () => {
    update({
      events: [
        ...(draft.events || []),
        {
          id: `ev-${Date.now()}`,
          name: 'Sangeet',
          date: draft.weddingDate,
          startTime: '19:00',
          venue: draft.venue,
          description: '',
        },
      ],
    })
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-sage">Invitation builder</p>
        <h1 className="mt-2 font-display text-3xl text-olive">Create Invitation</h1>
        <p className="mt-2 text-sm text-brown/65">Based on {template.name}</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {steps.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(i)}
            className={`whitespace-nowrap rounded-sm px-3 py-2 text-xs uppercase tracking-[0.12em] ${
              i === step ? 'bg-olive text-ivory' : i < step ? 'bg-sage/30 text-olive' : 'bg-beige text-brown/70'
            }`}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>

      <div className="rounded-sm border border-champagne/70 bg-ivory p-5 md:p-8">
        {step === 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Bride Name" value={draft.brideName} onChange={(e) => update({ brideName: e.target.value })} />
            <Input label="Groom Name" value={draft.groomName} onChange={(e) => update({ groomName: e.target.value })} />
            <Input label="Bride Family Name" value={draft.brideFamily} onChange={(e) => update({ brideFamily: e.target.value })} />
            <Input label="Groom Family Name" value={draft.groomFamily} onChange={(e) => update({ groomFamily: e.target.value })} />
            <Input className="sm:col-span-2" label="Wedding Title" value={draft.weddingTitle} onChange={(e) => update({ weddingTitle: e.target.value })} />
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input type="date" label="Wedding Date" value={draft.weddingDate} onChange={(e) => update({ weddingDate: e.target.value })} />
            <Input type="time" label="Wedding Time" value={draft.weddingTime} onChange={(e) => update({ weddingTime: e.target.value })} />
            <Input className="sm:col-span-2" label="Venue" value={draft.venue} onChange={(e) => update({ venue: e.target.value })} />
            <Input className="sm:col-span-2" label="Venue Address" value={draft.venueAddress} onChange={(e) => update({ venueAddress: e.target.value })} />
            <Input className="sm:col-span-2" label="Google Maps URL (demo)" value={draft.mapsUrl} onChange={(e) => update({ mapsUrl: e.target.value })} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h2 className="font-display text-xl text-olive">Events</h2>
              <Button size="sm" variant="soft" onClick={addEvent}><Plus size={14} /> Add event</Button>
            </div>
            {(draft.events || []).map((event, idx) => (
              <div key={event.id} className="space-y-3 rounded-sm border border-champagne/60 bg-beige/20 p-4">
                <div className="flex justify-between gap-2">
                  <Input
                    label="Event Name"
                    value={event.name}
                    onChange={(e) => {
                      const events = [...draft.events]
                      events[idx] = { ...event, name: e.target.value }
                      update({ events })
                    }}
                  />
                  <button
                    type="button"
                    className="mt-6 text-rose-700"
                    onClick={() => update({ events: draft.events.filter((ev) => ev.id !== event.id) })}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input type="date" label="Date" value={event.date} onChange={(e) => {
                    const events = [...draft.events]
                    events[idx] = { ...event, date: e.target.value }
                    update({ events })
                  }} />
                  <Input type="time" label="Start Time" value={event.startTime} onChange={(e) => {
                    const events = [...draft.events]
                    events[idx] = { ...event, startTime: e.target.value }
                    update({ events })
                  }} />
                </div>
                <Input label="Venue" value={event.venue} onChange={(e) => {
                  const events = [...draft.events]
                  events[idx] = { ...event, venue: e.target.value }
                  update({ events })
                }} />
                <Input as="textarea" rows={2} label="Description" value={event.description} onChange={(e) => {
                  const events = [...draft.events]
                  events[idx] = { ...event, description: e.target.value }
                  update({ events })
                }} />
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input type="file" accept="image/*" label="Bride Photo" onChange={(e) => onFile('bride', e.target.files)} />
            <Input type="file" accept="image/*" label="Groom Photo" onChange={(e) => onFile('groom', e.target.files)} />
            <Input type="file" accept="image/*" label="Couple Photo" onChange={(e) => onFile('couple', e.target.files)} />
            <Input type="file" accept="image/*" label="Background Image" onChange={(e) => onFile('background', e.target.files)} />
            <Input className="sm:col-span-2" type="file" accept="image/*" multiple label="Gallery Images" onChange={(e) => onFile('gallery', e.target.files, true)} />
            <Input
              as="select"
              className="sm:col-span-2"
              label="Background Music (demo only)"
              value={draft.music}
              onChange={(e) => update({ music: e.target.value })}
            >
              <option value="soft-piano">Soft Piano</option>
              <option value="string-quartet">String Quartet</option>
              <option value="sitar-ambient">Sitar Ambient</option>
              <option value="none">None</option>
            </Input>
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input as="select" label="Color Theme" value={draft.design.colorTheme} onChange={(e) => updateDesign({ colorTheme: e.target.value })}>
              {Object.values(colorThemes).map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </Input>
            <Input as="select" label="Font Combination" value={draft.design.fontCombo} onChange={(e) => updateDesign({ fontCombo: e.target.value })}>
              {fontCombos.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
            </Input>
            <Input as="select" label="Layout" value={draft.design.layout} onChange={(e) => updateDesign({ layout: e.target.value })}>
              {layoutStyles.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
            </Input>
            <Input as="select" label="Floral Decorations" value={draft.design.floral} onChange={(e) => updateDesign({ floral: e.target.value })}>
              {floralStyles.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </Input>
            <Input as="select" label="Background" value={draft.design.background} onChange={(e) => updateDesign({ background: e.target.value })}>
              <option value="ivory-linen">Ivory Linen</option>
              <option value="soft-blush">Soft Blush</option>
              <option value="ocean-haze">Ocean Haze</option>
              <option value="maroon-paper">Maroon Paper</option>
            </Input>
            <Input as="select" label="Animation Style" value={draft.design.animation} onChange={(e) => updateDesign({ animation: e.target.value })}>
              {animationStyles.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </Input>
          </div>
        )}

        {step === 5 && (
          <div className="mx-auto max-w-md">
            <InvitationCard invitation={draft} />
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Back</Button>
        <div className="flex flex-wrap gap-2">
          <Button variant="soft" onClick={() => persist('draft')}>Save Draft</Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)}>Next</Button>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => {
                  const saved = persist('draft')
                  navigate(`/preview/${saved.id}`)
                }}
              >
                Preview
              </Button>
              <Button
                onClick={() => {
                  const saved = persist('published')
                  navigate(`/editor/${saved.id}`)
                }}
              >
                Publish & Open Editor
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
