export default function OrnateSeal() {
  return (
    <svg viewBox="0 0 160 160" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="sealMetal" cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#F7EEDC" />
          <stop offset="35%" stopColor="#E8D5B0" />
          <stop offset="70%" stopColor="#C9A86A" />
          <stop offset="100%" stopColor="#9E7A45" />
        </radialGradient>
        <radialGradient id="sealInner" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F3E8D2" />
          <stop offset="100%" stopColor="#D4B884" />
        </radialGradient>
        <filter id="sealDepth" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1a1c16" floodOpacity="0.45" />
        </filter>
      </defs>

      <g filter="url(#sealDepth)">
        {/* Outer rococo scallop */}
        <path
          d="M80 6
            C90 6 96 14 104 12 C114 10 120 18 128 22
            C136 28 142 36 144 46 C148 56 154 62 152 74
            C154 86 148 94 144 104 C140 116 130 122 122 130
            C112 138 104 146 92 148 C84 152 76 152 68 148
            C56 146 48 138 38 130 C28 122 20 114 16 104
            C10 94 6 86 8 74 C6 62 12 54 16 46
            C20 34 28 26 36 22 C46 16 52 10 64 12
            C70 14 74 6 80 6 Z"
          fill="url(#sealMetal)"
          stroke="#8F6E3E"
          strokeWidth="1.2"
        />
        {/* Ornamental ring */}
        <circle cx="80" cy="80" r="52" fill="none" stroke="#A6875F" strokeWidth="1.4" opacity="0.85" />
        <circle cx="80" cy="80" r="48" fill="url(#sealInner)" stroke="#B8956A" strokeWidth="0.8" />
        <circle cx="80" cy="80" r="43" fill="none" stroke="#8F6E3E" strokeWidth="0.6" opacity="0.5" strokeDasharray="2 3" />

        {/* Corner flourishes */}
        <path d="M80 34 C72 42 72 48 80 52 C88 48 88 42 80 34 Z" fill="#A6875F" opacity="0.35" />
        <path d="M80 108 C72 100 72 94 80 90 C88 94 88 100 80 108 Z" fill="#A6875F" opacity="0.35" />
      </g>
    </svg>
  )
}
