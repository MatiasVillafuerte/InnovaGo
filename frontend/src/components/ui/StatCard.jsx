import { cn } from '../../lib/utils'

export function StatCard({ title, value, icon: Icon, trend, trendUp, className = '' }) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-slate-200 p-5 shadow-sm',
        'transition-shadow hover:shadow-md',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500 truncate">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">{value}</p>
          {trend && (
            <p
              className={cn(
                'text-xs mt-1.5 font-medium',
                trendUp
                  ? 'text-success-600'
                  : 'text-slate-500'
              )}
            >
              {trendUp ? '▲ ' : ''}{trend}
            </p>
          )}
        </div>
        {Icon && (
          <div className="shrink-0 w-11 h-11 bg-primary-100 rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary-600" />
          </div>
        )}
      </div>
    </div>
  )
}
