import { useCallback, useRef, useState } from 'react'
import Preloader from './components/invite/Preloader'
import InvitationGate from './components/invite/InvitationGate'
import InvitationReveal from './components/invite/InvitationReveal'

export default function App() {
  const [phase, setPhase] = useState('loading') // loading | gate | invite
  const locked = useRef({ loading: false, gate: false })

  const finishPreloader = useCallback(() => {
    if (locked.current.loading) return
    locked.current.loading = true
    setPhase('gate')
  }, [])

  const finishGate = useCallback(() => {
    if (locked.current.gate) return
    locked.current.gate = true
    setPhase('invite')
    requestAnimationFrame(() => window.scrollTo(0, 0))
  }, [])

  return (
    <div className="min-h-[100dvh] bg-[#1a1c16]">
      {phase === 'loading' && <Preloader onComplete={finishPreloader} />}

      {/* Invitation sits under the gate so opening reveals the real card */}
      {(phase === 'gate' || phase === 'invite') && (
        <div
          className={phase === 'gate' ? 'pointer-events-none select-none' : ''}
          aria-hidden={phase === 'gate'}
          {...(phase === 'gate' ? { inert: true } : {})}
        >
          <InvitationReveal animateIntro={phase === 'invite'} />
        </div>
      )}

      {phase === 'gate' && <InvitationGate onOpened={finishGate} />}
    </div>
  )
}
