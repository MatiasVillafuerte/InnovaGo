import { useEffect, useState } from 'react'
import { Pencil, Ban, ShieldCheck, Trash2 } from 'lucide-react'
import { Card, CardContent } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'
import { ConfirmModal } from '../../../components/ui/ConfirmModal'
import { Toast } from '../../../components/ui/Toast'
import { getUsuarios, removeUser, updateUser } from '../../../services/firebaseRealtime'

type UsuarioFirebase = {
  id?: string | number
  nombre?: string
  name?: string
  correo?: string
  email?: string
  fechaRegistro?: string
  estado?: string
}

type ConfirmAction = {
  type: 'bloquear' | 'desbloquear' | 'eliminar'
  userEmail: string
  userName: string
}

export function Usuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioFirebase[]>([])
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null)
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'warning' }>({
    show: false,
    message: '',
    type: 'success',
  })

  const cargarUsuarios = async () => {
    try {
      const data = await getUsuarios()
      setUsuarios(data)
    } catch (error) {
      console.error(error)
      showToast('No se pudieron cargar usuarios desde Firebase.', 'error')
    }
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToast({ show: true, message, type })
  }

  const handleConfirm = async () => {
    if (!confirmAction) return
    const { type, userEmail, userName } = confirmAction
    try {
      if (type === 'bloquear') {
        await updateUser(userEmail, { estado: 'bloqueado' })
        showToast(`Usuario "${userName}" bloqueado correctamente.`, 'warning')
      } else if (type === 'desbloquear') {
        await updateUser(userEmail, { estado: 'activo' })
        showToast(`Usuario "${userName}" desbloqueado correctamente.`, 'success')
      } else if (type === 'eliminar') {
        await removeUser(userEmail)
        showToast(`Usuario "${userName}" eliminado correctamente.`, 'success')
      }
      await cargarUsuarios()
    } catch (error) {
      console.error(error)
      showToast('No se pudo actualizar Firebase. Revisa las reglas de la base de datos.', 'error')
    }
    setConfirmAction(null)
  }

  const getModalConfig = () => {
    if (!confirmAction) return { title: '', message: '', confirmText: '', variant: 'danger' as const }
    const { type, userName } = confirmAction
    if (type === 'bloquear') {
      return {
        title: 'Bloquear usuario',
        message: `¿Estás seguro de que deseas bloquear a "${userName}"? El usuario no podrá acceder a la plataforma.`,
        confirmText: 'Bloquear',
        variant: 'warning' as const,
      }
    }
    if (type === 'desbloquear') {
      return {
        title: 'Desbloquear usuario',
        message: `¿Estás seguro de que deseas desbloquear a "${userName}"? El usuario recuperará acceso a la plataforma.`,
        confirmText: 'Desbloquear',
        variant: 'success' as const,
      }
    }
    return {
      title: 'Eliminar usuario',
      message: `¿Estás seguro de que deseas eliminar a "${userName}"? Esta acción es irreversible y eliminará sus datos.`,
      confirmText: 'Eliminar',
      variant: 'danger' as const,
    }
  }

  const modalConfig = getModalConfig()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Gestión de Usuarios</h1>
        <p className="text-slate-600">Administra los usuarios registrados en Firebase</p>
      </div>

      <Card>
        <CardContent className="p-0">
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
                {usuarios.map((u) => {
                  const nombre = u.nombre || u.name || 'Usuario'
                  const correo = u.correo || u.email || ''
                  const estado = u.estado || 'activo'
                  return (
                    <tr key={correo || u.id} className="transition-colors hover:bg-slate-50/50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
                            {nombre.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                          </div>
                          <span className="font-medium text-slate-900">{nombre}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{correo}</td>
                      <td className="px-5 py-4 text-slate-500">{u.fechaRegistro || '-'}</td>
                      <td className="px-5 py-4">
                        <Badge
                          variant={
                            estado === 'activo' ? 'success'
                            : estado === 'bloqueado' ? 'danger'
                            : 'warning'
                          }
                        >
                          {estado}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <button title="Editar" className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-primary-50 hover:text-primary-600">
                            <Pencil className="h-4 w-4" />
                          </button>
                          {estado !== 'bloqueado' ? (
                            <button
                              title="Bloquear"
                              onClick={() => setConfirmAction({ type: 'bloquear', userEmail: correo, userName: nombre })}
                              className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-danger-50 hover:text-danger-600"
                            >
                              <Ban className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              title="Desbloquear"
                              onClick={() => setConfirmAction({ type: 'desbloquear', userEmail: correo, userName: nombre })}
                              className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-success-50 hover:text-success-600"
                            >
                              <ShieldCheck className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            title="Eliminar"
                            onClick={() => setConfirmAction({ type: 'eliminar', userEmail: correo, userName: nombre })}
                            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-danger-50 hover:text-danger-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {usuarios.length === 0 && (
            <div className="px-5 py-12 text-center text-sm text-slate-400">
              Todavía no hay usuarios guardados en Firebase. Registra o inicia sesión con una cuenta para crear datos.
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
