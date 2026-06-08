import { useState } from 'react'
import {
  Shield,
  Database,
  Users,
  Settings,
  Key,
  Bell,
  Globe,
  Save,
} from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'

const tabs = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'administradores', label: 'Administradores', icon: Users },
  { id: 'seguridad', label: 'Seguridad', icon: Shield },
  { id: 'respaldo', label: 'Respaldo', icon: Database },
  { id: 'permisos', label: 'Permisos', icon: Key },
]

export function Configuracion() {
  const [activeTab, setActiveTab] = useState('general')

  return (
    <div>
      <PageHeader title="Configuración" description="Administra la configuración general de la plataforma" />

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-56">
          <nav className="space-y-1 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Configuración General</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nombre de la Plataforma" defaultValue="Vista Emprendedores" />
                <Field label="URL del Sitio" defaultValue="https://vista-emprendedores.com" icon={Globe} />
                <Field label="Correo de Contacto" defaultValue="admin@vista.com" />
                <Field label="Zona Horaria" defaultValue="America/Mexico_City" />
              </div>
              <Toggle label="Permitir nuevos registros" description="Los emprendedores pueden registrarse" defaultChecked />
              <Toggle label="Revisión automática" description="Revisar solicitudes automáticamente" />
              <Toggle label="Notificaciones por correo" description="Enviar alertas al administrador" defaultChecked icon={Bell} />
            </div>
          )}

          {activeTab === 'administradores' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Administradores</h3>
                <button className="rounded-lg bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700">
                  Agregar Admin
                </button>
              </div>
              {[
                { nombre: 'Admin Master', correo: 'admin@vista.com', rol: 'Super Admin' },
                { nombre: 'María López', correo: 'maria@vista.com', rol: 'Moderador' },
                { nombre: 'Carlos Ruiz', correo: 'carlos@vista.com', rol: 'Editor' },
              ].map((a) => (
                <div key={a.correo} className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
                      {a.nombre.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{a.nombre}</p>
                      <p className="text-sm text-slate-500">{a.correo}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{a.rol}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'seguridad' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Seguridad</h3>
              <Toggle label="Autenticación de dos factores" description="Requerir 2FA para administradores" defaultChecked />
              <Toggle label="Bloqueo por intentos fallidos" description="Bloquear tras 5 intentos incorrectos" defaultChecked />
              <Field label="Tiempo de sesión (minutos)" defaultValue="60" type="number" />
              <Field label="Longitud mínima de contraseña" defaultValue="8" type="number" />
            </div>
          )}

          {activeTab === 'respaldo' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Respaldo de Datos</h3>
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm text-slate-600">Último respaldo: <span className="font-medium text-slate-900">2026-06-07 03:00 AM</span></p>
                <p className="mt-1 text-sm text-slate-600">Tamaño: <span className="font-medium text-slate-900">245 MB</span></p>
              </div>
              <Toggle label="Respaldo automático" description="Crear respaldos diarios a las 3:00 AM" defaultChecked />
              <div className="flex gap-3">
                <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                  Crear Respaldo Ahora
                </button>
                <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Restaurar Respaldo
                </button>
              </div>
            </div>
          )}

          {activeTab === 'permisos' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Gestión de Permisos</h3>
              {[
                { rol: 'Super Admin', permisos: 'Acceso total a la plataforma' },
                { rol: 'Moderador', permisos: 'Gestionar emprendimientos, reportes y usuarios' },
                { rol: 'Editor', permisos: 'Editar contenido y categorías' },
                { rol: 'Visualizador', permisos: 'Solo lectura de estadísticas y reportes' },
              ].map((p) => (
                <div key={p.rol} className="rounded-lg border border-slate-100 p-4">
                  <p className="font-medium text-slate-900">{p.rol}</p>
                  <p className="mt-1 text-sm text-slate-500">{p.permisos}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700">
              <Save className="h-4 w-4" />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  defaultValue,
  type = 'text',
  icon: Icon,
}: {
  label: string
  defaultValue: string
  type?: string
  icon?: typeof Globe
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />}
        <input
          type={type}
          defaultValue={defaultValue}
          className={`w-full rounded-lg border border-slate-200 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${Icon ? 'pl-10 pr-3' : 'px-3'}`}
        />
      </div>
    </div>
  )
}

function Toggle({
  label,
  description,
  defaultChecked,
  icon: Icon,
}: {
  label: string
  description: string
  defaultChecked?: boolean
  icon?: typeof Bell
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-5 w-5 text-slate-400" />}
        <div>
          <p className="text-sm font-medium text-slate-900">{label}</p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>
      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" defaultChecked={defaultChecked} className="peer sr-only" />
        <div className="h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-primary-600 peer-checked:after:translate-x-full" />
      </label>
    </div>
  )
}
