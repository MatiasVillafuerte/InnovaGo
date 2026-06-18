export type EstadoEmprendimiento = 'aprobado' | 'pendiente' | 'rechazado'
export type EstadoUsuario = 'activo' | 'bloqueado' | 'inactivo'
export type TipoReporte = 'emprendimiento' | 'comentario' | 'contenido'

export interface Emprendimiento {
  id: string
  nombre: string
  propietario: string
  categoria: string
  fechaRegistro: string
  estado: EstadoEmprendimiento
  descripcion: string
  email: string
  telefono: string
  redesSociales: { plataforma: string; url: string }[]
  logo: string
  visitas: number
  destacado: boolean
}

export interface Usuario {
  id: string
  nombre: string
  correo: string
  fechaRegistro: string
  estado: EstadoUsuario
}

export interface Categoria {
  id: string
  nombre: string
  descripcion: string
  activa: boolean
  emprendimientos: number
}

export interface Reporte {
  id: string
  tipo: TipoReporte
  titulo: string
  descripcion: string
  reportadoPor: string
  fecha: string
  estado: 'pendiente' | 'revisado' | 'resuelto'
}

export interface ActividadReciente {
  id: string
  accion: string
  usuario: string
  detalle: string
  fecha: string
}

export interface Notificacion {
  id: string
  titulo: string
  mensaje: string
  fecha: string
  leida: boolean
  tipo: 'info' | 'warning' | 'success'
}
