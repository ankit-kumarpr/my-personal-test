import { useEffect, useState } from 'react'
import { weddingData } from '../../data/weddingData'

function getParts(target) {
  const end = new Date(target).getTime()
  const now = Date.now()
  const diff = Math.max(0, end - now)
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function CountdownTimer() {
  const [parts, setParts] = useState(() => getParts(weddingData.date.iso))

  useEffect(() => {
    const id = setInterval(() => setParts(getParts(weddingData.date.iso)), 1000)
    return () => clearInterval(id)
  }, [])

  const items = [
    { label: 'Days', value: parts.days },
    { label: 'Hours', value: parts.hours },
    { label: 'Minutes', value: parts.minutes },
    { label: 'Seconds', value: parts.seconds },
  ]

  return (
    <div className="grid grid-cols-4 gap-2 px-5">
      {items.map((item) => (
        <div key={item.label} className="countdown-box">
          <div className="font-display text-2xl text-[#414B35]">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="mt-1 text-[9px] uppercase tracking-[0.16em] text-[#7B8467]">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  )
}
