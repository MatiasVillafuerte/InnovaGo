import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Eye, Heart, Package, MessageSquare, Star, TrendingUp } from 'lucide-react'
import { StatCard } from '../components/ui/StatCard'
import { Card, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { entrepreneur, dashboardStats, messages, products } from '../data/mockData'

export function DashboardPage() {
  const pendingMessages = messages.filter((m) => m.status === 'pending').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">Resumen general de tu emprendimiento</p>
      </div>

      <Card className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 p-0 text-white">
        <div className="relative z-10 p-6 lg:p-8">
          <Badge variant="info" className="mb-3 bg-white/20 text-white">
            Bienvenido de vuelta
          </Badge>
          <h2 className="text-2xl font-bold lg:text-3xl">¡Hola, {entrepreneur.name.split(' ')[0]}!</h2>
          <p className="mt-2 max-w-xl text-primary-100">
            Tu emprendimiento ha recibido{' '}
            <strong>{dashboardStats.weeklyVisits.reduce((a, b) => a + b.visits, 0).toLocaleString()}</strong>{' '}
            visitas esta semana. Sigue promocionando tus productos para alcanzar más clientes.
          </p>
        </div>
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-12 -right-4 h-32 w-32 rounded-full bg-white/5" />
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Visitas totales"
          value={dashboardStats.totalVisits.toLocaleString()}
          icon={Eye}
          trend="+12.5% vs mes anterior"
          trendUp
        />
        <StatCard
          title="Favoritos"
          value={dashboardStats.totalFavorites.toLocaleString()}
          icon={Heart}
          trend="+8.3% vs mes anterior"
          trendUp
        />
        <StatCard
          title="Productos publicados"
          value={dashboardStats.productsPublished}
          icon={Package}
        />
        <StatCard
          title="Mensajes recibidos"
          value={dashboardStats.messagesReceived}
          icon={MessageSquare}
          trend={`${pendingMessages} pendientes`}
          trendUp={false}
        />
        <StatCard
          title="Calificación promedio"
          value={dashboardStats.averageRating.toFixed(1)}
          icon={Star}
          trend="Basado en 128 reseñas"
          trendUp
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Visitas semanales</CardTitle>
              <Badge variant="success" icon={TrendingUp}>
                +18% esta semana
              </Badge>
            </div>
          </CardHeader>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboardStats.weeklyVisits}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis dataKey="day" className="text-xs" tick={{ fill: '#94a3b8' }} />
                <YAxis className="text-xs" tick={{ fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgb(15 23 42)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#colorVisits)"
                  name="Visitas"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actividad reciente</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {messages.slice(0, 3).map((msg) => (
              <div key={msg.id} className="flex gap-3 border-b border-slate-100 pb-4 last:border-0 dark:border-slate-800">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                  {msg.sender.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{msg.sender}</p>
                  <p className="truncate text-xs text-slate-500">{msg.subject}</p>
                </div>
                {msg.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-primary-600" />}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Productos destacados</CardTitle>
        </CardHeader>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.filter((p) => p.published).slice(0, 4).map((product) => (
            <div key={product.id} className="group overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-32 w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="p-3">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{product.name}</p>
                <p className="text-sm text-primary-600 dark:text-primary-400">
                  ${product.price.toLocaleString('es-CO')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
