'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, Calendar, Plus, Heart, Settings, MoreVertical, ArrowUpRight, Coffee, Home, Car, Zap, Building2 } from 'lucide-react'
import BarChart from '@/components/dashboard/BarChart'
import { getResumoMes } from '@/lib/data'

/* ─── Card elevado com luz pontual ─── */
function Card({
  children,
  glowRgb = '160,100,255',
  glowAt = 'top right',
  className = '',
  style = {},
}: {
  children: React.ReactNode
  glowRgb?: string
  glowAt?: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`card-hover ${className}`}
      style={{
        position: 'relative',
        background: `radial-gradient(ellipse 70% 60% at ${glowAt}, rgba(${glowRgb},0.13) 0%, transparent 55%), #0A0A0F`,
        border: `1px solid rgba(${glowRgb},0.13)`,
        borderRadius: 16,
        padding: 16,
        boxShadow: `inset 0 1px 0 rgba(${glowRgb},0.07), 0 8px 32px rgba(0,0,0,0.4)`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ── Estilos utilitários ── */
const lbl: React.CSSProperties = { fontSize: 9, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#55556A', margin: '0 0 6px' }
const pill = (c: string, bg: string): React.CSSProperties => ({ background: bg, color: c, borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 2, flexShrink: 0 })
const hr: React.CSSProperties = { height: 1, background: 'rgba(255,255,255,0.05)', margin: '10px 0' }

const movs = [
  { Icon: Coffee,       l: 'Café & Padaria', s: 'Hoje · 08:32',  v: '- R$ 45,00',    p: false },
  { Icon: ArrowUpRight, l: 'Salário Isa',     s: 'Hoje · 00:00',  v: '+ R$ 5.200,00', p: true  },
  { Icon: Home,         l: 'Condomínio',      s: 'Ontem · 10:00', v: '- R$ 850,00',   p: false },
  { Icon: Car,          l: 'Posto Shell',     s: 'Seg · 18:45',   v: '- R$ 180,00',   p: false },
  { Icon: ArrowUpRight, l: 'Freelance Fe',    s: 'Dom · 14:00',   v: '+ R$ 3.040,00', p: true  },
]

export default function DashboardPage() {
  const [resumo, setResumo] = useState({ totalSaidas: 0, totalEntradas: 0, totalContas: 0, saldo: 0, contas: [] as any[], metas: [] as any[] })

  useEffect(() => {
    const now = new Date()
    getResumoMes(now.getMonth() + 1, now.getFullYear()).then(setResumo)
  }, [])

  const totalSaldo   = resumo.totalContas || 15420.50
  const totalEntrada = resumo.totalEntradas || 8240
  const totalSaida   = resumo.totalSaidas  || 3120.50
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexShrink: 0 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 500, color: '#fff', margin: 0, lineHeight: 1.2 }}>Olá, Isa &amp; Fe 👋</h2>
          <p style={{ fontSize: 11, color: '#55556A', margin: '2px 0 0' }}>Junho de 2026</p>
        </div>
        <div style={{ display: 'flex', gap: 7 }}>
          {[{ cal: true, l: 'Junho' }, { cal: false, l: '2026' }].map(({ cal, l }) => (
            <button key={l} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20, padding: '5px 12px', color: '#8888AA', fontSize: 11,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            }}>
              {cal && <Calendar size={12} color="#55556A" />}
              {l} <ChevronDown size={11} color="#55556A" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Corpo: grid 2 colunas, flex:1 para ocupar o restante ── */}
      <div style={{
        minHeight: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 310px',
        gridTemplateRows: '1fr',
        gap: 14,
      }}>

        {/* ════ Coluna esquerda ════ */}
        <div style={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          gap: 14,
          minHeight: 0,
        }}>

          {/* Linha 1: Saldo Total + Cartões (altura automática pelo conteúdo) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

            {/* Saldo Total */}
            <Card glowRgb="160,100,255" glowAt="top right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {/* Topo */}
              <div>
                <p style={{ ...lbl, marginBottom: 8 }}>Saldo Total Compartilhado</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    R$ 15.420,50
                  </span>
                  <span style={pill('#4ADE80', 'rgba(74,222,128,0.12)')}>▲ +12.5%</span>
                </div>
              </div>

              {/* Linha divisória */}
              <div style={hr} />

              {/* Resumo inferior */}
              <div style={{ display: 'flex' }}>
                {[
                  { l: 'Entradas',      v: 'R$ 8.240,00',   c: '#4ADE80' },
                  { l: 'Saídas',        v: 'R$ 3.120,50',   c: '#FF4D6D' },
                  { l: 'Balanço Atual', v: '+ R$ 5.119,50', c: '#fff'    },
                ].map(({ l, v, c }, i) => (
                  <div key={l} style={{
                    flex: 1,
                    paddingRight: i < 2 ? 12 : 0,
                    paddingLeft: i > 0 ? 12 : 0,
                    borderRight: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}>
                    <p style={{ fontSize: 9, color: '#55556A', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: c, margin: 0 }}>{v}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Cartões de Crédito */}
            <Card glowRgb="217,102,255" glowAt="top right">
              <p style={lbl}>Cartões de Crédito</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2 }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>R$ 3.120,50</span>
                <span style={pill('#FF4D6D', 'rgba(255,77,109,0.12)')}>Aberta</span>
              </div>
              <div style={hr} />
              <div style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 9, color: '#55556A' }}>Limite utilizado</span>
                  <span style={{ fontSize: 9, color: '#8888AA' }}>26% de R$ 12.000</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '26%', borderRadius: 99, background: 'linear-gradient(90deg,#4ADE80,#D966FF)', boxShadow: '0 0 8px rgba(217,102,255,0.5)' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[
                  { b: 'Nubank', cor: '#820AD1', g: 'R$ 1.840', pct: 26 },
                  { b: 'Itaú',   cor: '#EC7000', g: 'R$ 980',   pct: 20 },
                  { b: 'Inter',  cor: '#FF7A00', g: 'R$ 300',   pct: 10 },
                ].map(c => (
                  <div key={c.b} style={{
                    flex: 1, background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '7px 8px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.cor, boxShadow: `0 0 5px ${c.cor}` }} />
                      <span style={{ fontSize: 9, color: '#55556A' }}>{c.b}</span>
                    </div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#fff', margin: '0 0 3px' }}>{c.g}</p>
                    <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 99 }}>
                      <div style={{ height: '100%', width: `${c.pct * 4}%`, background: c.cor, borderRadius: 99 }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Gráfico — ocupa o espaço que sobra */}
          <Card glowRgb="120,70,220" glowAt="top right" style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 2, flexShrink: 0 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>Comparativo de Balanço Mensal</h3>
              <div style={{ display: 'flex', gap: 6 }}>
                {['Ordenar', 'Mês'].map(l => (
                  <button key={l} style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 20, padding: '4px 10px', color: '#55556A', fontSize: 10,
                    cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                  }}>
                    {l} <ChevronDown size={10} color="#55556A" />
                  </button>
                ))}
              </div>
            </div>
            <p style={{ fontSize: 9, color: '#55556A', margin: '1px 0 1px', flexShrink: 0 }}>Balanço atual</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.02em', flexShrink: 0 }}>R$ 3.200,00</p>
            <div style={{ flex: 1, minHeight: 0 }}>
              <BarChart />
            </div>
          </Card>

          {/* Saldos por Conta (altura automática) */}
          <Card glowRgb="100,80,200" glowAt="top left">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>Saldos por Conta</h3>
              <button style={{
                width: 22, height: 22, borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#55556A',
              }}><Plus size={11} /></button>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { iconBg: '#820AD1', gRgb: '130,10,209', sigla: 'Nu', label: 'NUBANK', saldo: 'R$ 8.240,00',  pct: '2,4%' },
                { iconBg: '#EC7000', gRgb: '236,112,0',  sigla: 'It', label: 'ITAÚ',   saldo: 'R$ 7.180,50',  pct: '1,8%' },
                { iconBg: '#FF7A00', gRgb: '255,122,0',  sigla: 'In', label: 'INTER',  saldo: 'R$ 12.000,00', pct: '3,2%' },
              ].map(b => (
                <div key={b.label} className="card-bank-notch" style={{
                  flex: 1, height: 112, borderRadius: 10, padding: '10px 10px 8px',
                  background: `radial-gradient(ellipse 80% 55% at top center, rgba(${b.gRgb},0.22) 0%, #060608 65%)`,
                  boxShadow: `0 3px 16px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(${b.gRgb},0.15)`,
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  position: 'relative',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 5, background: b.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 9, color: '#fff' }}>{b.sigla}</div>
                      <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.07em' }}>{b.label}</span>
                    </div>
                    <Settings size={10} color="#55556A" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'linear-gradient(135deg,#3d1a6e,#1a0a40)', border: '1px solid rgba(196,77,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8 }}>👫</div>
                    <span style={{ fontSize: 9, color: '#55556A' }}>Isa e Fe</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 8, color: '#55556A', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 2px' }}>SALDO</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: '#fff', margin: 0 }}>{b.saldo}</p>
                      <span style={{ fontSize: 9, fontWeight: 600, color: '#4ADE80', background: 'rgba(74,222,128,0.1)', padding: '1px 5px', borderRadius: 20 }}>▲ {b.pct}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ════ Coluna direita — grid de 3 linhas iguais ════ */}
        <div style={{
          display: 'grid',
          gridTemplateRows: '1fr 1fr 1fr',
          gap: 14,
          minHeight: 0,
        }}>

          {/* Objetivo */}
          <Card glowRgb="217,102,255" glowAt="top left" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Heart size={13} color="#D966FF" fill="#D966FF" />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>Objetivo Casamento</span>
              </div>
              <MoreVertical size={13} color="#55556A" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <span style={{ fontSize: 9, color: '#55556A' }}>Progresso atual</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#D966FF' }}>45%</span>
            </div>
            <p style={{ fontSize: 11, color: '#55556A', margin: '0 0 7px' }}>
              <span style={{ color: '#fff', fontWeight: 700 }}>R$ 45.000</span> / R$ 100.000
            </p>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden', marginBottom: 0 }}>
              <div style={{ height: '100%', width: '45%', borderRadius: 99, background: 'linear-gradient(90deg,#C44DFF,#9B6FFF)', boxShadow: '0 0 8px rgba(196,77,255,0.4)' }} />
            </div>
            <button style={{
              width: '100%', padding: 8, marginTop: 'auto',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 9, color: '#CCCCDD', fontSize: 11, fontWeight: 500,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            }}>Poupar mais</button>
          </Card>

          {/* Categorias */}
          <Card glowRgb="130,80,200" glowAt="top right" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexShrink: 0 }}>
              <h3 style={{ fontSize: 12, fontWeight: 600, color: '#fff', margin: 0 }}>Categorias mais gastas</h3>
              <span style={{ fontSize: 9, color: '#55556A' }}>Jun 2026</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
              {[
                { l: 'Alimentação', v: 'R$ 1.840', pct: 60, c: '#D966FF' },
                { l: 'Moradia',     v: 'R$ 2.450', pct: 80, c: '#7B5EA7' },
                { l: 'Transporte',  v: 'R$ 850',   pct: 28, c: '#22C55E' },
              ].map(({ l, v, pct, c }) => (
                <div key={l}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: c, boxShadow: `0 0 5px ${c}` }} />
                      <span style={{ fontSize: 11, color: '#CCCCDD' }}>{l}</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>{v}</span>
                  </div>
                  <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 99 }}>
                    <div style={{ height: '100%', width: `${pct}%`, borderRadius: 99, background: c, boxShadow: `0 0 5px ${c}60` }} />
                  </div>
                </div>
              ))}
            </div>
            <button style={{ marginTop: 8, background: 'none', border: 'none', color: '#D966FF', fontSize: 10, cursor: 'pointer', padding: 0, fontFamily: 'Inter, sans-serif', flexShrink: 0 }}>
              Ver todas as categorias →
            </button>
          </Card>

          {/* Atenção às Contas */}
          <Card glowRgb="255,77,109" glowAt="top left" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ flexShrink: 0, marginBottom: 8 }}>
              <h3 style={{ fontSize: 12, fontWeight: 600, color: '#fff', margin: '0 0 1px' }}>Atenção às Contas!</h3>
              <p style={{ fontSize: 10, color: '#55556A', margin: 0 }}>Mantenha os pagamentos em dia.</p>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7, justifyContent: 'center' }}>
              {[
                { Icon: Building2, l: 'Condomínio',       s: 'Venceu ontem',  sC: '#FF4D6D', v: 'R$ 850,00', rgb: '255,77,109' },
                { Icon: Zap,       l: 'Energia Elétrica', s: 'Vence amanhã',  sC: '#F59E0B', v: 'R$ 240,00', rgb: '245,158,11' },
              ].map(({ Icon, l, s, sC, v, rgb }) => (
                <div key={l} style={{
                  background: `rgba(${rgb},0.05)`, border: `1px solid rgba(${rgb},0.12)`,
                  borderLeft: `3px solid rgba(${rgb},1)`, borderRadius: 9, padding: '8px 11px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 7, background: `rgba(${rgb},0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={13} color={sC} />
                    </div>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 500, color: '#fff', margin: 0 }}>{l}</p>
                      <p style={{ fontSize: 9, color: sC, margin: '1px 0 0' }}>{s}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{v}</span>
                </div>
              ))}
            </div>
            <button style={{
              width: '100%', padding: 9, marginTop: 8, flexShrink: 0,
              background: 'linear-gradient(90deg,#C44DFF,#9B59FF)', border: 'none', borderRadius: 10,
              color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              boxShadow: '0 4px 16px rgba(196,77,255,0.3)',
            }}>Pagar Contas</button>
          </Card>

        </div>
      </div>
    </div>
  )
}
