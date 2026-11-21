export default function CurtainHeader() {
  return (
    <div className="pointer-events-none relative h-36 w-full overflow-hidden md:h-44" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 170" preserveAspectRatio="xMidYMin slice">
        <defs>
          <linearGradient id="foldL" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#A6875F" />
            <stop offset="25%" stopColor="#E8D5B0" />
            <stop offset="50%" stopColor="#C4A574" />
            <stop offset="75%" stopColor="#F0E4CC" />
            <stop offset="100%" stopColor="#B8956A" />
          </linearGradient>
          <linearGradient id="foldR" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#A6875F" />
            <stop offset="25%" stopColor="#E8D5B0" />
            <stop offset="50%" stopColor="#C4A574" />
            <stop offset="75%" stopColor="#F0E4CC" />
            <stop offset="100%" stopColor="#B8956A" />
          </linearGradient>
          <linearGradient id="topVal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5EBDA" />
            <stop offset="55%" stopColor="#D8C5A5" />
            <stop offset="100%" stopColor="#B8956A" />
          </linearGradient>
        </defs>

        {/* Left drape — soft cloth folds only */}
        <path d="M0 0 H62 C54 55 66 105 48 170 H0 Z" fill="url(#foldL)" />
        <path d="M14 0 C20 60 10 115 18 170" stroke="#8F7348" strokeWidth="9" opacity="0.2" fill="none" />
        <path d="M30 0 C34 55 24 110 32 170" stroke="#F7EEDC" strokeWidth="11" opacity="0.28" fill="none" />
        <path d="M44 0 C46 50 40 105 44 170" stroke="#8F7348" strokeWidth="6" opacity="0.16" fill="none" />

        {/* Right drape */}
        <path d="M400 0 H338 C346 55 334 105 352 170 H400 Z" fill="url(#foldR)" />
        <path d="M386 0 C380 60 390 115 382 170" stroke="#8F7348" strokeWidth="9" opacity="0.2" fill="none" />
        <path d="M370 0 C366 55 376 110 368 170" stroke="#F7EEDC" strokeWidth="11" opacity="0.28" fill="none" />
        <path d="M356 0 C354 50 360 105 356 170" stroke="#8F7348" strokeWidth="6" opacity="0.16" fill="none" />

        {/* Scalloped valance */}
        <path
          d="M0 0 H400 V28
            C372 52 350 36 330 56
            C310 78 290 44 268 60
            C246 78 226 46 200 56
            C174 46 154 78 132 60
            C110 44 90 78 70 56
            C50 36 28 52 0 28 Z"
          fill="url(#topVal)"
        />
        <path
          d="M0 0 H400 V16 C345 32 280 18 200 28 C120 18 55 32 0 16 Z"
          fill="#F7EEDC"
          opacity="0.5"
        />

        {/* Subtle hanging beads */}
        {[70, 110, 150, 190, 230, 270, 310].map((x, i) => (
          <g key={x}>
            <line x1={x} y1="48" x2={x} y2={56 + (i % 2) * 3} stroke="#C4A574" strokeWidth="1.1" opacity="0.7" />
            <circle cx={x} cy={58 + (i % 2) * 3} r="2.1" fill="#C4A574" opacity="0.75" />
          </g>
        ))}
      </svg>
    </div>
  )
}
