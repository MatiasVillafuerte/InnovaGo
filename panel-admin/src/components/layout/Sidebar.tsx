import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Store,
  ClipboardList,
  Users,
  Tags,
  Flag,
  BarChart3,
  Settings,
  LogOut,
  Rocket,
  X,
} from 'lucide-react'

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/emprendedores', icon: Store, label: 'Gestión de Emprendedores' },
  { path: '/solicitudes', icon: ClipboardList, label: 'Solicitudes Pendientes', badge: 3 },
  { path: '/usuarios', icon: Users, label: 'Usuarios' },
  { path: '/categorias', icon: Tags, label: 'Categorías' },
  { path: '/reportes', icon: Flag, label: 'Reportes' },
  { path: '/estadisticas', icon: BarChart3, label: 'Estadísticas' },
  { path: '/configuracion', icon: Settings, label: 'Configuración' },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-900">Vista Admin</span>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Panel Admin</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-warning-500 px-1.5 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-3">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-danger-50 hover:text-danger-600">
            <LogOut className="h-5 w-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  )
}
