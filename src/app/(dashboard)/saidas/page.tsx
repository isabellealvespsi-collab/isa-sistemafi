'use client'

import { useEffect, useState } from 'react'
import { Calendar, Plus, ChevronDown, Gamepad2, Home, Car, ShoppingCart, TrendingUp, Plane, Utensils, CreditCard, ShoppingBag, PawPrint, Pill, Gift, Bike, AlertCircle, Wrench } from 'lucide-react'
import { getSaidas } from '@/lib/data'

/* ── Card padrão Visão Geral ── */
function Card({ children, glowRgb = '160,100,255', glowAt = 'top right', style = {} }: {
  children: React.ReactNode; glowRgb?: string; glowAt?: string; style?: React.CSSProperties
}) {
  return (
    <div className="card-hover" style={{
      background: `radial-gradient(ellipse 70% 60% at ${glowAt}, rgba(${glowRgb},0.13) 0%, transparent 55%), #0A0A0F`,
      border: `1px solid rgba(${glowRgb},0.13)`,
      borderRadius: 16, padding: 16,
      boxShadow: `inset 0 1px 0 rgba(${glowRgb},0.07), 0 8px 32px rgba(0,0,0,0.4)`,
      ...style,
    }}>
      {children}
    </div>
  )
}

const lbl: React.CSSProperties = { fontSize: 9, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#55556A', margin: '0 0 6px' }
const hr:  React.CSSProperties = { height: 1, background: 'rgba(255,255,255,0.05)', margin: '10px 0' }

const categorias = [
  { nome: 'Lazer',            Icon: Gamepad2,     orcamento: 450,  gasto: 320,  cor: '#D966FF', rgb: '217,102,255' },
  { nome: 'Moradia',          Icon: Home,         orcamento: 2250, gasto: 2250, cor: '#7B5EA7', rgb: '123,94,167'  },
  { nome: 'Transporte',       Icon: Car,          orcamento: 600,  gasto: 454,  cor: '#F59E0B', rgb: '245,158,11'  },
  { nome: 'Mercado',          Icon: ShoppingCart, orcamento: 1000, gasto: 1240, cor: '#FF4D6D', rgb: '255,77,109'  },
  { nome: 'Investimentos',    Icon: TrendingUp,   orcamento: 800,  gasto: 800,  cor: '#4ADE80', rgb: '74,222,128'  },
  { nome: 'Viagem',           Icon: Plane,        orcamento: 0,    gasto: 0,    cor: '#60A5FA', rgb: '96,165,250'  },
  { nome: 'Alimentação',      Icon: Utensils,     orcamento: 500,  gasto: 380,  cor: '#FB923C', rgb: '251,146,60'  },
  { nome: 'Empréstimo',       Icon: CreditCard,   orcamento: 0,    gasto: 0,    cor: '#94A3B8', rgb: '148,163,184' },
  { nome: 'Compras Pessoais', Icon: ShoppingBag,  orcamento: 300,  gasto: 190,  cor: '#C084FC', rgb: '192,132,252' },
  { nome: 'PETS',             Icon: PawPrint,     orcamento: 200,  gasto: 85,   cor: '#FCD34D', rgb: '252,211,77'  },
  { nome: 'Farmácia',         Icon: Pill,         orcamento: 150,  gasto: 67,   cor: '#34D399', rgb: '52,211,153'  },
  { nome: 'Presentes',        Icon: Gift,         orcamento: 0,    gasto: 0,    cor: '#F9A8D4', rgb: '249,168,212' },
  { nome: 'iFood',            Icon: Bike,         orcamento: 0,    gasto: 0,    cor: '#FF6B6B', rgb: '255,107,107' },
  { nome: 'Dívidas',          Icon: AlertCircle,  orcamento: 0,    gasto: 0,    cor: '#94A3B8', rgb: '148,163,184' },
  { nome: 'Despesas Fixas',   Icon: Wrench,       orcamento: 0,    gasto: 2277, cor: '#FF4D6D', rgb: '255,77,109'  },
  { nome: 'UBER',             Icon: Car,          orcamento: 0,    gasto: 454,  cor: '#4ADE80', rgb: '74,222,128'  },
]

const totalGasto = categorias.reduce((s, c) => s + c.gasto, 0)
const totalOrc   = categorias.reduce((s, c) => s + c.orcamento, 0)
const dentroOrc  = categorias.filter(c => c.orcamento === 0 || c.gasto <= c.orcamento).length
const foraOrc    = categorias.filter(c => c.orcamento > 0 && c.gasto > c.orcamento)
const top3       = [...categorias].sort((a, b) => b.gasto - a.gasto).filter(c => c.gasto > 0).slice(0, 3)

function fmt(v: number) { return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }
function fmtShort(v: number) { return v >= 1000 ? 'R$' + (v/1000).toFixed(1) + 'k' : 'R$' + v }

/* ── Funil: Top 3 categorias mais gastas ── */
function FunnelChart() {
  const clips = [
    'polygon(0 0, 100% 0, 93% 100%, 7% 100%)',
    'polygon(7% 0, 93% 0, 84% 100%, 16% 100%)',
    'polygon(16% 0, 84% 0, 73% 100%, 27% 100%)',
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {top3.map((cat, i) => (
        <div key={cat.nome} style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '100%',
            height: 76,
            clipPath: clips[i],
            background: `linear-gradient(135deg, rgba(${cat.rgb},0.18) 0%, rgba(${cat.rgb},0.06) 100%)`,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 3,
            position: 'relative',
          }}>
            {i > 0 && (
              <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'rgba(255,255,255,0.07)' }} />
            )}
            <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#55556A' }}>
              #{i + 1} {cat.nome}
            </span>
            <span style={{ fontSize: 18, fontWeight: 800, color: cat.cor, letterSpacing: '-0.02em' }}>
              {fmt(cat.gasto)}
            </span>
            <span style={{ fontSize: 8, color: '#55556A' }}>
              {Math.round(cat.gasto / totalGasto * 100)}% do total
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Card de categoria ── */
function CatCard({ cat }: { cat: typeof categorias[0] }) {
  const temOrc   = cat.orcamento > 0
  const pct      = temOrc ? Math.min(Math.round(cat.gasto / cat.orcamento * 100), 100) : (cat.gasto > 0 ? 100 : 0)
  const dentro   = !temOrc || cat.gasto <= cat.orcamento
  const corBarra = dentro ? 'rgba(74,222,128,0.55)' : 'rgba(255,77,109,0.65)'
  const corPct   = dentro ? '#4ADE80' : '#FF4D6D'

  return (
    <div style={{
      background: `rgba(${cat.rgb},0.04)`,
      border: `1px solid rgba(${cat.rgb},0.1)`,
      borderRadius: 12, padding: '12px',
      display: 'flex', flexDirection: 'column', gap: 7,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: `rgba(${cat.rgb},0.12)`, border: `1px solid rgba(${cat.rgb},0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <cat.Icon size={14} color={cat.cor} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#CCCCDD' }}>{cat.nome}</span>
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 9, color: '#55556A' }}>Orçamento</span>
        <span style={{ fontSize: 10, fontWeight: 500, color: '#8888AA' }}>{temOrc ? fmtShort(cat.orcamento) : 'R$0'}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 9, color: '#55556A' }}>Despesas</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: cat.gasto > 0 ? '#fff' : '#3A3A50' }}>
          {cat.gasto > 0 ? fmtShort(cat.gasto) : 'R$ 0'}
        </span>
      </div>

      {/* Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ fontSize: 10 }}>{dentro ? '✅' : '❌'}</span>
        <span style={{ fontSize: 9, fontWeight: 500, color: dentro ? '#4A6A50' : '#8A3A3A' }}>
          {dentro ? 'Dentro do orçamento' : 'Fora do orçamento'}
        </span>
      </div>

      {/* % em destaque — SEMPRE visível */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <span style={{ fontSize: 8, color: '#55556A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>utilizado</span>
          <span style={{ fontSize: 12, fontWeight: 800, color: corPct }}>{pct}%</span>
        </div>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, borderRadius: 99, background: corBarra, boxShadow: dentro ? '0 0 4px rgba(74,222,128,0.4)' : '0 0 4px rgba(255,77,109,0.4)' }} />
        </div>
      </div>
    </div>
  )
}

export default function SaidasPage() {
  const [dbSaidas, setDbSaidas] = useState<any[]>([])
  useEffect(() => {
    const now = new Date()
    getSaidas(now.getMonth()+1, now.getFullYear()).then(d => { if (d.length > 0) setDbSaidas(d) })
  }, [])

  // Recalcula totais com dados reais se existirem
  const gastoReal = dbSaidas.reduce((s: number, i: any) => s + Number(i.valor), 0)
  const totalGastoFinal = gastoReal > 0 ? gastoReal : totalGasto
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 500, color: '#fff', margin: 0, lineHeight: 1.2 }}>Saídas</h2>
          <p style={{ fontSize: 11, color: '#55556A', margin: '2px 0 0' }}>Despesas por categoria · Junho 2026</p>
        </div>
        <div style={{ display: 'flex', gap: 7 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '5px 12px', color: '#8888AA', fontSize: 11, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            <Calendar size={12} color="#55556A" /> Junho 2026 <ChevronDown size={11} color="#55556A" />
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '5px 14px', color: '#CCCCDD', fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            <Plus size={12} /> Nova Saída
          </button>
        </div>
      </div>

      <div style={{ minHeight: 0, display: 'grid', gridTemplateColumns: '1fr 260px', gap: 14 }}>

        {/* Coluna esquerda */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>

          {/* 3 cards de métrica */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr', gap: 14, flexShrink: 0 }}>

            {/* Total — valor branco, badge colorido */}
            <Card glowRgb="255,77,109" glowAt="top right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={lbl}>Total de Saídas · Jun</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{fmt(totalGasto)}</span>
                {/* Badge vermelho = aumentou vs mês anterior */}
                <span style={{ fontSize: 10, fontWeight: 600, color: '#FF4D6D', background: 'rgba(255,77,109,0.12)', borderRadius: 20, padding: '2px 8px', flexShrink: 0 }}>▲ +8.3%</span>
              </div>
              <div style={hr} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 9, color: '#55556A' }}>Orçamento total</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#8888AA' }}>{fmt(totalOrc)}</span>
              </div>
            </Card>

            <Card glowRgb="74,222,128" glowAt="top left">
              <p style={lbl}>Dentro do Orçamento</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: '#4ADE80', letterSpacing: '-0.02em' }}>{dentroOrc}</span>
                <span style={{ fontSize: 14, fontWeight: 400, color: '#55556A' }}>/ {categorias.length}</span>
              </div>
              <p style={{ fontSize: 10, color: '#55556A', margin: '0 0 10px' }}>categorias no controle</p>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.round(dentroOrc/categorias.length*100)}%`, background: 'rgba(74,222,128,0.45)', borderRadius: 99 }} />
              </div>
            </Card>

            <Card glowRgb="255,77,109" glowAt="top right">
              <p style={lbl}>Fora do Orçamento</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: '#FF4D6D', letterSpacing: '-0.02em' }}>{foraOrc.length}</span>
                <span style={{ fontSize: 14, fontWeight: 400, color: '#55556A' }}>categorias</span>
              </div>
              <p style={{ fontSize: 10, color: '#55556A', margin: '0 0 8px' }}>acima do limite definido</p>
              {foraOrc.slice(0,2).map(c => (
                <div key={c.nome} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 10, color: '#55556A' }}>{c.nome}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#CCCCDD' }}>{fmt(c.gasto)}</span>
                </div>
              ))}
            </Card>
          </div>

          {/* Grid de categorias */}
          <div style={{ minHeight: 0, overflowY: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {categorias.map(cat => <CatCard key={cat.nome} cat={cat} />)}
            </div>
          </div>
        </div>

        {/* Coluna direita — Funil */}
        <Card glowRgb="160,100,255" glowAt="top right" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ flexShrink: 0, marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: '0 0 2px' }}>Top 3 Categorias</h3>
            <p style={{ fontSize: 10, color: '#55556A', margin: 0 }}>Maiores gastos do mês</p>
          </div>

          <FunnelChart />

          <div style={{ ...hr, marginTop: 16 }} />

          <div style={{ flexShrink: 0 }}>
            <p style={{ ...lbl, marginBottom: 8 }}>Top categorias</p>
            {top3.map(cat => (
              <div key={cat.nome} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: cat.cor, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: '#8888AA', flex: 1 }}>{cat.nome}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: cat.cor }}>
                  {Math.round(cat.gasto / totalGasto * 100)}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
