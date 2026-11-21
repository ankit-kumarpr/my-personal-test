export default function FloralDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-champagne ${className}`} aria-hidden>
      <span className="h-px w-12 bg-current" />
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
        <path
          d="M20 4c-2 6-8 10-8 16a8 8 0 1 0 16 0c0-6-6-10-8-16z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="20" cy="22" r="2.5" fill="currentColor" opacity="0.7" />
      </svg>
      <span className="h-px w-12 bg-current" />
    </div>
  )
}
