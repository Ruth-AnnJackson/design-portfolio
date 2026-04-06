import { Navigate, useParams } from 'react-router-dom'

export function LegacyServicesHubRedirect() {
  return <Navigate to="/work" replace />
}

export function LegacyServiceCategoryRedirect() {
  const { serviceSlug } = useParams()
  if (!serviceSlug) return <Navigate to="/work" replace />
  return <Navigate to={`/work/${serviceSlug}`} replace />
}
