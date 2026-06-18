import { useState } from 'react'
import { User, MapPin, Edit, Save, Star, History, ShoppingBag } from 'lucide-react'
import { usuario } from '../../data/emprendimientos'
import { useAuth } from '../../context/AuthContext'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Toast } from '../../components/ui/Toast'

export default function PerfilPage() {
  const { user } = useAuth()
  const perfil = {
    ...usuario,
    nombre: user?.name || usuario.nombre,
    correo: user?.email || usuario.correo,
    telefono: user?.telefono || usuario.telefono,
  }
  const [ubicacion, setUbicacion] = useState(perfil.ubicacion)
  const [editandoUbicacion, setEditandoUbicacion] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: /** @type {'success'|'error'|'warning'} */ ('success') })

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
  }

  function obtenerUbicacionActual() {
    if (!navigator.geolocation) {
      showToast('Tu navegador no permite obtener ubicación.', 'error')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUbicacion(
          `Lat: ${position.coords.latitude.toFixed(5)}, Lng: ${position.coords.longitude.toFixed(5)}`
        )
        showToast('Ubicación actualizada correctamente.', 'success')
      },
      () => {
        showToast('No se pudo obtener tu ubicación. Verifica los permisos del navegador.', 'error')
      }
    )
  }

  function handleGuardarUbicacion() {
    setEditandoUbicacion(false)
    showToast('Ubicación guardada correctamente.', 'success')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-primary-600" />
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-2">
                <User className="w-4 h-4" />
                Mi perfil
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">{perfil.nombre}</h1>
              <p className="text-slate-600">{perfil.correo}</p>
              <p className="text-slate-600">{perfil.telefono}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Location Panel */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Ubicación del usuario
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (editandoUbicacion) {
                    handleGuardarUbicacion()
                  } else {
                    setEditandoUbicacion(true)
                  }
                }}
              >
                {editandoUbicacion ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Guardar
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {editandoUbicacion ? (
              <Input
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                placeholder="Escribe tu ubicación"
              />
            ) : (
              <p className="text-slate-700">{ubicacion}</p>
            )}
            <Button
              variant="secondary"
              className="w-full mt-4"
              onClick={obtenerUbicacionActual}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Usar ubicación actual
            </Button>
          </CardContent>
        </Card>

        {/* Reviews Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Mis reseñas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {perfil.resenas.map((resena) => (
                <div key={resena.id} className="border-b border-slate-200 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-900">{resena.emprendimiento}</h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{resena.calificacion}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{resena.comentario}</p>
                  <small className="text-xs text-slate-500">{resena.fecha}</small>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Purchase History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Historial de compras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {perfil.historial_compras.map((compra) => (
              <Card key={compra.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-8 h-8 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Badge variant={compra.estado === 'Entregado' ? 'success' : 'warning'} className="mb-2">
                        {compra.estado}
                      </Badge>
                      <h3 className="font-semibold text-slate-900 truncate">{compra.producto}</h3>
                      <p className="text-sm text-slate-600">{compra.emprendimiento}</p>
                      <small className="text-xs text-slate-500">{compra.fecha}</small>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <p className="text-lg font-bold text-slate-900">Bs {compra.total}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, show: false }))}
      />
    </div>
  )
}