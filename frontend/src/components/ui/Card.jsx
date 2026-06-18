import { cn } from '../../lib/utils'

export function Card({ children, className, padding = false, variant = 'default', ...props }) {
  const variants = {
    default: 'bg-white border border-slate-200 shadow-sm',
    elevated: 'bg-white border border-slate-200 shadow-md',
    outlined: 'bg-white border border-slate-200 shadow-sm',
    ghost: 'bg-transparent border-0 shadow-none',
  }

  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-200',
        variants[variant],
        padding && 'p-6',
        className || ''
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn('px-6 py-5 border-b border-slate-150', className || '')}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className }) {
  return (
    <h3 className={cn('text-base font-bold text-slate-900', className || '')}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className }) {
  return (
    <p className={cn('text-xs text-slate-500 mt-1', className || '')}>
      {children}
    </p>
  )
}

export function CardContent({ children, className }) {
  return (
    <div className={cn('px-6 py-5', className || '')}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className }) {
  return (
    <div
      className={cn(
        'px-6 py-4 border-t border-slate-150 bg-slate-50 rounded-b-xl',
        className || ''
      )}
    >
      {children}
    </div>
  )
}
