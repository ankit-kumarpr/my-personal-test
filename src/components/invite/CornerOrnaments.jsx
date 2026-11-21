export default function CornerOrnaments() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-24 z-[1] flex justify-between px-3 md:px-4" aria-hidden>
      <Ornament />
      <Ornament flip />
    </div>
  )
}

function Ornament({ flip = false }) {
  return (
    <svg
      width="56"
      height="72"
      viewBox="0 0 56 72"
      fill="none"
      style={{ transform: flip ? 'scaleX(-1)' : undefined, opacity: 0.55 }}
    >
      <path
        d="M8 8 C18 10 24 18 26 28 C20 24 12 22 6 24 C10 16 12 10 8 8 Z"
        stroke="#C4A574"
        strokeWidth="1.1"
      />
      <path
        d="M26 28 C30 40 28 52 22 64"
        stroke="#C4A574"
        strokeWidth="1.1"
        fill="none"
      />
      <path
        d="M26 34 C34 36 40 42 42 50"
        stroke="#C4A574"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="22" cy="64" r="2" fill="#C4A574" />
      <path d="M14 18 C18 16 22 18 24 22" stroke="#D8C5A5" strokeWidth="0.8" fill="none" />
    </svg>
  )
}
