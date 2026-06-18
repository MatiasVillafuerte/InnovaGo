/**
 * Tabs — componente de pestañas reutilizable.
 * Usado por BusinessPage y SettingsPage del panel Emprendedor.
 *
 * Props:
 *  - tabs: Array<{ id: string, label: string }>
 *  - activeTab: string   (id de la pestaña activa)
 *  - onChange: (id: string) => void
 */
export function Tabs({ tabs = [], activeTab, onChange }) {
  return (
    <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-none">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={[
            'shrink-0 border-b-2 px-5 py-3 text-sm font-medium transition-colors -mb-[2px] whitespace-nowrap',
            activeTab === tab.id
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-slate-500 hover:text-slate-700',
          ].join(' ')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
