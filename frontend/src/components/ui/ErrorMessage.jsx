import { AlertCircle, X } from 'lucide-react'
import { cn } from '../../lib/utils'

export function ErrorMessage({ message, onDismiss, className }) {
  return (
    <div className={cn('flex items-start gap-3 p-4 bg-danger-50 border border-danger-200 rounded-lg', className)}>
      <AlertCircle className="w-5 h-5 text-danger-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm text-danger-900">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-danger-400 hover:text-danger-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export function ErrorPage({ title = 'Error', message, onRetry }) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-danger-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-danger-600" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">{title}</h2>
        <p className="text-slate-600 mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Intentar de nuevo
          </button>
        )}
      </div>
    </div>
  )
}
