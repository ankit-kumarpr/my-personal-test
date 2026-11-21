import { cn } from '../../utils/format'

const tones = {
  draft: 'bg-beige text-brown',
  published: 'bg-sage/20 text-olive',
  confirmed: 'bg-emerald-100 text-emerald-800',
  pending: 'bg-amber-100 text-amber-800',
  declined: 'bg-rose-100 text-rose-800',
  default: 'bg-beige text-olive',
}

export default function Badge({ children, tone = 'default', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em]',
        tones[tone] || tones.default,
        className,
      )}
    >
      {children}
    </span>
  )
}
