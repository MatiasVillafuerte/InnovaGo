import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Store,
  Package,
  Tag,
  MessageSquare,
  BarChart3,
  Star,
  Settings,
  ChevronLeft,
  ChevronRight,
  Rocket,
} from 'lucide-react'
import { cn } from '../../lib/utils'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/emprendimiento', label: 'Emprendimiento', icon: Store },
  { to: '/productos', label: 'Productos', icon: Package },
  { to: '/promociones', label: 'Promociones', icon: Tag },
  { to: '/mensajes', label: 'Mensajes', icon: MessageSquare, badge: 2 },
  { to: '/estadisticas', label: 'Estadísticas', icon: BarChart3 },
  { to: '/resenas', label: 'Reseñas', icon: Star },
  { to: '/configuracion', label: 'Configuración', icon: Settings },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onMobileClose} />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-900',
          collapsed ? 'w-[72px]' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
          <div className={cn('flex items-center gap-2 overflow-hidden', collapsed && 'justify-center w-full')}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-600">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">InnovaGo</span>
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
              end={to === '/'}
              onClick={onMobileClose}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
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
          className="hidden lg:flex m-3 items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </aside>
    </>
  )
}
