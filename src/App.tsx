import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { ProjectDetail } from './pages/ProjectDetail'
import {
  LegacyServiceCategoryRedirect,
  LegacyServicesHubRedirect,
} from './pages/LegacyServiceRedirects'
import { Work } from './pages/Work'
import { WorkCategory } from './pages/WorkCategory'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="work/social-media" element={<Navigate to="/work" replace />} />
        <Route path="work/business-cards" element={<Navigate to="/work/stationery" replace />} />
        <Route path="work/flyers-events" element={<Navigate to="/work/flyers" replace />} />
        <Route path="work/logo-design" element={<Navigate to="/work/logos" replace />} />
        <Route path="work/motion-graphics" element={<Navigate to="/work/motion" replace />} />
        <Route path="work/photo-editing" element={<Navigate to="/work/photo" replace />} />
        <Route path="work/video-production" element={<Navigate to="/work/video" replace />} />
        <Route path="work/:categorySlug" element={<WorkCategory />} />
        <Route path="services" element={<LegacyServicesHubRedirect />} />
        <Route path="services/:serviceSlug" element={<LegacyServiceCategoryRedirect />} />
        <Route path="projects/:projectId" element={<ProjectDetail />} />
        <Route path="projects" element={<Navigate to="/work" replace />} />
        <Route path="showcase" element={<Navigate to="/work" replace />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
