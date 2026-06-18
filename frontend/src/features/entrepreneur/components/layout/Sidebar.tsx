import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'
import {
  LayoutDashboard,
  Store,
  Package,
  Tag,
  MessageSquare,
  BarChart3,
  Star,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Rocket,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { ConfirmModal } from '../../../../components/ui/ConfirmModal'

const navItems = [
  { to: '/emprendedor', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/emprendedor/emprendimiento', label: 'Emprendimiento', icon: Store },
  { to: '/emprendedor/productos', label: 'Productos', icon: Package },
  { to: '/emprendedor/promociones', label: 'Promociones', icon: Tag },
  { to: '/emprendedor/mensajes', label: 'Mensajes', icon: MessageSquare, badge: 2 },
  { to: '/emprendedor/estadisticas', label: 'Estadísticas', icon: BarChart3 },
  { to: '/emprendedor/resenas', label: 'Reseñas', icon: Star },
  { to: '/emprendedor/configuracion', label: 'Configuración', icon: Settings },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleLogoutConfirmed = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onMobileClose} />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-300',
          collapsed ? 'w-[72px]' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <div className={cn('flex items-center gap-2 overflow-hidden', collapsed && 'justify-center w-full')}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-600">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <span className="text-lg font-bold text-slate-900">InnovaGo</span>
                <p className="text-[10px] text-slate-500">Vista Emprendedor</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3 scrollbar-thin">
          {navItems.map(({ to, label, icon: Icon, badge }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/emprendedor'}
              onClick={onMobileClose}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-100 text-primary-700 font-semibold'
                    : 'text-slate-600 hover:bg-primary-50 hover:text-slate-900',
                  collapsed && 'justify-center px-2'
                )
              }
              title={collapsed ? label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{label}</span>
                  {badge && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-600 px-1.5 text-[10px] font-bold text-white">
                      {badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={onToggle}
          className="hidden lg:flex m-3 items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        <div className="border-t border-slate-200 p-3">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              'text-slate-600 hover:bg-danger-50 hover:text-danger-600',
              collapsed && 'justify-center px-2'
            )}
            title={collapsed ? 'Cerrar Sesión' : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      <ConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogoutConfirmed}
        title="Cerrar Sesión"
        message="¿Estás seguro de que deseas cerrar sesión? Deberás iniciar sesión nuevamente para acceder al panel."
        confirmText="Cerrar Sesión"
        cancelText="Cancelar"
        variant="warning"
      />
    </>
  )
}
