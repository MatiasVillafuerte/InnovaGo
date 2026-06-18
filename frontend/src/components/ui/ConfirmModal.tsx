import { cn } from '../../lib/utils'
import { AlertTriangle, HelpCircle, CheckCircle } from 'lucide-react'
import { Modal } from './Modal'
import { Button } from './Button'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'primary' | 'success'
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger',
}: ConfirmModalProps) {
  
  const iconConfig = {
    danger: { icon: AlertTriangle, color: 'text-red-650 bg-red-50' },
    warning: { icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
    primary: { icon: HelpCircle, color: 'text-primary-600 bg-primary-50' },
    success: { icon: CheckCircle, color: 'text-success-600 bg-success-50' },
  }

  const IconComponent = iconConfig[variant].icon
  const iconColorClass = iconConfig[variant].color

  const confirmButtonVariants = {
    danger: 'danger' as const,
    warning: 'primary' as const, // primary con hover especial o secondary
    primary: 'primary' as const,
    success: 'success' as const,
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', iconColorClass)}>
            <IconComponent className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
          <Button variant="secondary" size="sm" onClick={onClose}>
            {cancelText}
          </Button>
          <Button
            variant={confirmButtonVariants[variant]}
            size="sm"
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
