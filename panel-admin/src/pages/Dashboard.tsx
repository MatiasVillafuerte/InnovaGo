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
import { StatCard } from '../components/ui/StatCard'
import { PageHeader } from '../components/ui/PageHeader'
import { StatusBadge } from '../components/ui/StatusBadge'
import {
  estadisticasDashboard,
  registrosMensuales,
  categoriasPopulares,
  actividadReciente,
} from '../data/mockData'

const PIE_COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b']

export function Dashboard() {
  const stats = estadisticasDashboard

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Resumen general de la plataforma de emprendedores"
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard title="Total Emprendedores" value={stats.totalEmprendedores} icon={Store} color="blue" trend="+12% este mes" trendUp />
        <StatCard title="Aprobados" value={stats.aprobados} icon={CheckCircle} color="green" trend="+8% este mes" trendUp />
        <StatCard title="Pendientes" value={stats.pendientes} icon={Clock} color="amber" />
        <StatCard title="Usuarios Registrados" value={stats.usuariosRegistrados.toLocaleString()} icon={Users} color="purple" trend="+15% este mes" trendUp />
        <StatCard title="Destacados" value={stats.destacados} icon={Star} color="slate" />
        <StatCard title="Reportes Recibidos" value={stats.reportesRecibidos} icon={Flag} color="rose" trend="-3% este mes" trendUp={false} />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-slate-900">Registros Mensuales</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={registrosMensuales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }}
              />
              <Bar dataKey="registros" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-slate-900">Categorías Más Populares</h3>
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
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h3 className="text-base font-semibold text-slate-900">Actividad Reciente</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-5 py-3 font-medium text-slate-500">Acción</th>
                <th className="px-5 py-3 font-medium text-slate-500">Usuario</th>
                <th className="px-5 py-3 font-medium text-slate-500">Detalle</th>
                <th className="px-5 py-3 font-medium text-slate-500">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {actividadReciente.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-slate-50/50">
                  <td className="px-5 py-3.5">
                    <StatusBadge
                      status={
                        item.accion.includes('Aprobación') ? 'aprobado'
                        : item.accion.includes('Rechazo') ? 'rechazado'
                        : item.accion.includes('Reporte') ? 'pendiente'
                        : 'activo'
                      }
                    />
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-900">{item.usuario}</td>
                  <td className="px-5 py-3.5 text-slate-600">{item.detalle}</td>
                  <td className="px-5 py-3.5 text-slate-400">{item.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
