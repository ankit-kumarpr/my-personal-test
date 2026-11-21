import { useEffect, useState } from 'react'
import { getCountdown } from '../../utils/format'

export default function Countdown({ date, accent = '#7B8467' }) {
  const [parts, setParts] = useState(() => getCountdown(date))

  useEffect(() => {
    setParts(getCountdown(date))
    const id = setInterval(() => setParts(getCountdown(date)), 1000)
    return () => clearInterval(id)
  }, [date])

  if (!date) return null

  const items = [
    { label: 'Days', value: parts.days },
    { label: 'Hours', value: parts.hours },
    { label: 'Minutes', value: parts.minutes },
    { label: 'Seconds', value: parts.seconds },
  ]

  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-sm border border-champagne/60 bg-ivory/70 px-2 py-4 text-center"
        >
          <div className="font-display text-2xl md:text-3xl" style={{ color: accent }}>
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-sage">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
