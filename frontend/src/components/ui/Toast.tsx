import { useEffect } from 'react'
import { CheckCircle, AlertCircle, AlertTriangle, X } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ToastProps {
  show: boolean
  message: string
  type?: 'success' | 'error' | 'warning'
  onClose: () => void
  duration?: number
}

export function Toast({
  show,
  message,
  type = 'success',
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [show, duration, onClose])

  if (!show) return null

  const typeStyles = {
    success: {
      bg: 'bg-success-50 border-success-100',
      text: 'text-success-700',
      icon: CheckCircle,
      iconColor: 'text-success-600',
    },
    error: {
      bg: 'bg-red-50 border-red-100',
      text: 'text-red-850',
      icon: AlertCircle,
      iconColor: 'text-red-550',
    },
    warning: {
      bg: 'bg-amber-50 border-amber-100',
      text: 'text-amber-850',
      icon: AlertTriangle,
      iconColor: 'text-amber-550',
    },
  }

  const styles = typeStyles[type]
  const Icon = styles.icon

  return (
    <div className="fixed bottom-5 right-5 z-55 max-w-sm w-full animate-slide-up">
      <div
        className={cn(
          'flex items-center gap-3 rounded-xl border p-4 shadow-lg transition-all',
          styles.bg,
          styles.text
        )}
      >
        <Icon className={cn('h-5 w-5 shrink-0', styles.iconColor)} />
        <p className="flex-1 text-sm font-medium leading-normal">{message}</p>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-900/5 hover:text-slate-700 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
