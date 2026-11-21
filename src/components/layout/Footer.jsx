import { Link } from 'react-router-dom'
import FloralDivider from '../common/FloralDivider'

export default function Footer() {
  return (
    <footer className="border-t border-champagne/50 bg-olive text-ivory">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-3xl">Velvet Vow</p>
            <p className="mt-3 max-w-md font-serif text-lg text-champagne/90 leading-relaxed">
              A premium digital wedding invitation atelier for couples who want stationery beauty with modern ease.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-champagne">Explore</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-ivory/85">
              <Link to="/templates">Templates</Link>
              <Link to="/create">Create Invitation</Link>
              <Link to="/invite/ananya-aarav-jaipur">Demo Invitation</Link>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-champagne">Demo</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-ivory/85">
              <Link to="/login">Sign in</Link>
              <Link to="/register">Register</Link>
              <Link to="/dashboard">Dashboard</Link>
            </div>
          </div>
        </div>
        <FloralDivider className="my-10 text-champagne/50" />
        <p className="text-center text-xs tracking-wide text-champagne/70">
          © {new Date().getFullYear()} Velvet Vow — Demo frontend with LocalStorage persistence.
        </p>
      </div>
    </footer>
  )
}
