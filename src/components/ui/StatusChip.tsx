import { cn } from '@/lib/utils'

type Status = 'pago' | 'pendente' | 'vencido' | 'ativo' | 'pausado'

const statusConfig: Record<Status, { label: string; classes: string }> = {
  pago: { label: 'Pago', classes: 'bg-tertiary/15 text-tertiary border-tertiary/20' },
  pendente: { label: 'Pendente', classes: 'bg-primary/15 text-primary border-primary/20' },
  vencido: { label: 'Vencido', classes: 'bg-error/15 text-error border-error/20' },
  ativo: { label: 'Ativo', classes: 'bg-tertiary/15 text-tertiary border-tertiary/20' },
  pausado: { label: 'Pausado', classes: 'bg-outline/15 text-on-surface-variant border-outline/20' },
}

interface StatusChipProps {
  status: Status
  className?: string
}

export default function StatusChip({ status, className }: StatusChipProps) {
  const config = statusConfig[status]
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.classes,
        className
      )}
      style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
    >
      {config.label}
    </span>
  )
}
