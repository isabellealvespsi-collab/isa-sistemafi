'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutGrid,
  ArrowUpCircle,
  ArrowDownCircle,
  TrendingDown,
  Wallet,
  CreditCard,
  Target,
  FileSpreadsheet,
  Settings,
  LogOut,
} from 'lucide-react'

const navItems = [
  { href: '/',          label: 'Visão Geral',       icon: LayoutGrid      },
  { href: '/entradas',  label: 'Entradas',           icon: ArrowUpCircle   },
  { href: '/despesas',  label: 'Despesas Fixas',     icon: ArrowDownCircle },
  { href: '/saidas',    label: 'Saídas',             icon: TrendingDown    },
  { href: '/contas',    label: 'Saldo em Conta',     icon: Wallet          },
  { href: '/cartoes',   label: 'Cartões de Crédito', icon: CreditCard      },
  { href: '/metas',     label: 'Metas',              icon: Target          },
  { href: '/extrato',   label: 'Extrato Bancário',   icon: FileSpreadsheet },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: 224, padding: '12px 10px', zIndex: 50, display: 'flex', flexDirection: 'column' }}>
      <aside style={{
        flex: 1,
        background: 'rgba(12, 16, 24, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}>

        {/* ── Perfil — sem badge PRO ── */}
        <div style={{ padding: '16px 14px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #3d1a6e, #1a0a40)',
              border: '2px solid rgba(196,77,255,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, boxShadow: '0 0 12px rgba(196,77,255,0.2)',
            }}>👫</div>
            <div style={{ minWidth: 0 }}>
              <span style={{ fontSize: 10, color: '#55556A', display: 'block', marginBottom: 2 }}>@isa_e_fe</span>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Isa &amp; Fe
              </p>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 14px' }} />

        {/* ── Nav ── */}
        <nav style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto' }}>
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 10px', borderRadius: 10,
                fontSize: 13, fontWeight: active ? 500 : 400,
                color: active ? '#FFFFFF' : '#3A3A52',
                textDecoration: 'none',
                background: active ? 'rgba(196,77,255,0.08)' : 'transparent',
                borderLeft: active ? '2px solid #C44DFF' : '2px solid transparent',
                transition: 'all 0.12s ease',
              }}>
                <Icon size={16} strokeWidth={active ? 2 : 1.5} color={active ? '#C44DFF' : '#3A3A52'} style={{ flexShrink: 0 }} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 14px' }} />

        {/* ── Footer: Ajustes + Sair ── */}
        <div style={{ padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Link href="/ajustes" style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 10px', borderRadius: 10,
            fontSize: 13, fontWeight: pathname === '/ajustes' ? 500 : 400,
            color: pathname === '/ajustes' ? '#FFFFFF' : '#3A3A52',
            textDecoration: 'none',
            background: pathname === '/ajustes' ? 'rgba(196,77,255,0.08)' : 'transparent',
            borderLeft: pathname === '/ajustes' ? '2px solid #C44DFF' : '2px solid transparent',
            transition: 'all 0.12s ease',
          }}>
            <Settings size={16} strokeWidth={pathname === '/ajustes' ? 2 : 1.5} color={pathname === '/ajustes' ? '#C44DFF' : '#3A3A52'} />
            Ajustes
          </Link>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 10px', borderRadius: 10,
            fontSize: 13, fontWeight: 400, color: '#3A3A52',
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', width: '100%', textAlign: 'left',
          }}>
            <LogOut size={16} strokeWidth={1.5} color="#3A3A52" />
            Sair
          </button>
        </div>
      </aside>
    </div>
  )
}
