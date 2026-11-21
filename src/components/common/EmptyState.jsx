import Button from './Button'

export default function EmptyState({ title, description, actionLabel, to, onClick }) {
  return (
    <div className="rounded-sm border border-dashed border-champagne bg-ivory/70 px-6 py-16 text-center">
      <h3 className="font-display text-2xl text-olive">{title}</h3>
      {description && <p className="mt-3 font-serif text-brown/70">{description}</p>}
      {(to || onClick) && (
        <div className="mt-6">
          <Button to={to} onClick={onClick}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  )
}
