import { Bell, Menu, Search } from 'lucide-react'
import { entrepreneur } from '../../data/mockData'

interface NavbarProps {
  onMenuClick: () => void
  sidebarCollapsed: boolean
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md lg:px-6">
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
            type="search"
            placeholder="Buscar..."
            className="w-64 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 lg:w-80"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="ml-2 flex items-center gap-3 border-l border-slate-200 pl-4">
          <img
            src={entrepreneur.avatar}
            alt={entrepreneur.name}
            className="h-9 w-9 rounded-full bg-slate-100 ring-2 ring-primary-100"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-900">{entrepreneur.name}</p>
            <p className="text-xs text-slate-500">Emprendedor</p>
          </div>
        </div>
      </div>
    </header>
  )
}
