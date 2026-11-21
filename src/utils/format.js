export function formatDate(dateStr, options = {}) {
  if (!dateStr) return '—'
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  })
}

export function formatTime(timeStr) {
  if (!timeStr) return '—'
  const [h, m] = timeStr.split(':').map(Number)
  if (Number.isNaN(h)) return timeStr
  const date = new Date()
  date.setHours(h, m || 0, 0, 0)
  return date.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })
}

export function formatStatus(status) {
  return status ? status.charAt(0).toUpperCase() + status.slice(1) : ''
}

export function coupleNames(invitation) {
  if (!invitation) return 'Untitled Invitation'
  const bride = invitation.brideName?.trim()
  const groom = invitation.groomName?.trim()
  if (bride && groom) return `${bride} & ${groom}`
  return bride || groom || invitation.weddingTitle || 'Untitled Invitation'
}

export function getCountdown(targetDate) {
  if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true }
  const end = new Date(targetDate)
  if (targetDate.length === 10) end.setHours(23, 59, 59, 999)
  const now = new Date()
  const diff = end.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds, past: false }
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
