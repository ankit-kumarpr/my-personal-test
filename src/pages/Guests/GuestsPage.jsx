import { useMemo, useState } from 'react'
import { useApp } from '../../context/AppContext'
import { guestCategories } from '../../data/dummyGuests'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Badge from '../../components/common/Badge'
import { coupleNames, cn } from '../../utils/format'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  category: 'Friends',
  attendees: 1,
  rsvpStatus: 'pending',
  invitationId: '',
  notes: '',
}

export default function GuestsPage() {
  const { guests, invitations, addGuest, updateGuest, deleteGuest } = useApp()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const filtered = useMemo(() => {
    return guests.filter((g) => {
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        g.name.toLowerCase().includes(q) ||
        g.email?.toLowerCase().includes(q) ||
        g.category?.toLowerCase().includes(q)
      const matchesStatus = status === 'all' || g.rsvpStatus === status
      return matchesQuery && matchesStatus
    })
  }, [guests, query, status])

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.invitationId) return
    if (editingId) {
      updateGuest(editingId, { ...form, attendees: Number(form.attendees) || 1 })
    } else {
      addGuest({ ...form, attendees: Number(form.attendees) || 1 })
    }
    setForm({ ...emptyForm, invitationId: invitations[0]?.id || '' })
    setEditingId(null)
  }

  const startEdit = (guest) => {
    setEditingId(guest.id)
    setForm({
      name: guest.name,
      email: guest.email || '',
      phone: guest.phone || '',
      category: guest.category || 'Friends',
      attendees: guest.attendees || 1,
      rsvpStatus: guest.rsvpStatus || 'pending',
      invitationId: guest.invitationId,
      notes: guest.notes || '',
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-sage">Guest list</p>
        <h1 className="mt-2 font-display text-3xl text-olive">Guest Management</h1>
      </div>

      <form onSubmit={submit} className="grid gap-3 rounded-sm border border-champagne/70 bg-ivory p-5 md:grid-cols-2">
        <h2 className="font-display text-xl text-olive md:col-span-2">
          {editingId ? 'Edit guest' : 'Add guest'}
        </h2>
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <Input label="Attendees" type="number" min={0} value={form.attendees} onChange={(e) => setForm({ ...form, attendees: e.target.value })} />
        <Input as="select" label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {guestCategories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Input>
        <Input as="select" label="RSVP Status" value={form.rsvpStatus} onChange={(e) => setForm({ ...form, rsvpStatus: e.target.value })}>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="declined">Declined</option>
        </Input>
        <Input
          as="select"
          label="Invitation"
          className="md:col-span-2"
          value={form.invitationId}
          onChange={(e) => setForm({ ...form, invitationId: e.target.value })}
          required
        >
          <option value="">Select invitation</option>
          {invitations.map((inv) => (
            <option key={inv.id} value={inv.id}>{coupleNames(inv)}</option>
          ))}
        </Input>
        <Input
          as="textarea"
          rows={2}
          label="Notes"
          className="md:col-span-2"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <div className="flex gap-2 md:col-span-2">
          <Button type="submit">{editingId ? 'Update guest' : 'Add guest'}</Button>
          {editingId && (
            <Button type="button" variant="ghost" onClick={() => { setEditingId(null); setForm(emptyForm) }}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="flex flex-col gap-3 md:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search guests…"
          className="w-full max-w-md rounded-sm border border-champagne bg-ivory px-3 py-2.5 text-sm outline-none"
        />
        <div className="flex gap-2">
          {['all', 'confirmed', 'pending', 'declined'].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={cn(
                'rounded-sm px-3 py-2 text-xs uppercase tracking-wider',
                status === s ? 'bg-olive text-ivory' : 'bg-beige text-brown',
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((guest) => {
          const inv = invitations.find((i) => i.id === guest.invitationId)
          return (
            <div key={guest.id} className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-champagne/70 bg-ivory px-4 py-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-olive">{guest.name}</p>
                  <Badge tone={guest.rsvpStatus}>{guest.rsvpStatus}</Badge>
                  <span className="text-xs text-sage">{guest.category}</span>
                </div>
                <p className="mt-1 text-sm text-brown/65">
                  {guest.email} · {guest.phone} · {guest.attendees} attending
                </p>
                <p className="text-xs text-brown/50">{inv ? coupleNames(inv) : guest.invitationId}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="soft" onClick={() => startEdit(guest)}>Edit</Button>
                <Button size="sm" variant="danger" onClick={() => deleteGuest(guest.id)}>Delete</Button>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-brown/60">No guests found.</p>
        )}
      </div>
    </div>
  )
}
