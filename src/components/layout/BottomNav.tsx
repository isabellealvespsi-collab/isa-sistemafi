'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Wallet,
  ArrowUpCircle,
  CreditCard,
  Target,
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/contas', label: 'Contas', icon: Wallet },
  { href: '/entradas', label: 'Entradas', icon: ArrowUpCircle },
  { href: '/cartoes', label: 'Cartões', icon: CreditCard },
  { href: '/metas', label: 'Metas', icon: Target },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50
      bg-surface-container-low/90 backdrop-blur-xl border-t border-primary/10
      flex items-center justify-around px-2 pb-safe pt-2 safe-area-pb">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all
              ${active ? 'text-primary' : 'text-on-surface-variant'}`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px]" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
