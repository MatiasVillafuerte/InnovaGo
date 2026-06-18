import { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useEmprendimientos } from '../../hooks/useEmprendimientos'
import { createEmprendimiento } from '../../services/firebaseRealtime'

const FORM_INICIAL = {
  nombre: '',
  categoria: 'Comida',
  descripcion: '',
  telefono: '',
  direccion: '',
  ciudad: 'Cochabamba',
  lat: -17.3935,
  lng: -66.157,
  imagen: '',
  redSocial: '',
}

export default function CrearEmprendimiento() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { categorias } = useEmprendimientos()
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [form, setForm] = useState(FORM_INICIAL)

  const opcionesCategorias = categorias.length
    ? categorias
    : ['Comida', 'Artesanías', 'Tecnología', 'Ropa', 'Decoración', 'Servicios']

  const cambiar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) setError('')
    if (mensaje) setMensaje('')
  }

  const previewImage = useMemo(() => {
    if (form.imagen?.trim()) return form.imagen.trim()
    return 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80'
  }, [form.imagen])

  const guardar = async (e) => {
    e.preventDefault()
    setError('')
    setMensaje('')

    if (!user) {
      alert('Primero debes iniciar sesión.')
      navigate('/login')
      return
    }

    try {
      setGuardando(true)
      await createEmprendimiento(form, user)
      setMensaje('Tu emprendimiento fue enviado correctamente. Quedará pendiente hasta que un administrador lo apruebe.')
      setForm(FORM_INICIAL)
      setTimeout(() => navigate('/buscar'), 1200)
    } catch (err) {
      console.error(err)
      const message = err?.message || 'No se pudo guardar el emprendimiento.'
      setError(message)
    } finally {
      setGuardando(false)
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <span className="mb-3 inline-flex rounded-full bg-white/20 px-4 py-1 text-sm font-semibold backdrop-blur">
              Publica tu negocio
            </span>
            <h1 className="text-3xl font-bold sm:text-4xl">Crea tu emprendimiento</h1>
            <p className="mt-3 text-sm leading-6 text-sky-50 sm:text-base">
              Completa el formulario para registrar tu negocio en InnovaGO. Cuando el administrador lo revise,
              aparecerá en búsqueda y en el mapa para que más personas puedan encontrarlo.
            </p>
          </div>

          <div className="grid gap-3 rounded-2xl bg-white/10 p-5 text-sm backdrop-blur sm:grid-cols-3 lg:min-w-[360px]">
            <div>
              <p className="font-semibold">1. Registra</p>
              <p className="text-sky-50">Ingresa los datos principales de tu negocio.</p>
            </div>
            <div>
              <p className="font-semibold">2. Se revisa</p>
              <p className="text-sky-50">El administrador valida la información.</p>
            </div>
            <div>
              <p className="font-semibold">3. Se publica</p>
              <p className="text-sky-50">Tu negocio aparece en la plataforma.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <form onSubmit={guardar} className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Formulario de registro</h2>
              <p className="mt-1 text-sm text-slate-500">Los campos con * son obligatorios.</p>
            </div>
            <div className="rounded-2xl bg-sky-50 px-4 py-2 text-right text-xs text-sky-700">
              <p className="font-semibold">Estado inicial</p>
              <p>Pendiente de aprobación</p>
            </div>
          </div>

          {error && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <p className="font-semibold">No se pudo guardar</p>
              <p>{error}</p>
            </div>
          )}

          {mensaje && (
            <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              <p className="font-semibold">Registro enviado</p>
              <p>{mensaje}</p>
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Nombre del emprendimiento *</label>
              <input
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                name="nombre"
                placeholder="Ej. Mapachería"
                value={form.nombre}
                onChange={cambiar}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Categoría *</label>
              <select
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                name="categoria"
                value={form.categoria}
                onChange={cambiar}
              >
                {opcionesCategorias.map((cat) => (
                  <option value={cat} key={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">WhatsApp / Teléfono *</label>
              <input
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                name="telefono"
                placeholder="Ej. 69445557"
                value={form.telefono}
                onChange={cambiar}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Descripción *</label>
              <textarea
                className="min-h-[120px] w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                name="descripcion"
                placeholder="Cuéntanos qué ofreces, qué te hace especial y a quién va dirigido tu negocio."
                value={form.descripcion}
                onChange={cambiar}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Dirección exacta *</label>
              <input
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                name="direccion"
                placeholder="Ej. Av. Beijing y Av. Benjo Cruz"
                value={form.direccion}
                onChange={cambiar}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Ciudad *</label>
              <input
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                name="ciudad"
                placeholder="Cochabamba"
                value={form.ciudad}
                onChange={cambiar}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Red social</label>
              <input
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                name="redSocial"
                placeholder="Link de Facebook, Instagram o TikTok"
                value={form.redSocial}
                onChange={cambiar}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Latitud *</label>
              <input
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                name="lat"
                placeholder="-17.3935"
                value={form.lat}
                onChange={cambiar}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Longitud *</label>
              <input
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                name="lng"
                placeholder="-66.157"
                value={form.lng}
                onChange={cambiar}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">URL de imagen del negocio</label>
              <input
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                name="imagen"
                placeholder="https://..."
                value={form.imagen}
                onChange={cambiar}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {!user ? (
              <p className="text-sm text-slate-500">
                ¿No tienes cuenta?{' '}
                <Link to="/register" className="font-semibold text-sky-600 hover:text-sky-700">
                  Regístrate aquí
                </Link>
              </p>
            ) : (
              <p className="text-sm text-slate-500">
                Estás registrando este negocio como <span className="font-semibold text-slate-700">{user?.name || user?.nombre || user?.email}</span>
              </p>
            )}

            <button
              type="submit"
              disabled={guardando}
              className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {guardando ? 'Guardando en Firebase...' : 'Guardar emprendimiento'}
            </button>
          </div>
        </form>

        <aside className="space-y-6">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
            <div className="relative h-56 bg-slate-100">
              <img
                src={previewImage}
                alt="Vista previa del negocio"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80'
                }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent p-5 text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-sky-200">Vista previa</p>
                <h3 className="text-2xl font-bold">{form.nombre || 'Nombre de tu negocio'}</h3>
                <p className="text-sm text-slate-200">{form.categoria || 'Categoría'}</p>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <p className="text-sm font-semibold text-slate-900">Descripción</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {form.descripcion || 'Aquí verás una vista previa básica de cómo se mostrará la información principal del emprendimiento.'}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Ubicación</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">{form.ciudad || 'Ciudad'}</p>
                  <p className="text-sm text-slate-500">{form.direccion || 'Dirección del negocio'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contacto</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">{form.telefono || 'Número de WhatsApp'}</p>
                  <p className="text-sm text-slate-500">{form.redSocial || 'Red social opcional'}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
