import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import DashboardLayout from '../components/layout/DashboardLayout'
import HomePage from '../pages/Home/HomePage'
import TemplatesPage from '../pages/Templates/TemplatesPage'
import TemplateDetailsPage from '../pages/Templates/TemplateDetailsPage'
import LoginPage from '../pages/Auth/LoginPage'
import RegisterPage from '../pages/Auth/RegisterPage'
import DashboardPage from '../pages/Dashboard/DashboardPage'
import CreateInvitationPage from '../pages/Create/CreateInvitationPage'
import EditorPage from '../pages/Editor/EditorPage'
import MyInvitationsPage from '../pages/Invitations/MyInvitationsPage'
import PreviewPage from '../pages/Invitations/PreviewPage'
import RSVPPage from '../pages/RSVP/RSVPPage'
import GuestsPage from '../pages/Guests/GuestsPage'
import SettingsPage from '../pages/Settings/SettingsPage'
import PublicInvitationPage from '../pages/Public/PublicInvitationPage'

function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="font-display text-4xl text-olive">Page not found</h1>
      <Link to="/" className="mt-6 inline-block text-sage underline">
        Return home
      </Link>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/invite/:slug" element={<PublicInvitationPage />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create" element={<CreateInvitationPage />} />
          <Route path="/editor/:id" element={<EditorPage />} />
          <Route path="/invitations" element={<MyInvitationsPage />} />
          <Route path="/rsvp" element={<RSVPPage />} />
          <Route path="/guests" element={<GuestsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/templates/:id" element={<TemplateDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/preview/:id" element={<PreviewPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
