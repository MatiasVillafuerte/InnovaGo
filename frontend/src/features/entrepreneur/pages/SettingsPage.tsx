import { useState } from 'react'
import {
  User,
  Lock,
  Mail,
  Bell,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'
import { entrepreneur } from '../data/mockData'
import { Tabs } from '../../../components/ui/Tabs'
import { Toast } from '../../../components/ui/Toast'

const tabs = [
  { id: 'profile', label: 'Perfil' },
  { id: 'notifications', label: 'Notificaciones' },
]

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [notifications, setNotifications] = useState({
    email: true,
    messages: true,
    reviews: true,
    promotions: false,
    weekly: true,
  })

  // Sistema de notificaciones Toast
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'warning' }>({
    show: false,
    message: '',
    type: 'success',
  })

  const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToast({ show: true, message, type })
  }

  const handleSaveProfile = () => {
    showToast('Cambios guardados correctamente.', 'success')
  }

  const handleToggleNotification = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))
    showToast('Preferencias de notificación actualizadas.', 'success')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Configuración de Cuenta</h1>
        <p className="text-slate-500">Administra tu perfil y preferencias de notificaciones</p>
      </div>

      <Card padding={false}>
        {/* Pestañas de Navegación */}
        <div className="px-6 pt-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {/* Contenido */}
        <div className="p-6">
          
          {/* ── TAB: Perfil ── */}
          {activeTab === 'profile' && (
            <div className="mx-auto max-w-2xl space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src={entrepreneur.avatar}
                  alt={entrepreneur.name}
                  className="h-20 w-20 rounded-full ring-4 ring-primary-100 bg-slate-50"
                />
                <div className="space-y-1">
                  <Button variant="outline" size="sm">
                    Cambiar foto
                  </Button>
                  <p className="text-xs text-slate-400">JPG, PNG · Máx. 1 MB</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Nombre completo" defaultValue={entrepreneur.name} />
                <Input label="Teléfono" defaultValue={entrepreneur.phone} />
                <div className="md:col-span-2">
                  <Input label="Correo electrónico" type="email" defaultValue={entrepreneur.email} />
                </div>
              </div>
              
              <div className="flex justify-end pt-2">
                <Button onClick={handleSaveProfile}>Guardar perfil</Button>
              </div>

              <hr className="border-slate-200" />

              {/* Sección Cambiar Contraseña */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Cambiar contraseña</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Te recomendamos usar una contraseña segura y única
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Input label="Contraseña actual" type="password" />
                  <Input label="Nueva contraseña" type="password" />
                  <Input label="Confirmar nueva contraseña" type="password" />
                </div>
                <div className="flex justify-end pt-2">
                  <Button variant="outline" onClick={() => showToast('Contraseña actualizada correctamente.', 'success')}>
                    <Lock className="h-4 w-4" />
                    Actualizar contraseña
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB: Notificaciones ── */}
          {activeTab === 'notifications' && (
            <div className="mx-auto max-w-2xl space-y-4">
              {[
                { key: 'email', label: 'Notificaciones por correo', desc: 'Recibe actualizaciones importantes por email', icon: Mail },
                { key: 'messages', label: 'Nuevos mensajes', desc: 'Alerta cuando recibas consultas de clientes', icon: Bell },
                { key: 'reviews', label: 'Nuevas reseñas', desc: 'Notificación al recibir calificaciones', icon: User },
                { key: 'weekly', label: 'Reporte semanal', desc: 'Resumen de estadísticas cada lunes', icon: Mail },
              ].map(({ key, label, desc, icon: Icon }) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">{label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleNotification(key)}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus:outline-none ${
                      notifications[key as keyof typeof notifications]
                        ? 'bg-primary-600'
                        : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                        notifications[key as keyof typeof notifications] ? 'left-5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Notificación flotante */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  )
}
