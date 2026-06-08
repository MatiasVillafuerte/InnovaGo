import { useState, useMemo } from 'react'
import { Eye, Pencil, Check, X, Trash2 } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { SearchInput } from '../components/ui/SearchInput'
import { SelectFilter } from '../components/ui/SelectFilter'
import { StatusBadge } from '../components/ui/StatusBadge'
import { emprendimientos, categorias } from '../data/mockData'

export function Emprendedores() {
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('todas')
  const [estado, setEstado] = useState('todos')

  const filtrados = useMemo(() => {
    return emprendimientos.filter((e) => {
      const matchNombre = e.nombre.toLowerCase().includes(busqueda.toLowerCase())
      const matchCategoria = categoria === 'todas' || e.categoria === categoria
      const matchEstado = estado === 'todos' || e.estado === estado
      return matchNombre && matchCategoria && matchEstado
    })
  }, [busqueda, categoria, estado])

  return (
    <div>
      <PageHeader
        title="Gestión de Emprendedores"
        description="Administra todos los emprendimientos registrados en la plataforma"
      />

      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end">
        <SearchInput
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar por nombre..."
          className="flex-1"
        />
        <SelectFilter
          value={categoria}
          onChange={setCategoria}
          label="Categoría"
          options={[
            { value: 'todas', label: 'Todas las categorías' },
            ...categorias.map((c) => ({ value: c.nombre, label: c.nombre })),
          ]}
        />
        <SelectFilter
          value={estado}
          onChange={setEstado}
          label="Estado"
          options={[
            { value: 'todos', label: 'Todos los estados' },
            { value: 'aprobado', label: 'Aprobado' },
            { value: 'pendiente', label: 'Pendiente' },
            { value: 'rechazado', label: 'Rechazado' },
          ]}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-5 py-3.5 font-medium text-slate-500">Emprendimiento</th>
                <th className="px-5 py-3.5 font-medium text-slate-500">Propietario</th>
                <th className="px-5 py-3.5 font-medium text-slate-500">Categoría</th>
                <th className="px-5 py-3.5 font-medium text-slate-500">Fecha</th>
                <th className="px-5 py-3.5 font-medium text-slate-500">Estado</th>
                <th className="px-5 py-3.5 font-medium text-slate-500">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtrados.map((e) => (
                <tr key={e.id} className="transition-colors hover:bg-slate-50/50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-lg">
                        {e.logo}
                      </span>
                      <span className="font-medium text-slate-900">{e.nombre}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{e.propietario}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                      {e.categoria}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{e.fechaRegistro}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={e.estado} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <ActionBtn icon={Eye} title="Ver" color="text-slate-500 hover:text-primary-600 hover:bg-primary-50" />
                      <ActionBtn icon={Pencil} title="Editar" color="text-slate-500 hover:text-primary-600 hover:bg-primary-50" />
                      {e.estado !== 'aprobado' && (
                        <ActionBtn icon={Check} title="Aprobar" color="text-slate-500 hover:text-success-600 hover:bg-success-50" />
                      )}
                      {e.estado !== 'rechazado' && (
                        <ActionBtn icon={X} title="Rechazar" color="text-slate-500 hover:text-danger-600 hover:bg-danger-50" />
                      )}
                      <ActionBtn icon={Trash2} title="Eliminar" color="text-slate-500 hover:text-danger-600 hover:bg-danger-50" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtrados.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-slate-400">
            No se encontraron emprendimientos con los filtros seleccionados.
          </div>
        )}
      </div>
    </div>
  )
}

function ActionBtn({ icon: Icon, title, color }: { icon: typeof Eye; title: string; color: string }) {
  return (
    <button title={title} className={`rounded-lg p-1.5 transition-colors ${color}`}>
      <Icon className="h-4 w-4" />
    </button>
  )
}
