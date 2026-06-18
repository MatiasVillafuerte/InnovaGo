import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'

export function Loading({ size = 'md', className }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  return (
    <Loader2 className={cn('animate-spin text-primary-600', sizes[size], className)} />
  )
}

export function LoadingPage({ message = 'Cargando...' }) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <Loading size="xl" className="mx-auto mb-4" />
        <p className="text-slate-600">{message}</p>
      </div>
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
    </div>
  )
}
