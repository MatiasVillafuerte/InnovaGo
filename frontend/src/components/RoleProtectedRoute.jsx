import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RoleProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="loading-spinner h-12 w-12 border-primary-600" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on user's actual role
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />
    } else if (user.role === 'entrepreneur') {
      return <Navigate to="/emprendedor" replace />
    } else {
      return <Navigate to="/perfil" replace />
    }
  }

  return children
}

export default RoleProtectedRoute
