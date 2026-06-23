import GlassCard from '@/components/ui/GlassCard'
import { formatCurrency } from '@/lib/utils'
import { ArrowUpCircle, ArrowDownCircle, Wallet, Target } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-on-surface" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Olá, Isa &amp; Fe 👋
          </h2>
          <p className="text-sm text-on-surface-variant mt-0.5">Junho de 2026</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <GlassCard className="p-5" glow>
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Saldo Total
            </p>
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-primary neon-text" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {formatCurrency(0)}
          </p>
          <p className="text-xs text-on-surface-variant mt-1">em todas as contas</p>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Entradas
            </p>
            <div className="w-8 h-8 rounded-lg bg-tertiary/10 flex items-center justify-center">
              <ArrowUpCircle className="w-4 h-4 text-tertiary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-tertiary neon-green" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {formatCurrency(0)}
          </p>
          <p className="text-xs text-on-surface-variant mt-1">este mês</p>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Saídas
            </p>
            <div className="w-8 h-8 rounded-lg bg-error/10 flex items-center justify-center">
              <ArrowDownCircle className="w-4 h-4 text-error" />
            </div>
          </div>
          <p className="text-2xl font-bold text-error" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {formatCurrency(0)}
          </p>
          <p className="text-xs text-on-surface-variant mt-1">este mês</p>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Metas Ativas
            </p>
            <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Target className="w-4 h-4 text-secondary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-secondary" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            0
          </p>
          <p className="text-xs text-on-surface-variant mt-1">em andamento</p>
        </GlassCard>
      </div>

      {/* Placeholder area */}
      <GlassCard className="p-8 text-center">
        <p className="text-on-surface-variant text-sm">
          Configure suas contas e comece a registrar suas movimentações.
        </p>
      </GlassCard>
    </div>
  )
}
