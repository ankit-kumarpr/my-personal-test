import { Plus, Trash2 } from 'lucide-react'
import Input from '../common/Input'
import Button from '../common/Button'
import {
  colorThemes,
  fontCombos,
  layoutStyles,
  floralStyles,
  animationStyles,
  dummyTemplates,
} from '../../data/dummyTemplates'

const musicOptions = [
  { id: 'soft-piano', label: 'Soft Piano (demo)' },
  { id: 'string-quartet', label: 'String Quartet (demo)' },
  { id: 'sitar-ambient', label: 'Sitar Ambient (demo)' },
  { id: 'none', label: 'No music' },
]

export default function EditorForm({ value, onChange }) {
  const update = (patch) => onChange({ ...value, ...patch })
  const updateDesign = (patch) => update({ design: { ...value.design, ...patch } })
  const updatePhotos = (patch) => update({ photos: { ...value.photos, ...patch } })

  const onFile = (key, file, multiple = false) => {
    if (!file) return
    if (multiple) {
      const urls = [...(value.photos.gallery || [])]
      Array.from(file).forEach((f) => urls.push(URL.createObjectURL(f)))
      updatePhotos({ gallery: urls })
      return
    }
    updatePhotos({ [key]: URL.createObjectURL(file) })
  }

  const addEvent = () => {
    update({
      events: [
        ...(value.events || []),
        {
          id: `ev-${Date.now()}`,
          name: 'New Event',
          date: value.weddingDate || '',
          startTime: '18:00',
          venue: value.venue || '',
          description: '',
        },
      ],
    })
  }

  const updateEvent = (id, patch) => {
    update({
      events: value.events.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    })
  }

  const removeEvent = (id) => {
    update({ events: value.events.filter((e) => e.id !== id) })
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h3 className="font-display text-xl text-olive">Couple Details</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="Bride Name" value={value.brideName} onChange={(e) => update({ brideName: e.target.value })} />
          <Input label="Groom Name" value={value.groomName} onChange={(e) => update({ groomName: e.target.value })} />
          <Input label="Bride Family" value={value.brideFamily} onChange={(e) => update({ brideFamily: e.target.value })} />
          <Input label="Groom Family" value={value.groomFamily} onChange={(e) => update({ groomFamily: e.target.value })} />
        </div>
        <Input label="Wedding Title" value={value.weddingTitle} onChange={(e) => update({ weddingTitle: e.target.value })} />
        <Input
          as="textarea"
          label="Welcome Text"
          rows={3}
          value={value.welcomeText}
          onChange={(e) => update({ welcomeText: e.target.value })}
        />
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl text-olive">Wedding Details</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input type="date" label="Date" value={value.weddingDate} onChange={(e) => update({ weddingDate: e.target.value })} />
          <Input type="time" label="Time" value={value.weddingTime} onChange={(e) => update({ weddingTime: e.target.value })} />
        </div>
        <Input label="Venue" value={value.venue} onChange={(e) => update({ venue: e.target.value })} />
        <Input label="Address" value={value.venueAddress} onChange={(e) => update({ venueAddress: e.target.value })} />
        <Input label="Maps URL" value={value.mapsUrl} onChange={(e) => update({ mapsUrl: e.target.value })} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl text-olive">Events</h3>
          <Button variant="soft" size="sm" onClick={addEvent}>
            <Plus size={14} /> Add
          </Button>
        </div>
        <div className="space-y-4">
          {(value.events || []).map((event) => (
            <div key={event.id} className="rounded-sm border border-champagne/70 bg-beige/30 p-4 space-y-3">
              <div className="flex justify-between gap-2">
                <Input label="Event" value={event.name} onChange={(e) => updateEvent(event.id, { name: e.target.value })} />
                <button type="button" className="mt-6 text-rose-700" onClick={() => removeEvent(event.id)} aria-label="Remove event">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input type="date" label="Date" value={event.date} onChange={(e) => updateEvent(event.id, { date: e.target.value })} />
                <Input type="time" label="Time" value={event.startTime} onChange={(e) => updateEvent(event.id, { startTime: e.target.value })} />
              </div>
              <Input label="Venue" value={event.venue} onChange={(e) => updateEvent(event.id, { venue: e.target.value })} />
              <Input
                as="textarea"
                rows={2}
                label="Description"
                value={event.description}
                onChange={(e) => updateEvent(event.id, { description: e.target.value })}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl text-olive">Photos & Media</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input type="file" accept="image/*" label="Bride Photo" onChange={(e) => onFile('bride', e.target.files?.[0])} />
          <Input type="file" accept="image/*" label="Groom Photo" onChange={(e) => onFile('groom', e.target.files?.[0])} />
          <Input type="file" accept="image/*" label="Couple Photo" onChange={(e) => onFile('couple', e.target.files?.[0])} />
          <Input type="file" accept="image/*" label="Background" onChange={(e) => onFile('background', e.target.files?.[0])} />
        </div>
        <Input type="file" accept="image/*" multiple label="Gallery Images" onChange={(e) => onFile('gallery', e.target.files, true)} />
        <Input as="select" label="Background Music (demo)" value={value.music} onChange={(e) => update({ music: e.target.value })}>
          {musicOptions.map((m) => (
            <option key={m.id} value={m.id}>{m.label}</option>
          ))}
        </Input>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl text-olive">Design</h3>
        <Input as="select" label="Template" value={value.templateId} onChange={(e) => update({ templateId: e.target.value })}>
          {dummyTemplates.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </Input>
        <Input as="select" label="Color Theme" value={value.design.colorTheme} onChange={(e) => updateDesign({ colorTheme: e.target.value })}>
          {Object.values(colorThemes).map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </Input>
        <Input as="select" label="Typography" value={value.design.fontCombo} onChange={(e) => updateDesign({ fontCombo: e.target.value })}>
          {fontCombos.map((f) => (
            <option key={f.id} value={f.id}>{f.label}</option>
          ))}
        </Input>
        <Input as="select" label="Layout" value={value.design.layout} onChange={(e) => updateDesign({ layout: e.target.value })}>
          {layoutStyles.map((l) => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </Input>
        <Input as="select" label="Florals" value={value.design.floral} onChange={(e) => updateDesign({ floral: e.target.value })}>
          {floralStyles.map((f) => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </Input>
        <Input as="select" label="Animation" value={value.design.animation} onChange={(e) => updateDesign({ animation: e.target.value })}>
          {animationStyles.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </Input>
      </section>
    </div>
  )
}
