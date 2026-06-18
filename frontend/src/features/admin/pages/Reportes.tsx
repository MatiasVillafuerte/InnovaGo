import { Eye, AlertTriangle, Pause, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { Badge } from '../../../components/ui/Badge'
import { reportes } from '../data/mockData'

const tipoLabels: Record<string, string> = {
  emprendimiento: 'Emprendimiento',
  comentario: 'Comentario',
  contenido: 'Contenido inapropiado',
}

const tipoColors: Record<string, string> = {
  emprendimiento: 'bg-primary-50 text-primary-700',
  comentario: 'bg-accent-50 text-accent-700',
  contenido: 'bg-danger-50 text-danger-600',
}

export function Reportes() {
  const porTipo = {
    emprendimiento: reportes.filter((r) => r.tipo === 'emprendimiento'),
    comentario: reportes.filter((r) => r.tipo === 'comentario'),
    contenido: reportes.filter((r) => r.tipo === 'contenido'),
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Reportes y Moderación</h1>
        <p className="text-slate-600">Revisa y gestiona reportes de la comunidad</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Object.entries(porTipo).map(([tipo, items]) => (
          <div key={tipo} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">{tipoLabels[tipo]}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{items.length}</p>
            <p className="text-xs text-slate-400">
              {items.filter((r) => r.estado === 'pendiente').length} pendientes
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {reportes.map((r) => (
          <div
            key={r.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${tipoColors[r.tipo]}`}>
                    {tipoLabels[r.tipo]}
                  </span>
                  <Badge
                    variant={
                      r.estado === 'resuelto' ? 'success'
                      : r.estado === 'pendiente' ? 'warning'
                      : 'default'
                    }
                  >
                    {r.estado}
                  </Badge>
                </div>
                <h3 className="mt-2 font-semibold text-slate-900">{r.titulo}</h3>
                <p className="mt-1 text-sm text-slate-600">{r.descripcion}</p>
                <p className="mt-2 text-xs text-slate-400">
                  Reportado por <span className="font-medium text-slate-600">{r.reportadoPor}</span> · {r.fecha}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
                  <Eye className="h-3.5 w-3.5" />
                  Revisar
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-warning-500/30 bg-warning-50 px-3 py-1.5 text-xs font-medium text-warning-600 hover:bg-warning-50/80">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Advertir
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
                  <Pause className="h-3.5 w-3.5" />
                  Suspender
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-danger-500/30 bg-danger-50 px-3 py-1.5 text-xs font-medium text-danger-600 hover:bg-danger-50/80">
                  <Trash2 className="h-3.5 w-3.5" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
