function LeafSpray({ x, y, r = 0, s = 1 }) {
  // Manual emboss: shadow copy → base → highlight copy
  const stem = 'M0 34 C1.6 22 2.4 11 1.3 0'
  const leafA = 'M1.2 8 C-5.5 2.5 -11 8 -8 15.5 C-4 18.5 1.2 15 1.2 8 Z'
  const leafB = 'M1.5 16 C10 10.5 14.5 16 10.5 22.5 C6 25 1.6 21.5 1.5 16 Z'
  const leafC = 'M1 24 C-4.5 20.5 -8 25 -5 30 C-1.2 31.5 1.6 28 1 24 Z'
  const bud = 'M0.9 2.5 C-2.5 -0.5 -0.6 -4 2.8 -2.3 C4.6 0.2 3.2 2.8 0.9 2.5 Z'

  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {/* Deep shadow (deboss pocket) */}
      <g transform="translate(0.7 0.85)" opacity="0.38">
        <path d={stem} fill="none" stroke="#1a2015" strokeWidth="0.95" strokeLinecap="round" />
        <path d={leafA} fill="#1a2015" />
        <path d={leafB} fill="#1a2015" />
        <path d={leafC} fill="#1a2015" />
        <path d={bud} fill="#1a2015" />
      </g>

      {/* Mid base tone */}
      <g opacity="0.55">
        <path d={stem} fill="none" stroke="#4d5642" strokeWidth="0.75" strokeLinecap="round" />
        <path d={leafA} fill="#556148" />
        <path d={leafB} fill="#5d694f" />
        <path d={leafC} fill="#4f5943" />
        <path d={bud} fill="#657154" />
      </g>

      {/* Soft highlight edge (raised light catch) */}
      <g transform="translate(-0.55 -0.65)" opacity="0.42">
        <path d={stem} fill="none" stroke="#dce5cf" strokeWidth="0.55" strokeLinecap="round" />
        <path d={leafA} fill="none" stroke="#dce5cf" strokeWidth="0.45" />
        <path d={leafB} fill="none" stroke="#dce5cf" strokeWidth="0.45" />
        <path d={leafC} fill="none" stroke="#dce5cf" strokeWidth="0.4" />
        <path d={bud} fill="none" stroke="#e8efdc" strokeWidth="0.4" />
      </g>

      {/* Vein detail */}
      <g opacity="0.28">
        <path d="M-0.2 9.2 C-3.2 11 -5.5 13.5 -3.8 15" fill="none" stroke="#2a3123" strokeWidth="0.22" />
        <path d="M2.8 17.2 C6.5 15.5 9.5 17.5 8.2 21" fill="none" stroke="#2a3123" strokeWidth="0.22" />
      </g>
    </g>
  )
}

export default function EmbossedLeaves({ mirror = false }) {
  const sprays = [
    { x: 12, y: 4, r: -24, s: 1.2 },
    { x: 46, y: 2, r: 16, s: 1.05 },
    { x: 78, y: 10, r: -12, s: 1.25 },
    { x: 26, y: 26, r: 28, s: 1 },
    { x: 58, y: 30, r: -32, s: 1.3 },
    { x: 88, y: 34, r: 18, s: 1.08 },
    { x: 8, y: 48, r: -10, s: 1.15 },
    { x: 38, y: 52, r: 22, s: 1.05 },
    { x: 70, y: 56, r: -26, s: 1.22 },
    { x: 18, y: 72, r: 14, s: 1.12 },
    { x: 50, y: 76, r: -18, s: 1.28 },
    { x: 82, y: 80, r: 20, s: 1.02 },
    { x: 32, y: 94, r: -16, s: 1.18 },
    { x: 64, y: 98, r: 24, s: 1.1 },
    { x: 6, y: 106, r: 8, s: 0.95 },
    { x: 92, y: 104, r: -22, s: 1.15 },
  ]

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 120"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      style={{ transform: mirror ? 'scaleX(-1)' : undefined }}
    >
      {sprays.map((s, i) => (
        <LeafSpray key={i} {...s} />
      ))}
    </svg>
  )
}
