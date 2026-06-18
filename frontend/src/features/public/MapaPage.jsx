import "leaflet/dist/leaflet.css"
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet"
import L from "leaflet"
import { MapPin, ExternalLink, Crosshair, Search, Star } from "lucide-react"
import { useEmprendimientos } from "../../hooks/useEmprendimientos"
import LogoEmprendimiento from "../../components/LogoEmprendimiento"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Select } from "../../components/ui/Input"
import { Card, CardContent } from "../../components/ui/Card"

function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

function CambiarVista({ centro }) {
  const map = useMap()
  map.setView(centro, 14)
  return null
}

function crearIconoEmprendimiento(logo) {
  return L.divIcon({
    className: "marker-logo",
    html: `<div class="marker-logo-inner"><img src="${logo}" /></div>`,
    iconSize: [52, 52],
    iconAnchor: [26, 52],
    popupAnchor: [0, -48],
  })
}

const iconoUsuario = L.divIcon({
  className: "marker-usuario",
  html: `<div class="marker-usuario-inner">📍</div>`,
  iconSize: [48, 48],
  iconAnchor: [24, 48],
})

export default function MapaPage() {
  const { emprendimientos, categoriasConTodos } = useEmprendimientos()
  const centroCochabamba = [-17.3895, -66.1568]

  const [busqueda, setBusqueda] = useState("")
  const [categoria, setCategoria] = useState("Todos")
  const [ubicacionUsuario, setUbicacionUsuario] = useState(null)
  const [ordenarCercanos, setOrdenarCercanos] = useState(false)

  function obtenerUbicacion() {
    if (!navigator.geolocation) {
      alert("Tu navegador no permite obtener ubicación.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const ubicacion = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        setUbicacionUsuario(ubicacion)
        setOrdenarCercanos(true)
      },
      () => {
        alert("No se pudo obtener tu ubicación. Revisa los permisos del navegador.")
      }
    )
  }

  const emprendimientosFiltrados = useMemo(() => {
    let resultado = emprendimientos.filter((item) => {
      const coincideTexto =
        busqueda.trim() === "" ||
        item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.categoria.toLowerCase().includes(busqueda.toLowerCase())

      const coincideCategoria =
        categoria === "Todos" || item.categoria === categoria

      return coincideTexto && coincideCategoria
    })

    resultado = resultado.map((item) => {
      const distancia = ubicacionUsuario
        ? calcularDistanciaKm(
            ubicacionUsuario.lat,
            ubicacionUsuario.lng,
            item.lat,
            item.lng
          )
        : null

      return {
        ...item,
        distancia,
      }
    })

    if (ordenarCercanos && ubicacionUsuario) {
      resultado.sort((a, b) => a.distancia - b.distancia)
    }

    return resultado
  }, [busqueda, categoria, ubicacionUsuario, ordenarCercanos])

  const centroMapa = ubicacionUsuario
    ? [ubicacionUsuario.lat, ubicacionUsuario.lng]
    : centroCochabamba

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
          <MapPin className="w-4 h-4" />
          OpenStreetMap
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          Mapa de emprendimientos
        </h1>
        <p className="text-slate-600">
          Busca emprendimientos, filtra por categoría y usa tu ubicación para ver cuáles están más cerca de ti
        </p>
      </div>

      {/* Controls */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Buscar emprendimiento..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              {categoriasConTodos.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </Select>
            <Button
              variant={ordenarCercanos ? "primary" : "secondary"}
              onClick={() => setOrdenarCercanos(!ordenarCercanos)}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Más cercanos
            </Button>
            <Button variant="secondary" onClick={obtenerUbicacion}>
              <Crosshair className="w-4 h-4 mr-2" />
              Usar mi ubicación
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Map Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="h-[600px]">
              <MapContainer
                center={centroMapa}
                zoom={13}
                scrollWheelZoom={true}
                className="h-full w-full"
              >
                <CambiarVista centro={centroMapa} />

                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {ubicacionUsuario && (
                  <Marker
                    position={[ubicacionUsuario.lat, ubicacionUsuario.lng]}
                    icon={iconoUsuario}
                  >
                    <Popup>Tu ubicación actual</Popup>
                  </Marker>
                )}

                {emprendimientosFiltrados.map((item) => (
                  <Marker
                    key={item.id}
                    position={[Number(item.lat) || centroCochabamba[0], Number(item.lng) || centroCochabamba[1]]}
                    icon={crearIconoEmprendimiento(item.logo)}
                  >
                    <Popup>
                      <div className="p-2 min-w-[200px]">
                        <div className="flex items-start gap-3 mb-3">
                          <LogoEmprendimiento emprendimiento={item} size="sm" />
                          <div>
                            <strong className="block text-slate-900">{item.nombre}</strong>
                            <span className="text-sm text-slate-600">{item.categoria}</span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{item.descripcion}</p>
                        {item.distancia !== null && (
                          <small className="text-primary-600 font-medium">
                            A {item.distancia.toFixed(2)} km de ti
                          </small>
                        )}
                        <Link
                          to={`/emprendimiento/${item.id}`}
                          className="flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 hover:text-primary-700"
                        >
                          Ver detalle <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">
            Emprendimientos encontrados ({emprendimientosFiltrados.length})
          </h3>
          <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin">
            {emprendimientosFiltrados.map((item) => (
              <Link
                key={item.id}
                to={`/emprendimiento/${item.id}`}
                className="block"
              >
                <Card className="hover:shadow-md hover:border-slate-350 transition-all duration-200">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <LogoEmprendimiento emprendimiento={item} size="sm" />
                      <div className="flex-1 min-w-0">
                        <strong className="block text-sm font-semibold text-slate-900 truncate">
                          {item.nombre}
                        </strong>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {item.categoria}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                          <div className="flex items-center gap-0.5 text-amber-500 font-medium">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            {item.calificacion}
                          </div>
                          {item.distancia !== null && (
                            <span className="text-slate-450">
                              · {item.distancia.toFixed(2)} km
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}