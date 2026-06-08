import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { Eye, Heart, TrendingUp, Target } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '../components/ui/Card'
import { StatCard } from '../components/ui/StatCard'
import {
  dailyVisits,
  topViewedProducts,
  topSavedProducts,
  monthlyGrowth,
  dashboardStats,
} from '../data/mockData'

const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe']

export function StatisticsPage() {
  const conversionRate = ((892 / 12458) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Estadísticas</h1>
        <p className="text-slate-500 dark:text-slate-400">Análisis detallado del rendimiento de tu emprendimiento</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Visitas hoy" value={710} icon={Eye} trend="+5.2% vs ayer" trendUp />
        <StatCard title="Conversión visitas" value={`${conversionRate}%`} icon={Target} trend="Visitas → Favoritos" trendUp />
        <StatCard title="Crecimiento mensual" value="+35%" icon={TrendingUp} trend="Junio 2026" trendUp />
        <StatCard title="Total favoritos" value={dashboardStats.totalFavorites} icon={Heart} trend="+8.3% vs mes anterior" trendUp />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Visitas diarias</CardTitle>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyVisits}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgb(15 23 42)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                  }}
                />
                <Bar dataKey="visits" fill="#6366f1" radius={[4, 4, 0, 0]} name="Visitas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crecimiento mensual (%)</CardTitle>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgb(15 23 42)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ fill: '#6366f1', r: 4 }}
                  name="Crecimiento"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Productos más vistos</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {topViewedProducts.map((item, i) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.name}</p>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-primary-500"
                      style={{ width: `${(item.views / topViewedProducts[0].views) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  {item.views.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productos más guardados</CardTitle>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topSavedProducts}
                  dataKey="saves"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => {
                    const label = name ?? ''
                    return `${label.split(' ').slice(0, 2).join(' ')} ${((percent ?? 0) * 100).toFixed(0)}%`
                  }}
                  labelLine={false}
                >
                  {topSavedProducts.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgb(15 23 42)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
