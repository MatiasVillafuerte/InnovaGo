import { useState } from 'react'
import { Bell, Menu, Search, ChevronDown } from 'lucide-react'
import { notificaciones } from '../../data/mockData'

interface TopBarProps {
  onMenuClick: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const unreadCount = notificaciones.filter((n) => !n.leida).length

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar emprendimientos, usuarios..."
            className="w-72 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 lg:w-96"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications)
              setShowProfile(false)
            }}
            className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger-500 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-lg">
              <div className="border-b border-slate-100 px-4 py-3">
                <h3 className="text-sm font-semibold text-slate-900">Notificaciones</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notificaciones.map((n) => (
                  <div
                    key={n.id}
                    className={`border-b border-slate-50 px-4 py-3 last:border-0 ${
                      !n.leida ? 'bg-primary-50/50' : ''
                    }`}
                  >
                    <p className="text-sm font-medium text-slate-900">{n.titulo}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{n.mensaje}</p>
                    <p className="mt-1 text-[10px] text-slate-400">{n.fecha}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile)
              setShowNotifications(false)
            }}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-100"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">
              AM
            </div>
            <div className="hidden text-left md:block">
              <p className="text-sm font-medium text-slate-900">Admin Master</p>
              <p className="text-xs text-slate-500">Super Administrador</p>
            </div>
            <ChevronDown className="hidden h-4 w-4 text-slate-400 md:block" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
              <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Mi Perfil</a>
              <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Configuración</a>
              <hr className="my-1 border-slate-100" />
              <a href="#" className="block px-4 py-2 text-sm text-danger-600 hover:bg-danger-50">Cerrar Sesión</a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
