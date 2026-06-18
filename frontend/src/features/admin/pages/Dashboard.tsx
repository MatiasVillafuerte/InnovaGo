import {
  Store,
  CheckCircle,
  Clock,
  Users,
  Star,
  Flag,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { StatCard } from '../../../components/ui/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'
import {
  estadisticasDashboard,
  registrosMensuales,
  categoriasPopulares,
  actividadReciente,
} from '../data/mockData'

const PIE_COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#06b6d4', '#0284c7', '#64748b']

export function Dashboard() {
  const stats = estadisticasDashboard

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600">Resumen general de la plataforma de emprendedores</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard title="Total Emprendedores" value={stats.totalEmprendedores} icon={Store} trend="+12% este mes" trendUp />
        <StatCard title="Aprobados" value={stats.aprobados} icon={CheckCircle} trend="+8% este mes" trendUp />
        <StatCard title="Pendientes" value={stats.pendientes} icon={Clock} />
        <StatCard title="Usuarios Registrados" value={stats.usuariosRegistrados.toLocaleString()} icon={Users} trend="+15% este mes" trendUp />
        <StatCard title="Destacados" value={stats.destacados} icon={Star} />
        <StatCard title="Reportes Recibidos" value={stats.reportesRecibidos} icon={Flag} trend="-3% este mes" trendUp={false} />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Registros Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={registrosMensuales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }}
                />
                <Bar dataKey="registros" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categorías Más Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoriasPopulares}
                  dataKey="cantidad"
                  nameKey="nombre"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(props) => {
                    const nombre = (props as { nombre?: string }).nombre ?? ''
                    const percent = props.percent ?? 0
                    return `${nombre} ${(percent * 100).toFixed(0)}%`
                  }}
                  labelLine={false}
                >
                  {categoriasPopulares.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100">
                  <th className="px-5 py-3 font-medium text-slate-500">Acción</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Usuario</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Detalle</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {actividadReciente.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-5 py-3.5">
                      <Badge
                        variant={
                          item.accion.includes('Aprobación') ? 'success'
                          : item.accion.includes('Rechazo') ? 'danger'
                          : item.accion.includes('Reporte') ? 'warning'
                          : 'primary'
                        }
                      >
                        {item.accion}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-900">{item.usuario}</td>
                    <td className="px-5 py-3.5 text-slate-600">{item.detalle}</td>
                    <td className="px-5 py-3.5 text-slate-400">{item.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
