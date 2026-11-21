import { useMemo, useState } from 'react'
import { useApp } from '../../context/AppContext'
import Badge from '../../components/common/Badge'
import { formatDate } from '../../utils/format'
import { cn } from '../../utils/format'

export default function RSVPPage() {
  const { guests, rsvps, invitations } = useApp()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const guestStats = useMemo(() => {
    const confirmed = guests.filter((g) => g.rsvpStatus === 'confirmed')
    const pending = guests.filter((g) => g.rsvpStatus === 'pending')
    const declined = guests.filter((g) => g.rsvpStatus === 'declined')
    return {
      totalGuests: guests.reduce((sum, g) => sum + (Number(g.attendees) || 0), 0),
      confirmed: confirmed.length,
      pending: pending.length,
      declined: declined.length,
    }
  }, [guests])

  const filtered = useMemo(() => {
    return rsvps.filter((r) => {
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        r.guestName.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q)
      const matchesFilter = filter === 'all' || r.attendance === filter
      return matchesQuery && matchesFilter
    })
  }, [rsvps, query, filter])

  const toneFor = (attendance) => {
    if (attendance === 'yes') return 'confirmed'
    if (attendance === 'no') return 'declined'
    return 'pending'
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-sage">Responses</p>
        <h1 className="mt-2 font-display text-3xl text-olive">RSVP Management</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Total Guests', guestStats.totalGuests],
          ['Confirmed', guestStats.confirmed],
          ['Pending', guestStats.pending],
          ['Declined', guestStats.declined],
        ].map(([label, value]) => (
          <div key={label} className="rounded-sm border border-champagne/70 bg-beige/30 p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-sage">{label}</p>
            <p className="mt-3 font-display text-3xl text-olive">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search RSVPs…"
          className="w-full max-w-md rounded-sm border border-champagne bg-ivory px-3 py-2.5 text-sm outline-none focus:border-sage"
        />
        <div className="flex gap-2">
          {['all', 'yes', 'maybe', 'no'].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-sm px-3 py-2 text-xs uppercase tracking-wider',
                filter === f ? 'bg-olive text-ivory' : 'bg-beige text-brown',
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-sm border border-champagne/70 bg-ivory">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-champagne/60 bg-beige/40 text-xs uppercase tracking-[0.14em] text-sage">
            <tr>
              <th className="px-4 py-3">Guest</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Guests</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Invitation</th>
              <th className="px-4 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => {
              const inv = invitations.find((i) => i.id === r.invitationId)
              return (
                <tr key={r.id} className="border-b border-champagne/40 last:border-0">
                  <td className="px-4 py-3 font-medium text-olive">{r.guestName}</td>
                  <td className="px-4 py-3 text-brown/70">
                    <div>{r.email}</div>
                    <div className="text-xs">{r.phone}</div>
                  </td>
                  <td className="px-4 py-3">{r.guests}</td>
                  <td className="px-4 py-3">
                    <Badge tone={toneFor(r.attendance)}>{r.attendance}</Badge>
                  </td>
                  <td className="px-4 py-3 text-brown/70">{inv ? `${inv.brideName?.split(' ')[0]} & ${inv.groomName?.split(' ')[0]}` : r.invitationId}</td>
                  <td className="px-4 py-3 text-brown/60">{formatDate(r.submittedAt)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="px-4 py-10 text-center text-brown/60">No RSVP records match your filters.</p>
        )}
      </div>
    </div>
  )
}
