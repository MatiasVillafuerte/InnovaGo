import type {
  ActividadReciente,
  Categoria,
  Emprendimiento,
  Notificacion,
  Reporte,
  Usuario,
} from '../types'

export const estadisticasDashboard = {
  totalEmprendedores: 248,
  aprobados: 186,
  pendientes: 42,
  usuariosRegistrados: 1543,
  destacados: 24,
  reportesRecibidos: 17,
}

export const registrosMensuales = [
  { mes: 'Ene', registros: 18 },
  { mes: 'Feb', registros: 24 },
  { mes: 'Mar', registros: 31 },
  { mes: 'Abr', registros: 28 },
  { mes: 'May', registros: 35 },
  { mes: 'Jun', registros: 42 },
  { mes: 'Jul', registros: 38 },
  { mes: 'Ago', registros: 45 },
  { mes: 'Sep', registros: 52 },
  { mes: 'Oct', registros: 48 },
  { mes: 'Nov', registros: 55 },
  { mes: 'Dic', registros: 61 },
]

export const categoriasPopulares = [
  { nombre: 'Gastronomía', cantidad: 68 },
  { nombre: 'Tecnología', cantidad: 52 },
  { nombre: 'Moda', cantidad: 41 },
  { nombre: 'Artesanía', cantidad: 38 },
  { nombre: 'Servicios', cantidad: 35 },
  { nombre: 'Salud', cantidad: 14 },
]

export const actividadReciente: ActividadReciente[] = [
  { id: '1', accion: 'Nuevo registro', usuario: 'María López', detalle: 'Registró "Café Artesanal Luna"', fecha: '2026-06-08 10:32' },
  { id: '2', accion: 'Aprobación', usuario: 'Admin', detalle: 'Aprobó "TechStart Solutions"', fecha: '2026-06-08 09:15' },
  { id: '3', accion: 'Reporte', usuario: 'Carlos Ruiz', detalle: 'Reportó contenido inapropiado', fecha: '2026-06-07 18:44' },
  { id: '4', accion: 'Nuevo usuario', usuario: 'Ana García', detalle: 'Se registró en la plataforma', fecha: '2026-06-07 14:20' },
  { id: '5', accion: 'Rechazo', usuario: 'Admin', detalle: 'Rechazó "Tienda Express 24"', fecha: '2026-06-07 11:05' },
  { id: '6', accion: 'Categoría', usuario: 'Admin', detalle: 'Creó categoría "Bienestar"', fecha: '2026-06-06 16:30' },
]

export const emprendimientos: Emprendimiento[] = [
  {
    id: '1',
    nombre: 'Café Artesanal Luna',
    propietario: 'María López',
    categoria: 'Gastronomía',
    fechaRegistro: '2026-06-08',
    estado: 'pendiente',
    descripcion: 'Cafetería especializada en granos de origen único y repostería artesanal.',
    email: 'maria@cafeartesanal.com',
    telefono: '+52 55 1234 5678',
    redesSociales: [
      { plataforma: 'Instagram', url: '@cafeartesanalluna' },
      { plataforma: 'Facebook', url: 'cafeartesanalluna' },
    ],
    logo: '☕',
    visitas: 342,
    destacado: false,
  },
  {
    id: '2',
    nombre: 'TechStart Solutions',
    propietario: 'Roberto Méndez',
    categoria: 'Tecnología',
    fechaRegistro: '2026-06-05',
    estado: 'aprobado',
    descripcion: 'Desarrollo de software a medida y consultoría tecnológica para PYMEs.',
    email: 'contacto@techstart.mx',
    telefono: '+52 55 9876 5432',
    redesSociales: [
      { plataforma: 'LinkedIn', url: 'techstart-solutions' },
      { plataforma: 'Twitter', url: '@techstartmx' },
    ],
    logo: '💻',
    visitas: 1250,
    destacado: true,
  },
  {
    id: '3',
    nombre: 'Moda Étnica MX',
    propietario: 'Sofía Hernández',
    categoria: 'Moda',
    fechaRegistro: '2026-06-03',
    estado: 'aprobado',
    descripcion: 'Ropa y accesorios con diseños inspirados en la cultura mexicana.',
    email: 'hola@modaetnica.mx',
    telefono: '+52 55 4567 8901',
    redesSociales: [{ plataforma: 'Instagram', url: '@modaetnicamx' }],
    logo: '👗',
    visitas: 890,
    destacado: true,
  },
  {
    id: '4',
    nombre: 'Artesanías del Valle',
    propietario: 'Pedro Sánchez',
    categoria: 'Artesanía',
    fechaRegistro: '2026-06-01',
    estado: 'pendiente',
    descripcion: 'Productos artesanales hechos a mano con materiales locales.',
    email: 'pedro@artesaniasvalle.com',
    telefono: '+52 55 2345 6789',
    redesSociales: [{ plataforma: 'Facebook', url: 'artesaniasdelvalle' }],
    logo: '🎨',
    visitas: 156,
    destacado: false,
  },
  {
    id: '5',
    nombre: 'ServiClean Pro',
    propietario: 'Laura Torres',
    categoria: 'Servicios',
    fechaRegistro: '2026-05-28',
    estado: 'rechazado',
    descripcion: 'Servicios de limpieza profesional para hogares y oficinas.',
    email: 'info@serviclean.mx',
    telefono: '+52 55 3456 7890',
    redesSociales: [],
    logo: '🧹',
    visitas: 45,
    destacado: false,
  },
  {
    id: '6',
    nombre: 'GreenBite Organics',
    propietario: 'Diego Ramírez',
    categoria: 'Gastronomía',
    fechaRegistro: '2026-05-25',
    estado: 'aprobado',
    descripcion: 'Alimentos orgánicos y productos saludables de producción local.',
    email: 'ventas@greenbite.mx',
    telefono: '+52 55 5678 9012',
    redesSociales: [
      { plataforma: 'Instagram', url: '@greenbiteorganics' },
      { plataforma: 'TikTok', url: '@greenbite' },
    ],
    logo: '🥗',
    visitas: 2100,
    destacado: true,
  },
]

