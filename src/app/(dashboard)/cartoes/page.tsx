'use client'

import { useState } from 'react'
import { Plus, ShoppingBag, Utensils, Car, Wifi, Zap, Home, ArrowDownLeft, ArrowUpRight, Settings } from 'lucide-react'

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

const cartoes = [
  { nome: 'Nubank', sigla: 'Nu', cor: '#820AD1', rgb: '130,10,209', bandeira: 'VISA',       limite: 7000, fatura: 1840, venc: 10, titular: 'Isabelle F.' },
  { nome: 'Itaú',   sigla: 'It', cor: '#EC7000', rgb: '236,112,0',  bandeira: 'MASTERCARD', limite: 5000, fatura: 980,  venc: 15, titular: 'Felipe M.'   },
  { nome: 'Inter',  sigla: 'In', cor: '#FF7A00', rgb: '255,122,0',  bandeira: 'VISA',       limite: 3000, fatura: 300,  venc: 20, titular: 'Isa & Fe'    },
]

const lancamentos = [
  { desc: 'Supermercado Extra', data: '01/06', valor: 320,  cartao: 'Nubank', Icon: ShoppingBag },
  { desc: 'iFood',              data: '02/06', valor: 85,   cartao: 'Nubank', Icon: Utensils   },
  { desc: 'Posto Shell',        data: '04/06', valor: 180,  cartao: 'Itaú',   Icon: Car        },
  { desc: 'Netflix',            data: '05/06', valor: 44,   cartao: 'Nubank', Icon: Wifi       },
  { desc: 'Conta de Luz',       data: '08/06', valor: 240,  cartao: 'Inter',  Icon: Zap        },
  { desc: 'Rappi',              data: '09/06', valor: 65,   cartao: 'Itaú',   Icon: Utensils   },
  { desc: 'Farmácia',           data: '10/06', valor: 67,   cartao: 'Nubank', Icon: ShoppingBag},
  { desc: 'Aluguel',            data: '10/06', valor: 1800, cartao: 'Inter',  Icon: Home       },
]

const totalFatura = cartoes.reduce((s, c) => s + c.fatura, 0)
const totalLimite = cartoes.reduce((s, c) => s + c.limite, 0)
function fmt(v: number) { return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }

