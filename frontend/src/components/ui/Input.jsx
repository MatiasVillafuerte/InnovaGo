import { cn } from '../../lib/utils'

/**
 * Input con soporte completo de label, variantes y tamaños.
 * El prop `label` se renderiza como <label> encima del campo.
 */
export function Input({ className = '', label, id, variant = 'default', size = 'md', ...props }) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  const variants = {
    default: 'border-slate-300 focus:border-primary-500 focus:ring-primary-500/20',
    error: 'border-danger-500 focus:border-danger-600 focus:ring-danger-500/20',
    success: 'border-success-500 focus:border-success-600 focus:ring-success-500/20',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-lg border',
          'bg-white',
          'text-slate-900',
          'placeholder:text-slate-400',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    </div>
  )
}

/**
 * Textarea con soporte de label y resize.
 */
export function Textarea({ className = '', label, id, rows = 4, ...props }) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={cn(
          'w-full px-4 py-2.5 rounded-lg border border-slate-300',
          'bg-white',
          'text-slate-900',
          'placeholder:text-slate-400',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'resize-none',
          className
        )}
        {...props}
      />
    </div>
  )
}

/**
 * Select con soporte de label, opciones como array.
 * Acepta `options: Array<{value, label}>` o `children` normales.
 */
export function Select({ children, className = '', label, id, options, ...props }) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'w-full px-4 py-2 rounded-lg border border-slate-300',
          'bg-white',
          'text-slate-900',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      >
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
    </div>
  )
}
