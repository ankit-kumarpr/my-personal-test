import { Link } from 'react-router-dom'
import { Mail, FileEdit, CheckCircle2, Users, Plus } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Button from '../../components/common/Button'
import Badge from '../../components/common/Badge'
import { coupleNames, formatDate } from '../../utils/format'
import { dummyTemplates } from '../../data/dummyTemplates'

export default function DashboardPage() {
  const { user, invitations, rsvps, stats } = useApp()
  const recent = [...invitations].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 4)
  const activity = [...rsvps].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)).slice(0, 5)

  const cards = [
    { label: 'Total Invitations', value: String(stats.total).padStart(2, '0'), icon: Mail },
    { label: 'Published', value: String(stats.published).padStart(2, '0'), icon: CheckCircle2 },
    { label: 'Drafts', value: String(stats.drafts).padStart(2, '0'), icon: FileEdit },
    { label: 'RSVP Responses', value: String(stats.rsvpCount), icon: Users },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-sage">Dashboard</p>
          <h1 className="mt-2 font-display text-3xl text-olive md:text-4xl">
            Welcome, {user?.name?.split(' ')[0]}
          </h1>
          <p className="mt-2 font-serif text-brown/70">Your invitation atelier at a glance.</p>
        </div>
        <Button to="/create">
          <Plus size={16} /> Quick Create
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-sm border border-champagne/70 bg-beige/30 p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.16em] text-sage">{card.label}</p>
              <card.icon size={16} className="text-olive/60" />
            </div>
            <p className="mt-4 font-display text-4xl text-olive">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="rounded-sm border border-champagne/70 bg-ivory p-5 lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-2xl text-olive">Recent invitations</h2>
            <Link to="/invitations" className="text-sm text-sage hover:text-olive">View all</Link>
          </div>
          <div className="space-y-3">
            {recent.map((inv) => {
              const template = dummyTemplates.find((t) => t.id === inv.templateId)
              return (
                <div key={inv.id} className="flex flex-wrap items-center justify-between gap-3 border border-champagne/50 bg-beige/20 px-4 py-3">
                  <div>
                    <p className="font-medium text-olive">{coupleNames(inv)}</p>
                    <p className="text-xs text-brown/60">
                      {formatDate(inv.weddingDate)} · {template?.name || 'Template'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone={inv.status}>{inv.status}</Badge>
                    <Button size="sm" variant="ghost" to={`/editor/${inv.id}`}>Edit</Button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="rounded-sm border border-champagne/70 bg-ivory p-5 lg:col-span-2">
          <h2 className="font-display text-2xl text-olive">Recent activity</h2>
          <div className="mt-4 space-y-4">
            {activity.length === 0 && <p className="text-sm text-brown/60">No RSVP activity yet.</p>}
            {activity.map((r) => (
              <div key={r.id} className="border-b border-champagne/40 pb-3 last:border-0">
                <p className="text-sm text-olive">{r.guestName} · {r.attendance}</p>
                <p className="text-xs text-brown/55">{formatDate(r.submittedAt)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
