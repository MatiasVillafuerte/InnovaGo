import { cn } from '../../lib/utils'

export function Badge({ children, variant = 'default', className = '', icon: Icon, ...props }) {
  const variants = {
    default:  'bg-slate-100 text-slate-700 border-slate-200',
    primary:  'bg-primary-100 text-primary-700 border-primary-200',
    success:  'bg-success-100 text-success-700 border-success-200',
    warning:  'bg-warning-100 text-warning-700 border-warning-200',
    danger:   'bg-danger-100 text-danger-700 border-danger-200',
    info:     'bg-primary-100 text-primary-700 border-primary-200',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        variants[variant],
        className || ''
      )}
      {...props}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  )
}
