import { cn } from '../../utils/format'

export default function Input({
  label,
  error,
  className,
  as = 'input',
  children,
  ...props
}) {
  const Comp = as
  return (
    <label className="block space-y-1.5">
      {label && (
        <span className="text-xs uppercase tracking-[0.18em] text-sage font-medium">
          {label}
        </span>
      )}
      <Comp
        className={cn(
          'w-full rounded-sm border border-champagne/80 bg-ivory px-3.5 py-2.5 text-sm text-brown outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20',
          error && 'border-red-400 focus:border-red-400 focus:ring-red-200',
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  )
}