export default function CartoesPage() {
  const [tab, setTab] = useState('Todos')
  const filtrado = tab === 'Todos' ? lancamentos : lancamentos.filter(l => l.cartao === tab)

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 500, color: '#fff', margin: 0 }}>Cartões de Crédito</h2>
          <p style={{ fontSize: 11, color: '#55556A', margin: '2px 0 0' }}>Faturas e lançamentos · Junho 2026</p>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '5px 14px', color: '#CCCCDD', fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
          <Plus size={12} /> Novo Cartão
        </button>
      </div>

      {/* Grid: esquerda (métricas + tabela) | direita (cards físicos) */}
      <div style={{ minHeight: 0, display: 'grid', gridTemplateColumns: '1fr 300px', gap: 14 }}>

        {/* ── Coluna esquerda ── */}
        <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: 14, minHeight: 0 }}>

          {/* 3 métricas */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr', gap: 14 }}>

            <Card glowRgb="255,77,109" glowAt="top right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={lbl}>Total em Fatura</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: '#FF4D6D', letterSpacing: '-0.02em' }}>{fmt(totalFatura)}</span>
                <span style={{ fontSize: 10, color: '#FF4D6D', background: 'rgba(255,77,109,0.1)', borderRadius: 20, padding: '2px 8px' }}>▲ +18%</span>
              </div>
              <div style={hr} />
              <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden', marginBottom: 5 }}>
                <div style={{ height: '100%', width: `${Math.round(totalFatura/totalLimite*100)}%`, background: 'rgba(255,77,109,0.5)', borderRadius: 99 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 9, color: '#55556A' }}>{Math.round(totalFatura/totalLimite*100)}% do limite total</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#8888AA' }}>{fmt(totalLimite - totalFatura)} livre</span>
              </div>
            </Card>

            <Card glowRgb="245,158,11" glowAt="top left">
              <p style={lbl}>Próximo Vencimento</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: '#F59E0B', letterSpacing: '-0.02em', margin: '0 0 2px' }}>Dia 10</p>
              <p style={{ fontSize: 10, color: '#55556A', margin: '0 0 8px' }}>Nubank · Isabelle</p>
              <div style={hr} />
              {cartoes.map(c => (
                <div key={c.nome} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 10, color: '#55556A' }}>Dia {c.venc} · {c.nome}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#CCCCDD' }}>{fmt(c.fatura)}</span>
                </div>
              ))}
            </Card>

            <Card glowRgb="74,222,128" glowAt="top right">
              <p style={lbl}>Limite Disponível</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: '#4ADE80', letterSpacing: '-0.02em', margin: '0 0 2px' }}>{fmt(totalLimite - totalFatura)}</p>
              <p style={{ fontSize: 10, color: '#55556A', margin: '0 0 8px' }}>{Math.round((totalLimite-totalFatura)/totalLimite*100)}% livre no total</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {cartoes.map(c => (
                  <div key={c.nome} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 10, color: '#55556A' }}>{c.nome}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#CCCCDD' }}>{fmt(c.limite - c.fatura)}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Tabela — ocupa o espaço restante */}
          <Card glowRgb="160,100,255" glowAt="top left" style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
            <div style={{ padding: '14px 18px 0', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>Lançamentos da Fatura</h3>
                <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '5px 12px', color: '#8888AA', fontSize: 10, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                  <Plus size={11} /> Lançamento
                </button>
              </div>
              <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {['Todos', 'Nubank', 'Itaú', 'Inter'].map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    padding: '7px 14px', fontSize: 11, fontWeight: tab === t ? 600 : 400,
                    color: tab === t ? '#fff' : '#55556A', background: 'none', border: 'none',
                    cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                    borderBottom: tab === t ? '2px solid rgba(255,255,255,0.3)' : '2px solid transparent',
                    marginBottom: -1,
                  }}>{t}</button>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.6fr 0.7fr 0.8fr', padding: '10px 18px', borderBottom: '1px solid rgba(255,255,255,0.04)', flexShrink: 0 }}>
              {['Data', 'Descrição', 'Cartão', 'Valor'].map(col => (
                <span key={col} style={{ fontSize: 9, fontWeight: 500, color: '#55556A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{col}</span>
              ))}
            </div>
            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              {filtrado.map((l, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.6fr 0.7fr 0.8fr', padding: '10px 18px', borderBottom: '1px solid rgba(255,255,255,0.03)', alignItems: 'center' }}>
                  <span style={{ fontSize: 10, color: '#55556A' }}>{l.data}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 7, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <l.Icon size={12} color="#55556A" />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 500, color: '#CCCCDD' }}>{l.desc}</span>
                  </div>
                  <span style={{ fontSize: 10, color: '#55556A' }}>{l.cartao}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#FF4D6D' }}>- {fmt(l.valor)}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── Coluna direita: cards físicos + ações ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>

          <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', flexShrink: 0 }}>Meus Cartões</span>

          {/* 3 cards físicos empilhados em coluna — estilo idêntico ao Contas */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto', minHeight: 0 }}>
            {cartoes.map(c => {
              const pct = Math.round(c.fatura / c.limite * 100)
              return (
                <div key={c.nome} style={{
                  clipPath: 'polygon(0 0, calc(50% - 20px) 0, calc(50% - 10px) 10px, calc(50% + 10px) 10px, calc(50% + 20px) 0, 100% 0, 100% 100%, 0 100%)',
                  borderRadius: 12, padding: '14px 14px 12px',
                  background: `radial-gradient(ellipse 90% 60% at top center, rgba(${c.rgb},0.3) 0%, #111118 70%)`,
                  border: `1px solid rgba(${c.rgb},0.3)`,
                  boxShadow: `0 6px 28px rgba(0,0,0,0.6), 0 0 0 1px rgba(${c.rgb},0.12)`,
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  position: 'relative', minHeight: 150, flexShrink: 0,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 26, height: 26, borderRadius: 7, background: c.cor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 10, color: '#fff' }}>{c.sigla}</div>
                      <div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.06em', display: 'block' }}>{c.nome.toUpperCase()}</span>
                        <span style={{ fontSize: 8, color: '#55556A' }}>{c.bandeira} · {c.titular}</span>
                      </div>
                    </div>
                    <Settings size={11} color="#55556A" />
                  </div>

                  <div>
                    <p style={{ fontSize: 8, color: '#55556A', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 3px' }}>FATURA</p>
                    <p style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: '0 0 6px' }}>{fmt(c.fatura)}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 8, color: '#55556A' }}>Limite {fmt(c.limite)} · Dia {c.venc}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: pct > 80 ? '#FF4D6D' : '#4ADE80' }}>{pct}%</span>
                    </div>
                    <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: pct > 80 ? 'rgba(255,77,109,0.6)' : 'rgba(74,222,128,0.5)', borderRadius: 99 }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Ações */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, flexShrink: 0 }}>
            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '10px 0', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#CCCCDD', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              <ArrowDownLeft size={13} /> Pagar Fatura
            </button>
            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '10px 0', borderRadius: 10, background: 'linear-gradient(90deg,#C44DFF,#9B59FF)', border: 'none', color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(196,77,255,0.3)' }}>
              <ArrowUpRight size={13} /> Ver Extrato
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
