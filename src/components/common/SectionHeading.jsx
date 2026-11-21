export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <div className={`mb-10 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}>
      {eyebrow && (
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-sage">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl text-olive md:text-4xl lg:text-[2.75rem] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 font-serif text-lg text-brown/75 leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}
