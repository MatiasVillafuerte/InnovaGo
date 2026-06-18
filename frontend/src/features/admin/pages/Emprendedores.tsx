import { useState, useMemo } from 'react'
import { Eye, Pencil, Check, X, Trash2, Search } from 'lucide-react'
import { Card, CardContent } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Input'
import { Badge } from '../../../components/ui/Badge'
import { ConfirmModal } from '../../../components/ui/ConfirmModal'
import { Toast } from '../../../components/ui/Toast'
import { useEmprendimientos } from '../../../hooks/useEmprendimientos'
import { removeEmprendimiento, updateEmprendimientoEstado } from '../../../services/firebaseRealtime'

type ConfirmAction = {
  type: 'aprobar' | 'rechazar' | 'eliminar'
  id: number | string
  nombre: string
}

export function Emprendedores() {
  const { emprendimientos, categorias, refresh } = useEmprendimientos({ includePending: true })
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('todas')
  const [estado, setEstado] = useState('todos')
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null)
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'warning' }>({
    show: false,
    message: '',
    type: 'success',
  })

  const filtrados = useMemo(() => {
    return emprendimientos.filter((e) => {
      const matchNombre = e.nombre.toLowerCase().includes(busqueda.toLowerCase())
      const matchCategoria = categoria === 'todas' || e.categoria === categoria
      const estadoActual = e.estado || 'aprobado'
      const matchEstado = estado === 'todos' || estadoActual === estado
      return matchNombre && matchCategoria && matchEstado
    })
  }, [emprendimientos, busqueda, categoria, estado])

  const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToast({ show: true, message, type })
  }

  const handleConfirm = async () => {
    if (!confirmAction) return
    const { type, id, nombre } = confirmAction
    try {
      if (type === 'aprobar') {
        await updateEmprendimientoEstado(id, 'aprobado')
        showToast(`Emprendimiento "${nombre}" aprobado correctamente.`, 'success')
      } else if (type === 'rechazar') {
        await updateEmprendimientoEstado(id, 'rechazado')
        showToast(`Emprendimiento "${nombre}" rechazado.`, 'warning')
      } else if (type === 'eliminar') {
        await removeEmprendimiento(id)
        showToast(`Emprendimiento "${nombre}" eliminado correctamente.`, 'success')
      }
      refresh()
    } catch (error) {
      console.error(error)
      showToast('No se pudo actualizar Firebase. Revisa las reglas de la base de datos.', 'error')
    }
    setConfirmAction(null)
  }

  const getModalConfig = () => {
    if (!confirmAction) return { title: '', message: '', confirmText: '', variant: 'danger' as const }
    const { type, nombre } = confirmAction
    if (type === 'aprobar') {
      return {
        title: 'Aprobar emprendimiento',
        message: `¿Deseas aprobar el emprendimiento "${nombre}"? Quedará visible para todos los usuarios de la plataforma.`,
        confirmText: 'Aprobar',
        variant: 'success' as const,
      }
    }
    if (type === 'rechazar') {
      return {
        title: 'Rechazar emprendimiento',
        message: `¿Deseas rechazar el emprendimiento "${nombre}"? Se notificará al propietario con el motivo del rechazo.`,
        confirmText: 'Rechazar',
        variant: 'warning' as const,
      }
    }
    return {
      title: 'Eliminar emprendimiento',
      message: `¿Estás seguro de que deseas eliminar "${nombre}"? Esta acción es irreversible y eliminará todos sus datos.`,
      confirmText: 'Eliminar',
      variant: 'danger' as const,
    }
  }

  const modalConfig = getModalConfig()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Gestión de Emprendedores</h1>
        <p className="text-slate-600">Administra todos los emprendimientos registrados en la plataforma</p>
      </div>

      <Card className="mb-6">
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre..."
                className="pl-10"
              />
            </div>
            <Select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="todas">Todas las categorías</option>
              {categorias.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
            <Select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="todos">Todos los estados</option>
              <option value="aprobado">Aprobado</option>
              <option value="pendiente">Pendiente</option>
              <option value="rechazado">Rechazado</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
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
                          {String(e.logo || '').startsWith('http') ? (
                            <img src={e.logo} alt={e.nombre} className="h-10 w-10 rounded-lg object-cover" />
                          ) : (
                            e.logo || '🏪'
                          )}
                        </span>
                        <span className="font-medium text-slate-900">{e.nombre}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{e.propietario || 'Sin propietario'}</td>
                    <td className="px-5 py-4">
                      <Badge variant="default">{e.categoria}</Badge>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{e.fechaRegistro || e.createdAt?.slice(0, 10) || '-'}</td>
                    <td className="px-5 py-4">
                      <Badge
                        variant={
                          (e.estado || 'aprobado') === 'aprobado' ? 'success'
                          : (e.estado || 'aprobado') === 'pendiente' ? 'warning'
                          : 'danger'
                        }
                      >
                        {e.estado || 'aprobado'}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <ActionBtn icon={Eye} title="Ver" onClick={() => {}} />
                        <ActionBtn icon={Pencil} title="Editar" onClick={() => {}} />
                        {(e.estado || 'aprobado') !== 'aprobado' && (
                          <ActionBtn
                            icon={Check}
                            title="Aprobar"
                            onClick={() => setConfirmAction({ type: 'aprobar', id: e.id, nombre: e.nombre })}
                            colorClass="hover:text-success-600 hover:bg-success-50"
                          />
                        )}
                        {(e.estado || 'aprobado') !== 'rechazado' && (
                          <ActionBtn
                            icon={X}
                            title="Rechazar"
                            onClick={() => setConfirmAction({ type: 'rechazar', id: e.id, nombre: e.nombre })}
                            colorClass="hover:text-warning-600 hover:bg-warning-50"
                          />
                        )}
                        <ActionBtn
                          icon={Trash2}
                          title="Eliminar"
                          onClick={() => setConfirmAction({ type: 'eliminar', id: e.id, nombre: e.nombre })}
                          colorClass="hover:text-danger-600 hover:bg-danger-50"
                        />
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
        </CardContent>
      </Card>

      <ConfirmModal
        isOpen={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        variant={modalConfig.variant}
      />

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, show: false }))}
      />
    </div>
  )
}

function ActionBtn({
  icon: Icon,
  title,
  onClick,
  colorClass = 'hover:text-primary-600 hover:bg-primary-50',
}: {
  icon: typeof Eye
  title: string
  onClick: () => void
  colorClass?: string
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`rounded-lg p-1.5 transition-colors text-slate-500 ${colorClass}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}
