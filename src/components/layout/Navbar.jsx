import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Button from '../common/Button'
import { cn } from '../../utils/format'

const links = [
  { to: '/', label: 'Home' },
  { to: '/templates', label: 'Templates' },
  { to: '/dashboard', label: 'Dashboard', auth: true },
  { to: '/invitations', label: 'My Invitations', auth: true },
]

export default function Navbar() {
  const { user, logout } = useApp()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const visible = links.filter((l) => !l.auth || user)

  return (
    <header className="sticky top-0 z-50 border-b border-champagne/50 bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="group flex flex-col">
          <span className="font-display text-2xl tracking-wide text-olive">Velvet Vow</span>
          <span className="text-[10px] uppercase tracking-[0.32em] text-sage">Invitation Atelier</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {visible.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'text-sm tracking-wide transition hover:text-olive',
                  isActive ? 'text-olive' : 'text-brown/70',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Button variant="ghost" size="sm" to="/settings">
                {user.name.split(' ')[0]}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  logout()
                  navigate('/')
                }}
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" to="/login">
                Sign in
              </Button>
              <Button size="sm" to="/create">
                Create Invitation
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-sm p-2 text-olive md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-champagne/40 bg-ivory px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {visible.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="py-2 text-brown"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/settings" onClick={() => setOpen(false)} className="py-2">
                  Account
                </Link>
                <button
                  type="button"
                  className="py-2 text-left text-olive"
                  onClick={() => {
                    logout()
                    setOpen(false)
                    navigate('/')
                  }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="py-2">
                  Sign in
                </Link>
                <Button to="/create" onClick={() => setOpen(false)}>
                  Create Invitation
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
