import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

export function Modal({
  isOpen,
  open,
  onClose,
  title,
  children,
  className = '',
  size = 'md',
  ...props
}) {
  const show = isOpen ?? open

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [show])

  if (!show) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-xl',
    xl: 'max-w-2xl',
    full: 'max-w-4xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full bg-white rounded-2xl shadow-2xl animate-scale-in border border-slate-200 flex flex-col max-h-[90vh]',
          sizes[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {/* Si tiene prop 'title', renderizamos el header por conveniencia */}
        {title ? (
          <ModalHeader onClose={onClose}>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
        ) : null}

        {/* Si tiene prop 'title', envolvemos el contenido en un ModalBody por defecto */}
        {title ? (
          <ModalBody className="overflow-y-auto scrollbar-thin">{children}</ModalBody>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

export function ModalHeader({ children, onClose, className = '' }) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-6 py-4 border-b border-slate-150 shrink-0',
        className
      )}
    >
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}

export function ModalTitle({ children, className = '' }) {
  return (
    <h2 className={cn('text-xl font-bold text-slate-900', className)}>
      {children}
    </h2>
  )
}

export function ModalBody({ children, className = '' }) {
  return (
    <div className={cn('px-6 py-5 text-slate-700', className)}>
      {children}
    </div>
  )
}

export function ModalFooter({ children, className = '' }) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-150 bg-slate-50 rounded-b-2xl shrink-0',
        className
      )}
    >
      {children}
    </div>
  )
}
