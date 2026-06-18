import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import PublicLayout from './components/layout/PublicLayout'
import RoleProtectedRoute from './components/RoleProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import HomePage from './features/info/HomePage'
import AcercaDe from './features/info/AcercaDe'
import ComoCrear from './features/info/ComoCrear'
import CrearEmprendimiento from './features/info/CrearEmprendimiento'
import BuscarPage from './features/public/BuscarPage'
import ResultadosPage from './features/public/ResultadosPage'
import MapaPage from './features/public/MapaPage'
import DetalleEmprendimientoPage from './features/public/DetalleEmprendimientoPage'
import PerfilPage from './features/public/PerfilPage'
import FavoritosPage from './features/public/FavoritosPage'
import ResenasPage from './features/public/ResenasPage'
import AdminRoutes from './features/admin/AdminRoutes.tsx'
import EntrepreneurRoutes from './features/entrepreneur/EntrepreneurRoutes.tsx'

function ProtectedRoute({ children }) {
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

  return children
}

/**
 * Ruta de /perfil con redirección inteligente por rol.
 * - entrepreneur → /emprendedor (para mantenerse en su panel)
 * - admin        → /admin
 * - user         → muestra PerfilPage normalmente
 */
function PerfilRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="loading-spinner h-12 w-12 border-primary-600" />
      </div>
    )
  }

  if (user?.role === 'entrepreneur') {
    return <Navigate to="/emprendedor" replace />
  }

  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />
  }

  return <PerfilPage />
}

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {children}
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas con header/footer */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="buscar" element={<BuscarPage />} />
        <Route path="resultados" element={<ResultadosPage />} />
        <Route path="mapa" element={<MapaPage />} />
        <Route path="emprendimiento/:id" element={<DetalleEmprendimientoPage />} />
        {/* /perfil ahora usa PerfilRoute para redirecciones basadas en rol */}
        <Route path="perfil" element={<PerfilRoute />} />
        <Route path="favoritos" element={<FavoritosPage />} />
        <Route path="resenas" element={<ResenasPage />} />
        <Route path="acerca" element={<AcercaDe />} />
        <Route path="como-crear" element={<ComoCrear />} />
        <Route path="crear" element={<CrearEmprendimiento />} />
      </Route>

      {/* Autenticación */}
      <Route
        path="login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="register"
        element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        }
      />

      {/* Panel administrativo */}
      <Route
        path="admin/*"
        element={
          <RoleProtectedRoute allowedRoles={['admin']}>
            <AdminRoutes />
          </RoleProtectedRoute>
        }
      />

      {/* Panel emprendedor */}
      <Route
        path="emprendedor/*"
        element={
          <RoleProtectedRoute allowedRoles={['entrepreneur']}>
            <EntrepreneurRoutes />
          </RoleProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  )
}

