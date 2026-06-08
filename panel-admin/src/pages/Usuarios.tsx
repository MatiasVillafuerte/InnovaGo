import { Pencil, Ban, ShieldCheck, Trash2 } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { StatusBadge } from '../components/ui/StatusBadge'
import { usuarios } from '../data/mockData'

export function Usuarios() {
  return (
    <div>
      <PageHeader
        title="Gestión de Usuarios"
        description="Administra los usuarios registrados en la plataforma"
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-5 py-3.5 font-medium text-slate-500">Nombre</th>
                <th className="px-5 py-3.5 font-medium text-slate-500">Correo</th>
                <th className="px-5 py-3.5 font-medium text-slate-500">Fecha de Registro</th>
                <th className="px-5 py-3.5 font-medium text-slate-500">Estado</th>
                <th className="px-5 py-3.5 font-medium text-slate-500">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {usuarios.map((u) => (
                <tr key={u.id} className="transition-colors hover:bg-slate-50/50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
                        {u.nombre.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="font-medium text-slate-900">{u.nombre}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{u.correo}</td>
                  <td className="px-5 py-4 text-slate-500">{u.fechaRegistro}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={u.estado} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button title="Editar" className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-primary-50 hover:text-primary-600">
                        <Pencil className="h-4 w-4" />
                      </button>
                      {u.estado !== 'bloqueado' ? (
                        <button title="Bloquear" className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-danger-50 hover:text-danger-600">
                          <Ban className="h-4 w-4" />
                        </button>
                      ) : (
                        <button title="Desbloquear" className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-success-50 hover:text-success-600">
                          <ShieldCheck className="h-4 w-4" />
                        </button>
                      )}
                      <button title="Eliminar" className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-danger-50 hover:text-danger-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
