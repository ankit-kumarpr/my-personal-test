import { Link } from 'react-router-dom'
import { cn } from '../../utils/format'

const variants = {
  primary:
    'bg-olive text-ivory hover:bg-[#2f3627] shadow-[0_10px_30px_rgba(65,75,53,0.18)]',
  secondary:
    'bg-transparent text-olive border border-champagne hover:bg-beige',
  soft: 'bg-beige text-brown hover:bg-champagne/50',
  ghost: 'bg-transparent text-olive hover:bg-beige/70',
  danger: 'bg-[#8B3A3A] text-ivory hover:bg-[#6f2d2d]',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  to,
  href,
  type = 'button',
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-sm font-sans font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none',
    variants[variant],
    sizes[size],
    className,
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
