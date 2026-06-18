import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card'
import {
  emprendimientosMasVisitados,
  categoriasPopulares,
  registrosMensuales,
  usuariosActivosMensual,
} from '../data/mockData'

export function Estadisticas() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Estadísticas</h1>
        <p className="text-slate-600">Métricas y análisis detallado de la plataforma</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-slate-900">Emprendimientos Más Visitados</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={emprendimientosMasVisitados} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis dataKey="nombre" type="category" width={140} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              <Bar dataKey="visitas" fill="#22c55e" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-slate-900">Categorías Más Populares</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoriasPopulares}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="nombre" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              <Bar dataKey="cantidad" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-slate-900">Nuevos Registros por Mes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={registrosMensuales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              <Area type="monotone" dataKey="registros" stroke="#0ea5e9" fill="#e0f2fe" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-slate-900">Usuarios Activos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usuariosActivosMensual}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              <Line type="monotone" dataKey="activos" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Tasa de Aprobación', value: '75%', color: 'text-success-600' },
          { label: 'Tiempo Promedio de Revisión', value: '2.4 días', color: 'text-primary-600' },
          { label: 'Tasa de Retención', value: '68%', color: 'text-primary-700' },
          { label: 'Satisfacción de Usuarios', value: '4.6/5', color: 'text-warning-600' },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
            <p className="mt-1 text-xs text-slate-500">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
