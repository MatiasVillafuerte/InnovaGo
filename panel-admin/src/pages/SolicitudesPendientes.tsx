import { Check, X, MessageSquare, Mail, Phone, Globe } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { emprendimientos } from '../data/mockData'

export function SolicitudesPendientes() {
  const pendientes = emprendimientos.filter((e) => e.estado === 'pendiente')

  return (
    <div>
      <PageHeader
        title="Solicitudes Pendientes"
        description={`${pendientes.length} emprendimientos esperan revisión y aprobación`}
      />

      <div className="space-y-4">
        {pendientes.map((e) => (
          <div
            key={e.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-4xl ring-1 ring-primary-100">
                {e.logo}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{e.nombre}</h3>
                    <p className="mt-0.5 text-sm text-slate-500">
                      Propietario: <span className="font-medium text-slate-700">{e.propietario}</span>
                    </p>
                  </div>
                  <span className="rounded-full bg-warning-50 px-3 py-1 text-xs font-medium text-warning-600 ring-1 ring-warning-500/20">
                    {e.categoria}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">{e.descripcion}</p>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-slate-400" />
                    {e.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-slate-400" />
                    {e.telefono}
                  </span>
                </div>

                {e.redesSociales.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {e.redesSociales.map((rs) => (
                      <span
                        key={rs.plataforma}
                        className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                      >
                        <Globe className="h-3 w-3" />
                        {rs.plataforma}: {rs.url}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex shrink-0 flex-row gap-2 lg:flex-col">
                <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-success-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-success-700">
                  <Check className="h-4 w-4" />
                  Aprobar
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-danger-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-danger-600/90">
                  <X className="h-4 w-4" />
                  Rechazar
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                  <MessageSquare className="h-4 w-4" />
                  Solicitar correcciones
                </button>
              </div>
            </div>
          </div>
        ))}

        {pendientes.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white px-5 py-16 text-center">
            <p className="text-sm text-slate-400">No hay solicitudes pendientes en este momento.</p>
          </div>
        )}
      </div>
    </div>
  )
}
