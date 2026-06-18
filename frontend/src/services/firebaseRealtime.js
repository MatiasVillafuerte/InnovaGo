import {
  emprendimientos as seedEmprendimientos,
  categorias as seedCategorias,
  usuario as seedUsuario,
  resenas as seedResenas,
} from '../data/emprendimientos'

const FIREBASE_URL = 'https://mapache-5def3-default-rtdb.firebaseio.com'
const BASE_PATH = 'innovago'

function cleanPath(path = '') {
  return path.replace(/^\/+|\/+$/g, '')
}

function buildUrl(path = '') {
  const finalPath = [BASE_PATH, cleanPath(path)].filter(Boolean).join('/')
  return `${FIREBASE_URL}/${finalPath}.json`
}

function emailKey(email = '') {
  return email.toLowerCase().trim().replace(/[.#$\[\]\/]/g, '_')
}

async function parseFirebaseResponse(response, action = 'procesando la solicitud en Firebase') {
  const raw = await response.text()
  let data = null

  try {
    data = raw ? JSON.parse(raw) : null
  } catch {
    data = raw || null
  }

  if (!response.ok) {
    const firebaseMessage =
      (data && typeof data === 'object' && data.error) ||
      (typeof data === 'string' && data) ||
      `Error ${response.status}`

    throw new Error(`No se pudo completar la acción (${action}). ${firebaseMessage}`)
  }

  return data
}

async function firebaseRequest(path = '', options = {}, action = 'procesando la solicitud en Firebase') {
  const response = await fetch(buildUrl(path), {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })

  return parseFirebaseResponse(response, action)
}

export function objectToArray(data) {
  if (!data) return []

  if (Array.isArray(data)) {
    return data
      .filter(Boolean)
      .map((item, index) => ({ ...item, firebaseKey: item.firebaseKey ?? String(item.id ?? index) }))
  }

  return Object.entries(data).map(([key, value]) => ({
    ...value,
    id: value?.id ?? key,
    firebaseKey: key,
  }))
}

export async function firebaseGet(path = '') {
  return firebaseRequest(path, {}, 'leyendo datos')
}

export async function firebaseSet(path = '', value) {
  return firebaseRequest(
    path,
    {
      method: 'PUT',
      body: JSON.stringify(value),
    },
    'guardando datos',
  )
}

export async function firebaseUpdate(path = '', value) {
  return firebaseRequest(
    path,
    {
      method: 'PATCH',
      body: JSON.stringify(value),
    },
    'actualizando datos',
  )
}

export async function firebaseRemove(path = '') {
  return firebaseRequest(path, { method: 'DELETE' }, 'eliminando datos')
}

export async function firebasePush(path = '', value) {
  return firebaseRequest(
    path,
    {
      method: 'POST',
      body: JSON.stringify(value),
    },
    'creando datos',
  )
}

function normalizePhoneForWhatsapp(phone = '') {
  const numbers = String(phone).replace(/\D/g, '')
  if (!numbers) return ''
  return numbers.startsWith('591') ? numbers : `591${numbers}`
}

function defaultImage(category = '') {
  const images = {
    Gastronomía: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    Comida: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    Artesanía: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1200&q=80',
    Tecnología: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    Belleza: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1200&q=80',
    Servicios: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    Moda: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80',
  }
  return images[category] || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80'
}

const seededEmprendimientos = seedEmprendimientos.reduce((acc, item) => {
  acc[String(item.id)] = {
    ...item,
    estado: item.estado || 'aprobado',
    propietario: item.propietario || 'Demo InnovaGO',
    fechaRegistro: item.fechaRegistro || '2026-06-01',
    createdAt: item.createdAt || new Date().toISOString(),
  }
  return acc
}, {})

const seededCategorias = seedCategorias
  .filter((categoria) => categoria !== 'Todos')
  .reduce((acc, nombre) => {
    const key = nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '_')
    acc[key] = { id: key, nombre, activa: true, descripcion: `Categoría ${nombre}` }
    return acc
  }, {})

export async function seedDatabaseIfNeeded() {
  try {
    const meta = await firebaseGet('meta')
    const current = await firebaseGet('emprendimientos')

    if (!current) {
      await firebaseSet('emprendimientos', seededEmprendimientos)
    }

    const currentCategorias = await firebaseGet('categorias')
    if (!currentCategorias) {
      await firebaseSet('categorias', seededCategorias)
    }

    const currentResenas = await firebaseGet('resenas')
    if (!currentResenas && seedResenas?.length) {
      await firebaseSet('resenas', seedResenas.reduce((acc, item) => {
        acc[String(item.id)] = item
        return acc
      }, {}))
    }

    if (!meta?.seededAt) {
      await firebaseUpdate('meta', {
        nombre: 'InnovaGO',
        database: 'Firebase Realtime Database',
        seededAt: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.warn('No se pudo sembrar Firebase. Revisa las reglas de Realtime Database.', error)
  }
}

export async function getEmprendimientos({ includePending = false } = {}) {
  try {
    await seedDatabaseIfNeeded()
    const data = await firebaseGet('emprendimientos')
    const lista = objectToArray(data || seededEmprendimientos)
    return includePending ? lista : lista.filter((item) => !item.estado || item.estado === 'aprobado')
  } catch (error) {
    console.warn('Usando emprendimientos locales por error de Firebase.', error)
    const lista = objectToArray(seededEmprendimientos)
    return includePending ? lista : lista.filter((item) => !item.estado || item.estado === 'aprobado')
  }
}

export async function getCategorias() {
  try {
    await seedDatabaseIfNeeded()
    const data = await firebaseGet('categorias')
    const lista = objectToArray(data || seededCategorias)
    return lista
      .filter((item) => item.activa !== false)
      .map((item) => item.nombre || item)
      .filter((item) => item && item !== 'Todos')
  } catch (error) {
    console.warn('Usando categorías locales por error de Firebase.', error)
    return seedCategorias.filter((item) => item !== 'Todos')
  }
}

export async function createEmprendimiento(form, user) {
  const id = String(Date.now())
  const categoria = String(form.categoria || form.categoriaNombre || 'Servicios').trim()
  const image = String(form.imagen || '').trim() || defaultImage(categoria)
  const nombre = String(form.nombre || '').trim()
  const descripcion = String(form.descripcion || '').trim()
  const direccion = String(form.direccion || '').trim()
  const ciudad = String(form.ciudad || 'Cochabamba').trim()
  const telefono = String(form.telefono || '').trim()
  const redSocial = String(form.redSocial || '').trim()

  if (!nombre || !descripcion || !direccion || !telefono) {
    throw new Error('Completa todos los campos obligatorios antes de guardar.')
  }

  const payload = {
    id,
    nombre,
    categoria,
    descripcion,
    descripcion_larga: String(form.descripcion_larga || descripcion).trim(),
    direccion,
    ciudad,
    telefono,
    whatsapp: normalizePhoneForWhatsapp(telefono),
    lat: Number(form.lat) || -17.3935,
    lng: Number(form.lng) || -66.157,
    logo: image,
    imagen: image,
    banner: image,
    redSocial,
    redesSociales: redSocial ? [{ plataforma: 'Red social', url: redSocial }] : [],
    calificacion: 0,
    resenas_count: 0,
    secciones: [],
    estado: 'pendiente',
    propietario: user?.name || user?.nombre || 'Usuario',
    propietarioEmail: user?.email || '',
    propietarioId: user?.id || '',
    fechaRegistro: new Date().toISOString().slice(0, 10),
    createdAt: new Date().toISOString(),
  }

  await firebaseSet(`emprendimientos/${id}`, payload)
  return payload
}

export async function updateEmprendimiento(id, data) {
  const key = String(id)
  return firebaseUpdate(`emprendimientos/${key}`, data)
}

export async function updateEmprendimientoEstado(id, estado) {
  return updateEmprendimiento(id, { estado, updatedAt: new Date().toISOString() })
}

export async function removeEmprendimiento(id) {
  return firebaseRemove(`emprendimientos/${id}`)
}

export async function getUsuarios() {
  try {
    const data = await firebaseGet('usuarios')
    return objectToArray(data).map((user) => ({
      ...user,
      nombre: user.name || user.nombre,
      correo: user.email || user.correo,
      estado: user.estado || 'activo',
      fechaRegistro: user.fechaRegistro || user.createdAt?.slice(0, 10) || '',
    }))
  } catch (error) {
    console.warn('No se pudieron cargar usuarios desde Firebase.', error)
    return []
  }
}

export async function getUserByEmail(email) {
  const key = emailKey(email)
  const user = await firebaseGet(`usuarios/${key}`)
  return user ? { ...user, firebaseKey: key } : null
}

export async function saveUser(user) {
  const key = emailKey(user.email)
  const payload = {
    ...user,
    id: user.id || key,
    name: user.name || user.nombre,
    email: user.email || user.correo,
    role: user.role || 'user',
    estado: user.estado || 'activo',
    fechaRegistro: user.fechaRegistro || new Date().toISOString().slice(0, 10),
    createdAt: user.createdAt || new Date().toISOString(),
  }
  await firebaseSet(`usuarios/${key}`, payload)
  return { ...payload, firebaseKey: key }
}

export async function updateUser(email, data) {
  const key = emailKey(email)
  return firebaseUpdate(`usuarios/${key}`, data)
}

export async function removeUser(email) {
  const key = emailKey(email)
  return firebaseRemove(`usuarios/${key}`)
}

export async function hashPassword(password) {
  const text = String(password || '')
  if (window.crypto?.subtle) {
    const encoded = new TextEncoder().encode(text)
    const digest = await window.crypto.subtle.digest('SHA-256', encoded)
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')
  }
  return btoa(text)
}

export const firebaseConfigInfo = {
  url: FIREBASE_URL,
  basePath: BASE_PATH,
  ejemploRuta: `${FIREBASE_URL}/${BASE_PATH}.json`,
}
