import { dummyUsers } from '../data/dummyUsers'
import { dummyInvitations } from '../data/dummyInvitations'
import { dummyGuests } from '../data/dummyGuests'
import { dummyRSVP } from '../data/dummyRSVP'

const KEYS = {
  users: 'velvetvow_users',
  session: 'velvetvow_session',
  invitations: 'velvetvow_invitations',
  guests: 'velvetvow_guests',
  rsvps: 'velvetvow_rsvps',
  seeded: 'velvetvow_seeded_v1',
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function seedDemoData(force = false) {
  if (!force && localStorage.getItem(KEYS.seeded)) return
  write(KEYS.users, dummyUsers)
  write(KEYS.invitations, dummyInvitations)
  write(KEYS.guests, dummyGuests)
  write(KEYS.rsvps, dummyRSVP)
  localStorage.setItem(KEYS.seeded, '1')
}

export function resetDemoData() {
  localStorage.removeItem(KEYS.session)
  seedDemoData(true)
}

export const storage = {
  getUsers: () => read(KEYS.users, dummyUsers),
  saveUsers: (users) => write(KEYS.users, users),
  getSession: () => read(KEYS.session, null),
  setSession: (user) => write(KEYS.session, user),
  clearSession: () => localStorage.removeItem(KEYS.session),
  getInvitations: () => read(KEYS.invitations, dummyInvitations),
  saveInvitations: (items) => write(KEYS.invitations, items),
  getGuests: () => read(KEYS.guests, dummyGuests),
  saveGuests: (items) => write(KEYS.guests, items),
  getRSVPs: () => read(KEYS.rsvps, dummyRSVP),
  saveRSVPs: (items) => write(KEYS.rsvps, items),
}
