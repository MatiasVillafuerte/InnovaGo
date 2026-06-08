import { useState } from 'react'
import {
  User,
  Lock,
  Mail,
  Bell,
  Shield,
  Monitor,
  Smartphone,
  LogOut,
  Key,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Tabs } from '../components/ui/Tabs'
import { Badge } from '../components/ui/Badge'
import { entrepreneur, accessLogs, connectedDevices } from '../data/mockData'

const tabs = [
  { id: 'profile', label: 'Perfil' },
  { id: 'security', label: 'Seguridad' },
  { id: 'notifications', label: 'Notificaciones' },
  { id: 'devices', label: 'Dispositivos' },
]

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    messages: true,
    reviews: true,
    promotions: false,
    weekly: true,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Configuración de Cuenta</h1>
        <p className="text-slate-500 dark:text-slate-400">Administra tu perfil, seguridad y preferencias</p>
      </div>

      <Card padding={false}>
        <div className="px-6 pt-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="mx-auto max-w-2xl space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src={entrepreneur.avatar}
                  alt={entrepreneur.name}
                  className="h-20 w-20 rounded-full ring-4 ring-primary-100 dark:ring-primary-900"
                />
                <Button variant="outline" size="sm">
                  Cambiar foto
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Nombre completo" defaultValue={entrepreneur.name} />
                <Input label="Teléfono" defaultValue={entrepreneur.phone} />
                <div className="md:col-span-2">
                  <Input label="Correo electrónico" type="email" defaultValue={entrepreneur.email} />
                </div>
              </div>
              <Button>Guardar perfil</Button>

              <hr className="border-slate-200 dark:border-slate-700" />

              <CardHeader>
                <CardTitle className="text-base">Cambiar contraseña</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                <Input label="Contraseña actual" type="password" />
                <Input label="Nueva contraseña" type="password" />
                <Input label="Confirmar nueva contraseña" type="password" />
                <Button variant="outline">
                  <Lock className="h-4 w-4" />
                  Actualizar contraseña
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="mx-auto max-w-2xl space-y-6">
              <Card className="bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary-100 p-2 dark:bg-primary-900/30">
                      <Shield className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        Autenticación de dos factores (2FA)
                      </p>
                      <p className="text-sm text-slate-500">
                        Añade una capa extra de seguridad a tu cuenta
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      twoFactorEnabled ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        twoFactorEnabled ? 'left-5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </Card>

              <div>
                <CardHeader>
                  <CardTitle className="text-base">Historial de accesos</CardTitle>
                  <CardDescription>Registro de inicios de sesión recientes</CardDescription>
                </CardHeader>
                <div className="space-y-3">
                  {accessLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between rounded-lg border border-slate-200 p-4 dark:border-slate-700"
                    >
                      <div className="flex items-center gap-3">
                        <Monitor className="h-5 w-5 text-slate-400" />
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {log.device}
                            {log.current && (
                              <Badge variant="success" className="ml-2">
                                Actual
                              </Badge>
                            )}
                          </p>
                          <p className="text-xs text-slate-500">
                            {log.location} · {log.ip} · {log.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="mx-auto max-w-2xl space-y-4">
              {[
                { key: 'email', label: 'Notificaciones por correo', desc: 'Recibe actualizaciones importantes por email', icon: Mail },
                { key: 'messages', label: 'Nuevos mensajes', desc: 'Alerta cuando recibas consultas de clientes', icon: Bell },
                { key: 'reviews', label: 'Nuevas reseñas', desc: 'Notificación al recibir calificaciones', icon: User },
                { key: 'promotions', label: 'Promociones de InnovaGo', desc: 'Ofertas y novedades de la plataforma', icon: Key },
                { key: 'weekly', label: 'Reporte semanal', desc: 'Resumen de estadísticas cada lunes', icon: Mail },
              ].map(({ key, label, desc, icon: Icon }) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-4 dark:border-slate-700"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{label}</p>
                      <p className="text-xs text-slate-500">{desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        [key]: !prev[key as keyof typeof prev],
                      }))
                    }
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                      notifications[key as keyof typeof notifications]
                        ? 'bg-primary-600'
                        : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        notifications[key as keyof typeof notifications] ? 'left-5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'devices' && (
            <div className="mx-auto max-w-2xl space-y-4">
              <CardHeader>
                <CardTitle className="text-base">Dispositivos conectados</CardTitle>
                <CardDescription>Gestiona las sesiones activas en tus dispositivos</CardDescription>
              </CardHeader>
              {connectedDevices.map((device) => (
                <div
                  key={device.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-4 dark:border-slate-700"
                >
                  <div className="flex items-center gap-3">
                    {device.name.includes('iPhone') ? (
                      <Smartphone className="h-5 w-5 text-slate-400" />
                    ) : (
                      <Monitor className="h-5 w-5 text-slate-400" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {device.name}
                        {device.current && (
                          <Badge variant="success" className="ml-2">
                            Este dispositivo
                          </Badge>
                        )}
                      </p>
                      <p className="text-xs text-slate-500">
                        {device.browser} · {device.lastActive}
                      </p>
                    </div>
                  </div>
                  {!device.current && (
                    <Button variant="outline" size="sm">
                      <LogOut className="h-4 w-4" />
                      Cerrar sesión
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="danger" className="mt-4">
                <LogOut className="h-4 w-4" />
                Cerrar todas las sesiones
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
