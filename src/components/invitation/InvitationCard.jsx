import { formatDate, formatTime, coupleNames } from '../../utils/format'
import { getThemeColors } from '../../data/dummyInvitations'
import { fontCombos } from '../../data/dummyTemplates'
import FloralDivider from '../common/FloralDivider'

export default function InvitationCard({ invitation, compact = false }) {
  if (!invitation) return null
  const theme = getThemeColors(invitation.design?.colorTheme)
  const fonts = fontCombos.find((f) => f.id === invitation.design?.fontCombo) || fontCombos[0]
  const couple = coupleNames(invitation)

  return (
    <div
      className={`relative overflow-hidden rounded-sm border ${compact ? 'p-6' : 'p-8 md:p-10'}`}
      style={{
        background: theme.background,
        borderColor: `${theme.accent}99`,
        color: theme.primary,
        fontFamily: `"${fonts.body}", sans-serif`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-3 border opacity-60"
        style={{ borderColor: theme.accent }}
      />
      {invitation.design?.floral !== 'none' && (
        <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-20" style={{ background: theme.secondary }} />
      )}

      <div className="relative text-center">
        <p
          className="text-[10px] uppercase tracking-[0.35em]"
          style={{ color: theme.secondary }}
        >
          {invitation.weddingTitle || 'Wedding Invitation'}
        </p>
        <h3
          className={`${compact ? 'mt-4 text-3xl' : 'mt-5 text-4xl md:text-5xl'} leading-tight`}
          style={{ fontFamily: `"${fonts.display}", serif` }}
        >
          {couple}
        </h3>
        <FloralDivider className="my-5" />
        <p className="font-serif text-lg" style={{ color: `${theme.primary}cc` }}>
          {formatDate(invitation.weddingDate)}
          {invitation.weddingTime ? ` · ${formatTime(invitation.weddingTime)}` : ''}
        </p>
        <p className="mt-2 text-sm tracking-wide" style={{ color: theme.secondary }}>
          {invitation.venue || 'Venue to be announced'}
        </p>
        {invitation.photos?.couple && !compact && (
          <div className="mx-auto mt-6 aspect-[4/3] max-w-sm overflow-hidden rounded-sm">
            <img
              src={invitation.photos.couple}
              alt={couple}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        {!compact && invitation.welcomeText && (
          <p className="mx-auto mt-6 max-w-md font-serif text-base leading-relaxed opacity-80">
            {invitation.welcomeText}
          </p>
        )}
      </div>
    </div>
  )
}
