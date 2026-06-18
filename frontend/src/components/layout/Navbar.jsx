import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Store, Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Button } from '../ui/Button'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const navItems = [
    { to: '/', label: 'Inicio' },
    { to: '/buscar', label: 'Buscar' },
    { to: '/mapa', label: 'Mapa' },
    { to: '/favoritos', label: 'Favoritos' },
    { to: '/como-crear', label: 'Cómo crear' },
    { to: '/acerca', label: 'Acerca de' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-slate-900">InnovaGO</span>
              <span className="text-xs text-slate-500 block -mt-1">Negocios locales cerca de ti</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to={user.role === 'entrepreneur' ? '/emprendedor' : user.role === 'admin' ? '/admin' : '/perfil'}
                  className="hidden sm:block"
                >
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    {user.name || user.nombre || 'Mi perfil'}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden sm:block">
                  <LogOut className="w-4 h-4 mr-2" />
                  Salir
                </Button>
              </>
            ) : (
              <Link to="/login" className="hidden sm:block">
                <Button size="sm">Ingresar</Button>
              </Link>
            )}
            <Link to="/crear">
              <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
                Publica tu negocio
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-600" />
              ) : (
                <Menu className="w-6 h-6 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4 space-y-2 animate-slide-down">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {user && (
              <>
                <Link
                  to={user.role === 'entrepreneur' ? '/emprendedor' : user.role === 'admin' ? '/admin' : '/perfil'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  {user.role === 'entrepreneur' ? 'Mi Panel' : user.role === 'admin' ? 'Administración' : 'Mi perfil'}
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Salir
                </button>
              </>
            )}
            {!user && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Ingresar
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
