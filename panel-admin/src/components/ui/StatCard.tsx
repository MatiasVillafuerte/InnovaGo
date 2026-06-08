import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
  color: 'blue' | 'green' | 'amber' | 'purple' | 'rose' | 'slate'
}

const colorClasses = {
  blue: { bg: 'bg-primary-50', icon: 'text-primary-600', ring: 'ring-primary-100' },
  green: { bg: 'bg-success-50', icon: 'text-success-600', ring: 'ring-success-100' },
  amber: { bg: 'bg-warning-50', icon: 'text-warning-600', ring: 'ring-warning-500/20' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', ring: 'ring-purple-100' },
  rose: { bg: 'bg-danger-50', icon: 'text-danger-600', ring: 'ring-danger-100' },
  slate: { bg: 'bg-slate-50', icon: 'text-slate-600', ring: 'ring-slate-100' },
}

export function StatCard({ title, value, icon: Icon, trend, trendUp, color }: StatCardProps) {
  const c = colorClasses[color]

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          {trend && (
            <p className={`mt-1 text-xs font-medium ${trendUp ? 'text-success-600' : 'text-danger-500'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        <div className={`rounded-xl p-3 ring-1 ${c.bg} ${c.ring}`}>
          <Icon className={`h-6 w-6 ${c.icon}`} />
        </div>
      </div>
    </div>
  )
}
