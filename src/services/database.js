const KEY = "emprendeGO_DB";

const initialDB = {
  usuarios: [
    { id: 1, nombre: "Admin", correo: "admin@emprendego.com", password: "123456", rol: "admin" },
    { id: 2, nombre: "Emprendedor Demo", correo: "emprendedor@demo.com", password: "123456", rol: "emprendedor" },
    { id: 3, nombre: "Usuario Demo", correo: "usuario@demo.com", password: "123456", rol: "usuario" }
  ],
  categorias: [
    { id: 1, nombre: "Gastronomía", icono: "🍽️" },
    { id: 2, nombre: "Artesanías", icono: "🧶" },
    { id: 3, nombre: "Tecnología", icono: "💻" },
    { id: 4, nombre: "Belleza", icono: "✨" },
    { id: 5, nombre: "Servicios", icono: "🛠️" }
  ],
  ubicaciones: [
    { id: 1, emprendimientoId: 1, direccion: "Zona Centro, La Paz", ciudad: "La Paz", lat: -16.5001, lng: -68.1193 },
    { id: 2, emprendimientoId: 2, direccion: "Sopocachi, La Paz", ciudad: "La Paz", lat: -16.5082, lng: -68.1264 },
    { id: 3, emprendimientoId: 3, direccion: "Miraflores, La Paz", ciudad: "La Paz", lat: -16.4968, lng: -68.1098 }
  ],
  emprendimientos: [
    { id: 1, usuarioId: 2, categoriaId: 1, nombre: "Café Aroma Local", descripcion: "Café artesanal con postres caseros y productos bolivianos.", telefono: "70000001", estado: "aprobado", fecha: "2026-06-12" },
    { id: 2, usuarioId: 2, categoriaId: 2, nombre: "Manos Creativas", descripcion: "Artesanías, regalos personalizados y decoración hecha a mano.", telefono: "70000002", estado: "aprobado", fecha: "2026-06-12" },
    { id: 3, usuarioId: 2, categoriaId: 3, nombre: "Tecno Soluciones", descripcion: "Soporte técnico, mantenimiento de computadoras y diseño web.", telefono: "70000003", estado: "pendiente", fecha: "2026-06-12" }
  ],
  redesSociales: [
    { id: 1, emprendimientoId: 1, tipo: "Instagram", url: "https://instagram.com" },
    { id: 2, emprendimientoId: 2, tipo: "Facebook", url: "https://facebook.com" }
  ],
  imagenes: [
    { id: 1, emprendimientoId: 1, url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900" },
    { id: 2, emprendimientoId: 2, url: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=900" },
    { id: 3, emprendimientoId: 3, url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900" }
  ],
  productosServicios: [
    { id: 1, emprendimientoId: 1, nombre: "Café especial", precio: 18, tipo: "producto" },
    { id: 2, emprendimientoId: 2, nombre: "Llaveros personalizados", precio: 25, tipo: "producto" },
    { id: 3, emprendimientoId: 3, nombre: "Mantenimiento de PC", precio: 80, tipo: "servicio" }
  ],
  ventas: [],
  resenas: [
    { id: 1, emprendimientoId: 1, usuarioId: 3, comentario: "Muy buena atención.", calificacion: 5, fecha: "2026-06-12" }
  ],
  favoritos: []
};

export function getDB() {
  const saved = localStorage.getItem(KEY);
  if (!saved) {
    localStorage.setItem(KEY, JSON.stringify(initialDB));
    return initialDB;
  }
  return JSON.parse(saved);
}

export function saveDB(db) {
  localStorage.setItem(KEY, JSON.stringify(db));
}

export function resetDB() {
  localStorage.setItem(KEY, JSON.stringify(initialDB));
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("emprendeGO_user")) || null;
}

export function setCurrentUser(user) {
  localStorage.setItem("emprendeGO_user", JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem("emprendeGO_user");
}

export function login(correo, password) {
  const db = getDB();
  const user = db.usuarios.find(u => u.correo === correo && u.password === password);
  if (user) setCurrentUser(user);
  return user || null;
}

export function registerUser(data) {
  const db = getDB();
  const exists = db.usuarios.some(u => u.correo === data.correo);
  if (exists) return { ok: false, message: "El correo ya existe." };
  const user = { id: Date.now(), ...data };
  db.usuarios.push(user);
  saveDB(db);
  setCurrentUser(user);
  return { ok: true, user };
}

export function getFullEmprendimientos() {
  const db = getDB();
  return db.emprendimientos.map(e => ({
    ...e,
    categoria: db.categorias.find(c => c.id === Number(e.categoriaId)),
    ubicacion: db.ubicaciones.find(u => u.emprendimientoId === e.id),
    imagen: db.imagenes.find(i => i.emprendimientoId === e.id)?.url || "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900",
    productos: db.productosServicios.filter(p => p.emprendimientoId === e.id),
    resenas: db.resenas.filter(r => r.emprendimientoId === e.id),
    redes: db.redesSociales.filter(r => r.emprendimientoId === e.id)
  }));
}

export function createEmprendimiento(data) {
  const db = getDB();
  const id = Date.now();
  db.emprendimientos.push({
    id,
    usuarioId: data.usuarioId,
    categoriaId: Number(data.categoriaId),
    nombre: data.nombre,
    descripcion: data.descripcion,
    telefono: data.telefono,
    estado: "pendiente",
    fecha: new Date().toISOString().slice(0, 10)
  });
  db.ubicaciones.push({
    id: Date.now() + 1,
    emprendimientoId: id,
    direccion: data.direccion,
    ciudad: data.ciudad,
    lat: Number(data.lat),
    lng: Number(data.lng)
  });
  db.imagenes.push({
    id: Date.now() + 2,
    emprendimientoId: id,
    url: data.imagen || "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900"
  });
  db.redesSociales.push({
    id: Date.now() + 3,
    emprendimientoId: id,
    tipo: "Red social",
    url: data.redSocial || ""
  });
  saveDB(db);
  return id;
}

export function addProducto(data) {
  const db = getDB();
  db.productosServicios.push({ id: Date.now(), ...data, precio: Number(data.precio) });
  saveDB(db);
}

export function addVenta(data) {
  const db = getDB();
  db.ventas.push({ id: Date.now(), fecha: new Date().toISOString().slice(0, 10), ...data });
  saveDB(db);
}

export function addResena(data) {
  const db = getDB();
  db.resenas.push({ id: Date.now(), fecha: new Date().toISOString().slice(0, 10), ...data });
  saveDB(db);
}

export function toggleFavorito(usuarioId, emprendimientoId) {
  const db = getDB();
  const existe = db.favoritos.find(f => f.usuarioId === usuarioId && f.emprendimientoId === emprendimientoId);
  if (existe) {
    db.favoritos = db.favoritos.filter(f => f.id !== existe.id);
  } else {
    db.favoritos.push({ id: Date.now(), usuarioId, emprendimientoId });
  }
  saveDB(db);
}
