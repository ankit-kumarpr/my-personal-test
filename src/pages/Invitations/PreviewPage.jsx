import { Link, useParams } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import InvitationCard from '../../components/invitation/InvitationCard'
import Button from '../../components/common/Button'
import { coupleNames } from '../../utils/format'

export default function PreviewPage() {
  const { id } = useParams()
  const { getInvitation } = useApp()
  const invitation = getInvitation(id)

  if (!invitation) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-3xl text-olive">Preview unavailable</h1>
        <Button className="mt-6" to="/invitations">My Invitations</Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-sage">Studio Preview</p>
          <h1 className="font-display text-3xl text-olive">{coupleNames(invitation)}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" to={`/editor/${invitation.id}`}>Edit</Button>
          <Button size="sm" to={`/invite/${invitation.shareSlug}`}>Open Public Page</Button>
        </div>
      </div>
      <InvitationCard invitation={invitation} />
      <p className="mt-6 text-center text-sm text-brown/60">
        Or share{' '}
        <Link className="text-sage underline" to={`/invite/${invitation.shareSlug}`}>
          /invite/{invitation.shareSlug}
        </Link>
      </p>
    </div>
  )
}
