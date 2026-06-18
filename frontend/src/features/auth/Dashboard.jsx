import { useAuth } from '../context/AuthContext'
import { User, LogOut, ShoppingBag, TrendingUp, Users, DollarSign } from 'lucide-react'

const Dashboard = () => {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-8 h-8 text-primary-600" />
              <h1 className="text-xl font-bold text-slate-900">
                Tienda de Emprendedores
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {user?.name || 'Usuario'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Bienvenido, {user?.name || 'Emprendedor'}!
          </h2>
          <p className="text-slate-600">
            Tu correo ha sido verificado exitosamente. Ahora puedes acceder a todas las funcionalidades.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+12.5%</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">$12,450</h3>
            <p className="text-sm text-slate-600">Ventas este mes</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-success-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+8.2%</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">324</h3>
            <p className="text-sm text-slate-600">Pedidos</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-accent-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+15.3%</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">1,284</h3>
            <p className="text-sm text-slate-600">Clientes</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-warning-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+22.1%</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">89%</h3>
            <p className="text-sm text-slate-600">Tasa de conversión</p>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Información de tu Cuenta
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Nombre</label>
              <p className="text-slate-900 font-medium">{user?.name || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Correo Electrónico</label>
              <p className="text-slate-900 font-medium">{user?.email || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Estado de Verificación</label>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Verificado
                </span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Fecha de Registro</label>
              <p className="text-slate-900 font-medium">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString('es-ES') : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
