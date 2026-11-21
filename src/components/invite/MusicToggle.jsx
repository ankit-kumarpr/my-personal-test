import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function MusicToggle() {
  const [on, setOn] = useState(false)
  const audioRef = useRef(null)
  const ctxRef = useRef(null)
  const oscRef = useRef(null)

  useEffect(() => () => stopTone(), [])

  const stopTone = () => {
    try {
      oscRef.current?.stop()
      ctxRef.current?.close()
    } catch {
      /* ignore */
    }
    oscRef.current = null
    ctxRef.current = null
  }

  const startSoftTone = async () => {
    // Demo ambient tone — no external audio file required
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = 220
    gain.gain.value = 0.02
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    ctxRef.current = ctx
    oscRef.current = osc
    audioRef.current = { ctx, osc, gain }
  }

  const toggle = async () => {
    if (on) {
      stopTone()
      setOn(false)
      return
    }
    await startSoftTone()
    setOn(true)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed right-3 top-3 z-40 flex h-10 w-10 items-center justify-center rounded-md border border-[#D8C5A5]/70 bg-[#F4EFE6]/85 text-[#414B35] shadow-sm backdrop-blur md:right-[calc(50%-220px)]"
      aria-label={on ? 'Mute music' : 'Play music'}
      title="Demo music toggle"
    >
      {on ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  )
}