export const usuarios: Usuario[] = [
  { id: '1', nombre: 'Ana García', correo: 'ana.garcia@email.com', fechaRegistro: '2026-06-07', estado: 'activo' },
  { id: '2', nombre: 'Carlos Ruiz', correo: 'carlos.ruiz@email.com', fechaRegistro: '2026-06-05', estado: 'activo' },
  { id: '3', nombre: 'Elena Morales', correo: 'elena.m@email.com', fechaRegistro: '2026-05-30', estado: 'bloqueado' },
  { id: '4', nombre: 'Fernando Díaz', correo: 'fernando.d@email.com', fechaRegistro: '2026-05-22', estado: 'activo' },
  { id: '5', nombre: 'Gabriela Ortiz', correo: 'gabriela.o@email.com', fechaRegistro: '2026-05-15', estado: 'inactivo' },
  { id: '6', nombre: 'Héctor Vega', correo: 'hector.v@email.com', fechaRegistro: '2026-05-10', estado: 'activo' },
]

export const categorias: Categoria[] = [
  { id: '1', nombre: 'Gastronomía', descripcion: 'Restaurantes, cafeterías y productos alimenticios', activa: true, emprendimientos: 68 },
  { id: '2', nombre: 'Tecnología', descripcion: 'Software, hardware y servicios tecnológicos', activa: true, emprendimientos: 52 },
  { id: '3', nombre: 'Moda', descripcion: 'Ropa, accesorios y diseño de moda', activa: true, emprendimientos: 41 },
  { id: '4', nombre: 'Artesanía', descripcion: 'Productos hechos a mano y arte local', activa: true, emprendimientos: 38 },
  { id: '5', nombre: 'Servicios', descripcion: 'Servicios profesionales y personales', activa: true, emprendimientos: 35 },
  { id: '6', nombre: 'Salud', descripcion: 'Bienestar, fitness y cuidado personal', activa: false, emprendimientos: 14 },
]

export const reportes: Reporte[] = [
  { id: '1', tipo: 'emprendimiento', titulo: 'Tienda Express 24', descripcion: 'Información engañosa sobre productos', reportadoPor: 'Carlos Ruiz', fecha: '2026-06-07', estado: 'pendiente' },
  { id: '2', tipo: 'comentario', titulo: 'Comentario en TechStart', descripcion: 'Lenguaje ofensivo en reseña', reportadoPor: 'Ana García', fecha: '2026-06-06', estado: 'pendiente' },
  { id: '3', tipo: 'contenido', titulo: 'Imagen inapropiada', descripcion: 'Contenido no apto en perfil de emprendimiento', reportadoPor: 'Elena Morales', fecha: '2026-06-05', estado: 'revisado' },
  { id: '4', tipo: 'emprendimiento', titulo: 'Moda Express', descripcion: 'Posible plagio de diseños', reportadoPor: 'Sofía Hernández', fecha: '2026-06-04', estado: 'pendiente' },
]

export const notificaciones: Notificacion[] = [
  { id: '1', titulo: 'Nueva solicitud', mensaje: 'Café Artesanal Luna espera aprobación', fecha: 'Hace 2 horas', leida: false, tipo: 'info' },
  { id: '2', titulo: 'Reporte recibido', mensaje: 'Nuevo reporte de contenido inapropiado', fecha: 'Hace 5 horas', leida: false, tipo: 'warning' },
  { id: '3', titulo: 'Emprendimiento aprobado', mensaje: 'TechStart Solutions fue aprobado exitosamente', fecha: 'Ayer', leida: true, tipo: 'success' },
  { id: '4', titulo: 'Nuevo usuario', mensaje: 'Ana García se registró en la plataforma', fecha: 'Ayer', leida: true, tipo: 'info' },
]

export const emprendimientosMasVisitados = [
  { nombre: 'GreenBite Organics', visitas: 2100 },
  { nombre: 'TechStart Solutions', visitas: 1250 },
  { nombre: 'Moda Étnica MX', visitas: 890 },
  { nombre: 'Café Artesanal Luna', visitas: 342 },
  { nombre: 'Artesanías del Valle', visitas: 156 },
]

export const usuariosActivosMensual = [
  { mes: 'Ene', activos: 820 },
  { mes: 'Feb', activos: 890 },
  { mes: 'Mar', activos: 950 },
  { mes: 'Abr', activos: 1020 },
  { mes: 'May', activos: 1180 },
  { mes: 'Jun', activos: 1350 },
]
