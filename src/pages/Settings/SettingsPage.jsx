import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

export default function SettingsPage() {
  const { user, updateProfile, resetAllDemoData, logout } = useApp()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [saved, setSaved] = useState(false)

  const save = (e) => {
    e.preventDefault()
    updateProfile({ name, phone })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-sage">Account</p>
        <h1 className="mt-2 font-display text-3xl text-olive">Settings</h1>
      </div>

      <form onSubmit={save} className="space-y-4 rounded-sm border border-champagne/70 bg-ivory p-6">
        <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Email" value={user?.email || ''} disabled />
        <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Button type="submit">Save profile</Button>
        {saved && <p className="text-sm text-sage">Profile updated locally.</p>}
      </form>

      <div className="rounded-sm border border-champagne/70 bg-beige/30 p-6">
        <h2 className="font-display text-xl text-olive">Demo data</h2>
        <p className="mt-2 font-serif text-brown/75 leading-relaxed">
          This application stores invitations, guests, and RSVPs in LocalStorage. Resetting restores the original sample dataset and signs you out.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            variant="danger"
            onClick={() => {
              if (window.confirm('Reset all demo data? This cannot be undone.')) {
                resetAllDemoData()
                logout()
                navigate('/')
              }
            }}
          >
            Reset Demo Data
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              logout()
              navigate('/')
            }}
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  )
}
