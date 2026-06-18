import { Inbox, Search, Heart, FileText, Package } from 'lucide-react'
import { Button } from './Button'
import { cn } from '../../lib/utils'

export function EmptyState({ icon: Icon, title, description, action, actionLabel, onAction, className }) {
  return (
    <div className={cn('text-center py-12', className)}>
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {Icon ? <Icon className="w-8 h-8 text-slate-400" /> : <Inbox className="w-8 h-8 text-slate-400" />}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 mb-4">{description}</p>
      {action && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  )
}

export function EmptySearch({ onClear }) {
  return (
    <EmptyState
      icon={Search}
      title="No se encontraron resultados"
      description="Intenta con otros términos de búsqueda o filtros"
      action={onClear ? true : false}
      actionLabel="Limpiar filtros"
      onAction={onClear}
    />
  )
}

export function EmptyFavorites() {
  return (
    <EmptyState
      icon={Heart}
      title="No tienes favoritos"
      description="Guarda emprendimientos para verlos aquí"
    />
  )
}

export function EmptyProducts() {
  return (
    <EmptyState
      icon={Package}
      title="No hay productos"
      description="Agrega productos a tu emprendimiento"
    />
  )
}

export function EmptyMessages() {
  return (
    <EmptyState
      icon={FileText}
      title="No hay mensajes"
      description="Cuando recibas mensajes, aparecerán aquí"
    />
  )
}
