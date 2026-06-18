import { cn } from '../../lib/utils'

export function Table({ className, ...props }) {
  return (
    <div className="overflow-x-auto w-full scrollbar-thin">
      <table
        className={cn('w-full border-collapse text-left', className)}
        {...props}
      />
    </div>
  )
}

export function TableHeader({ className, ...props }) {
  return (
    <thead
      className={cn(
        'bg-slate-100 border-b border-slate-200',
        className
      )}
      {...props}
    />
  )
}

export function TableBody({ className, ...props }) {
  return (
    <tbody
      className={cn(
        'divide-y divide-slate-200 bg-white',
        className
      )}
      {...props}
    />
  )
}

export function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn(
        'hover:bg-slate-50 transition-colors',
        className
      )}
      {...props}
    />
  )
}

export function TableHead({ className, ...props }) {
  return (
    <th
      className={cn(
        'px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider',
        className
      )}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }) {
  return (
    <td
      className={cn(
        'px-6 py-4 text-sm text-slate-700 border-b border-slate-150',
        className
      )}
      {...props}
    />
  )
}
