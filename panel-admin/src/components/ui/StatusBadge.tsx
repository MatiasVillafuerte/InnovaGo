interface StatusBadgeProps {
  status: string
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
}

const variants = {
  success: 'bg-success-50 text-success-700 ring-success-500/20',
  warning: 'bg-warning-50 text-warning-600 ring-warning-500/20',
  danger: 'bg-danger-50 text-danger-600 ring-danger-500/20',
  info: 'bg-primary-50 text-primary-700 ring-primary-500/20',
  neutral: 'bg-slate-100 text-slate-600 ring-slate-500/20',
}

const statusMap: Record<string, { label: string; variant: StatusBadgeProps['variant'] }> = {
  aprobado: { label: 'Aprobado', variant: 'success' },
  pendiente: { label: 'Pendiente', variant: 'warning' },
  rechazado: { label: 'Rechazado', variant: 'danger' },
  activo: { label: 'Activo', variant: 'success' },
  bloqueado: { label: 'Bloqueado', variant: 'danger' },
  inactivo: { label: 'Inactivo', variant: 'neutral' },
  revisado: { label: 'Revisado', variant: 'info' },
  resuelto: { label: 'Resuelto', variant: 'success' },
}

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const config = statusMap[status] ?? { label: status, variant: variant ?? 'neutral' }
  const v = variant ?? config.variant ?? 'neutral'

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${variants[v]}`}>
      {config.label}
    </span>
  )
}
