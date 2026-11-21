import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { Monitor, Smartphone, Save, Eye, ExternalLink } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import EditorForm from '../../components/editor/EditorForm'
import InvitationCard from '../../components/invitation/InvitationCard'
import Button from '../../components/common/Button'
import { coupleNames } from '../../utils/format'

export default function EditorPage() {
  const { id } = useParams()
  const { getInvitation, saveInvitation, user, ready } = useApp()
  const navigate = useNavigate()
  const existing = getInvitation(id)
  const [draft, setDraft] = useState(existing || null)
  const [device, setDevice] = useState('mobile')
  const [savedAt, setSavedAt] = useState(null)

  useEffect(() => {
    setDraft(existing || null)
  }, [existing])

  if (!ready) return null
  if (!user) return <Navigate to="/login" replace />
  if (!draft) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-display text-3xl text-olive">Invitation not found</h1>
        <Button className="mt-6" to="/invitations">Back to invitations</Button>
      </div>
    )
  }

  const persist = (status) => {
    const saved = saveInvitation({ ...draft, status: status || draft.status })
    setDraft(saved)
    setSavedAt(new Date())
    return saved
  }

  return (
    <div className="min-h-[calc(100vh-5rem)]">
      <div className="sticky top-[73px] z-30 border-b border-champagne/60 bg-ivory/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sage">Invitation Editor</p>
            <h1 className="font-display text-xl text-olive">{coupleNames(draft)}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="mr-2 flex rounded-sm border border-champagne overflow-hidden">
              <button
                type="button"
                className={`px-3 py-2 ${device === 'mobile' ? 'bg-olive text-ivory' : 'bg-ivory text-olive'}`}
                onClick={() => setDevice('mobile')}
                aria-label="Mobile preview"
              >
                <Smartphone size={16} />
              </button>
              <button
                type="button"
                className={`px-3 py-2 ${device === 'desktop' ? 'bg-olive text-ivory' : 'bg-ivory text-olive'}`}
                onClick={() => setDevice('desktop')}
                aria-label="Desktop preview"
              >
                <Monitor size={16} />
              </button>
            </div>
            <Button variant="soft" size="sm" onClick={() => persist('draft')}>
              <Save size={14} /> Save Draft
            </Button>
            <Button variant="secondary" size="sm" onClick={() => persist('published')}>
              Publish
            </Button>
            <Button size="sm" to={`/invite/${draft.shareSlug}`}>
              <Eye size={14} /> Live Preview
            </Button>
          </div>
        </div>
        {savedAt && (
          <p className="border-t border-champagne/40 px-4 py-1.5 text-center text-xs text-sage md:px-6">
            Saved locally at {savedAt.toLocaleTimeString()}
          </p>
        )}
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-6 lg:grid-cols-2 md:px-6">
        <div className="rounded-sm border border-champagne/70 bg-ivory p-5 md:p-6">
          <EditorForm value={draft} onChange={setDraft} />
          <div className="mt-8 flex flex-wrap gap-3 border-t border-champagne/50 pt-6">
            <Button onClick={() => persist(draft.status || 'draft')}>Save Changes</Button>
            <Button
              variant="secondary"
              onClick={() => {
                const saved = persist('published')
                navigate(`/invite/${saved.shareSlug}`)
              }}
            >
              <ExternalLink size={14} /> Publish & Open
            </Button>
            <Link to="/invitations" className="text-sm text-sage self-center hover:text-olive">
              Back to list
            </Link>
          </div>
        </div>

        <div className="lg:sticky lg:top-36 lg:self-start">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-sage">Live Preview</p>
          <div className="flex justify-center rounded-sm bg-beige/50 p-4 md:p-8">
            <div
              className={`w-full transition-all ${
                device === 'mobile' ? 'max-w-[390px]' : 'max-w-3xl'
              }`}
            >
              <InvitationCard invitation={draft} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
