import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { createBlankInvitation } from '../data/dummyInvitations'
import { seedDemoData, resetDemoData, storage } from '../services/storage'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState(null)
  const [invitations, setInvitations] = useState([])
  const [guests, setGuests] = useState([])
  const [rsvps, setRsvps] = useState([])

  useEffect(() => {
    seedDemoData()
    setUser(storage.getSession())
    setInvitations(storage.getInvitations())
    setGuests(storage.getGuests())
    setRsvps(storage.getRSVPs())
    setReady(true)
  }, [])

  const persistInvitations = (next) => {
    setInvitations(next)
    storage.saveInvitations(next)
  }

  const persistGuests = (next) => {
    setGuests(next)
    storage.saveGuests(next)
  }

  const persistRsvps = (next) => {
    setRsvps(next)
    storage.saveRSVPs(next)
  }

  const login = (email, password) => {
    const users = storage.getUsers()
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    )
    if (!found) return { ok: false, error: 'Invalid email or password. Try ananya@velvetvow.demo / demo123' }
    const { password: _, ...safe } = found
    storage.setSession(safe)
    setUser(safe)
    return { ok: true, user: safe }
  }

  const register = ({ name, email, password, phone }) => {
    const users = storage.getUsers()
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'An account with this email already exists.' }
    }
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      phone: phone || '',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
    }
    storage.saveUsers([...users, newUser])
    const { password: _, ...safe } = newUser
    storage.setSession(safe)
    setUser(safe)
    return { ok: true, user: safe }
  }

  const logout = () => {
    storage.clearSession()
    setUser(null)
  }

  const updateProfile = (updates) => {
    if (!user) return
    const users = storage.getUsers().map((u) => (u.id === user.id ? { ...u, ...updates } : u))
    storage.saveUsers(users)
    const next = { ...user, ...updates }
    delete next.password
    storage.setSession(next)
    setUser(next)
  }

  const getInvitation = (id) => invitations.find((i) => i.id === id)
  const getInvitationBySlug = (slug) => invitations.find((i) => i.shareSlug === slug)

  const saveInvitation = (invitation) => {
    const withMeta = {
      ...invitation,
      updatedAt: new Date().toISOString(),
      userId: invitation.userId || user?.id || 'user-1',
    }
    const exists = invitations.some((i) => i.id === withMeta.id)
    const next = exists
      ? invitations.map((i) => (i.id === withMeta.id ? withMeta : i))
      : [withMeta, ...invitations]
    persistInvitations(next)
    return withMeta
  }

  const createInvitation = (partial = {}) => {
    const draft = createBlankInvitation({
      userId: user?.id || 'user-1',
      ...partial,
    })
    persistInvitations([draft, ...invitations])
    return draft
  }

  const duplicateInvitation = (id) => {
    const source = getInvitation(id)
    if (!source) return null
    const copy = {
      ...structuredClone(source),
      id: `inv-${Date.now()}`,
      status: 'draft',
      shareSlug: `${source.shareSlug}-copy-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      weddingTitle: `${source.weddingTitle || 'Invitation'} (Copy)`,
    }
    persistInvitations([copy, ...invitations])
    return copy
  }

  const deleteInvitation = (id) => {
    persistInvitations(invitations.filter((i) => i.id !== id))
    persistGuests(guests.filter((g) => g.invitationId !== id))
    persistRsvps(rsvps.filter((r) => r.invitationId !== id))
  }

  const addGuest = (guest) => {
    const next = { ...guest, id: guest.id || `guest-${Date.now()}` }
    persistGuests([next, ...guests])
    return next
  }

  const updateGuest = (id, updates) => {
    persistGuests(guests.map((g) => (g.id === id ? { ...g, ...updates } : g)))
  }

  const deleteGuest = (id) => {
    persistGuests(guests.filter((g) => g.id !== id))
  }

  const submitRSVP = (payload) => {
    const entry = {
      id: `rsvp-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      ...payload,
    }
    persistRsvps([entry, ...rsvps])

    const existingGuest = guests.find(
      (g) =>
        g.invitationId === payload.invitationId &&
        g.email?.toLowerCase() === payload.email?.toLowerCase(),
    )
    const statusMap = { yes: 'confirmed', no: 'declined', maybe: 'pending' }
    if (existingGuest) {
      updateGuest(existingGuest.id, {
        name: payload.guestName,
        phone: payload.phone,
        attendees: payload.guests,
        rsvpStatus: statusMap[payload.attendance] || 'pending',
      })
    } else {
      addGuest({
        invitationId: payload.invitationId,
        name: payload.guestName,
        email: payload.email,
        phone: payload.phone,
        category: 'Friends',
        attendees: payload.guests,
        rsvpStatus: statusMap[payload.attendance] || 'pending',
        notes: payload.message || '',
      })
    }
    return entry
  }

  const resetAllDemoData = () => {
    resetDemoData()
    setUser(null)
    setInvitations(storage.getInvitations())
    setGuests(storage.getGuests())
    setRsvps(storage.getRSVPs())
  }

  const stats = useMemo(() => {
    const mine = invitations.filter((i) => !user || i.userId === user.id || true)
    const published = mine.filter((i) => i.status === 'published').length
    const drafts = mine.filter((i) => i.status === 'draft').length
    return {
      total: mine.length,
      published,
      drafts,
      rsvpCount: rsvps.length,
      guestCount: guests.length,
    }
  }, [invitations, guests, rsvps, user])

  const value = {
    ready,
    user,
    invitations,
    guests,
    rsvps,
    stats,
    login,
    register,
    logout,
    updateProfile,
    getInvitation,
    getInvitationBySlug,
    saveInvitation,
    createInvitation,
    duplicateInvitation,
    deleteInvitation,
    addGuest,
    updateGuest,
    deleteGuest,
    submitRSVP,
    resetAllDemoData,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
