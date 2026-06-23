'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  CreditCard,
  Target,
  Tag,
  FileText,
  TrendingUp,
  CalendarDays,
  Settings,
  Gem,
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Visão Geral', icon: LayoutDashboard },
  { href: '/contas', label: 'Contas', icon: Wallet },
  { href: '/entradas', label: 'Entradas', icon: ArrowUpCircle },
  { href: '/despesas', label: 'Despesas Fixas', icon: ArrowDownCircle },
  { href: '/cartoes', label: 'Cartões', icon: CreditCard },
  { href: '/categorias', label: 'Categorias', icon: Tag },
  { href: '/metas', label: 'Metas', icon: Target },
  { href: '/extrato', label: 'Extrato', icon: FileText },
  { href: '/investimentos', label: 'Investimentos', icon: TrendingUp },
  { href: '/planejamento', label: 'Planejamento', icon: CalendarDays },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex flex-col h-screen w-72 fixed left-0 top-0 z-50
      bg-surface-container-low/80 backdrop-blur-xl border-r border-primary/10
      py-6 shadow-2xl">

      {/* Logo */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-container to-inverse-primary
            flex items-center justify-center shadow-[0_0_16px_rgba(208,188,255,0.3)]">
            <Gem className="w-5 h-5 text-on-primary" />
          </div>
          <h1 className="text-xl font-bold text-primary" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Prosperidade
          </h1>
        </div>
        <p className="text-xs text-on-surface-variant pl-12">Isa &amp; Fe</p>
      </div>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-0.5 px-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150
                ${active
                  ? 'bg-primary-container/20 text-primary font-semibold border-l-2 border-primary'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-primary' : ''}`} />
              {label}
            </Link>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-3 pt-4 border-t border-surface-variant/20 flex flex-col gap-0.5">
        <Link
          href="/configuracoes"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
            text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all"
        >
          <Settings className="w-4 h-4 shrink-0" />
          Configurações
        </Link>
      </div>
    </nav>
  )
}
