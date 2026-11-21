import { useState } from 'react'
import { Copy, Eye, Pencil, Trash2, CopyPlus } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Button from '../../components/common/Button'
import Badge from '../../components/common/Badge'
import EmptyState from '../../components/common/EmptyState'
import { coupleNames, formatDate } from '../../utils/format'
import { dummyTemplates } from '../../data/dummyTemplates'

export default function MyInvitationsPage() {
  const { invitations, duplicateInvitation, deleteInvitation } = useApp()
  const [copied, setCopied] = useState(null)

  const copyLink = async (slug, id) => {
    const url = `${window.location.origin}/invite/${slug}`
    await navigator.clipboard.writeText(url)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  if (invitations.length === 0) {
    return (
      <EmptyState
        title="No invitations yet"
        description="Start with a template and craft your first digital wedding card."
        actionLabel="Create invitation"
        to="/create"
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-sage">Library</p>
          <h1 className="mt-2 font-display text-3xl text-olive">My Invitations</h1>
        </div>
        <Button to="/create">Create new</Button>
      </div>

      <div className="space-y-4">
        {invitations.map((inv) => {
          const template = dummyTemplates.find((t) => t.id === inv.templateId)
          return (
            <article key={inv.id} className="rounded-sm border border-champagne/70 bg-ivory p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-2xl text-olive">{coupleNames(inv)}</h2>
                    <Badge tone={inv.status}>{inv.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-brown/70">
                    {formatDate(inv.weddingDate)} · {template?.name || 'Custom'} · Created {formatDate(inv.createdAt)}
                  </p>
                  <p className="mt-1 text-xs text-sage">/{inv.shareSlug}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="ghost" to={`/invite/${inv.shareSlug}`}>
                    <Eye size={14} /> Preview
                  </Button>
                  <Button size="sm" variant="soft" to={`/editor/${inv.id}`}>
                    <Pencil size={14} /> Edit
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => duplicateInvitation(inv.id)}>
                    <CopyPlus size={14} /> Duplicate
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => copyLink(inv.shareSlug, inv.id)}>
                    <Copy size={14} /> {copied === inv.id ? 'Copied' : 'Share'}
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      if (window.confirm('Delete this invitation?')) deleteInvitation(inv.id)
                    }}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
