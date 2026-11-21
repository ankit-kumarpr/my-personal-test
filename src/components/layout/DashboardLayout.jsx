import { NavLink, Outlet, Navigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Mail,
  Users,
  ClipboardList,
  Settings,
  PlusCircle,
  Sparkles,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Navbar from './Navbar'
import { cn } from '../../utils/format'

const nav = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/invitations', label: 'My Invitations', icon: Mail },
  { to: '/create', label: 'Create', icon: PlusCircle },
  { to: '/rsvp', label: 'RSVP', icon: ClipboardList },
  { to: '/guests', label: 'Guests', icon: Users },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function DashboardLayout() {
  const { user, ready } = useApp()

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory text-olive">
        Preparing your atelier…
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 md:px-6">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-24 rounded-sm border border-champagne/70 bg-beige/40 p-4">
            <div className="mb-5 flex items-center gap-2 text-olive">
              <Sparkles size={16} />
              <span className="text-xs uppercase tracking-[0.2em]">Studio</span>
            </div>
            <nav className="space-y-1">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/dashboard'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition',
                      isActive ? 'bg-olive text-ivory' : 'text-brown/80 hover:bg-beige',
                    )
                  }
                >
                  <item.icon size={16} />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>
        <div className="min-w-0 flex-1">
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/dashboard'}
                className={({ isActive }) =>
                  cn(
                    'whitespace-nowrap rounded-sm px-3 py-2 text-xs uppercase tracking-wider',
                    isActive ? 'bg-olive text-ivory' : 'bg-beige text-brown',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
