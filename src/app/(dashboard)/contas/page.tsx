'use client'

import { useState, useEffect } from 'react'
import { getContas } from '@/lib/data'
import { Calendar, ChevronDown, Plus, ArrowUpRight, ArrowDownRight, Settings, TrendingUp, RefreshCw } from 'lucide-react'

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

const contas = [
  { nome: 'Nubank',   sigla: 'Nu', cor: '#820AD1', rgb: '130,10,209', saldo: 8240,  entrada: 5200, saida: 1800, pct: '2,4%', titular: 'Isa' },
  { nome: 'Itaú',    sigla: 'It', cor: '#EC7000', rgb: '236,112,0',  saldo: 7180,  entrada: 4800, saida: 2100, pct: '1,8%', titular: 'Fe'  },
  { nome: 'Inter',   sigla: 'In', cor: '#FF7A00', rgb: '255,122,0',  saldo: 12000, entrada: 3040, saida: 900,  pct: '3,2%', titular: 'Casal' },
  { nome: 'Bradesco',sigla: 'Br', cor: '#CC0000', rgb: '204,0,0',    saldo: 2100,  entrada: 0,    saida: 450,  pct: '0,5%', titular: 'Fe'  },
]

const movimentacoes = [
  { desc: 'Salário Isa',      data: '05/06', valor: 5200,  tipo: 'entrada', conta: 'Nubank'    },
  { desc: 'Aluguel',          data: '05/06', valor: -1800, tipo: 'saida',   conta: 'Inter'     },
  { desc: 'Salário Fe',       data: '05/06', valor: 4800,  tipo: 'entrada', conta: 'Itaú'      },
  { desc: 'Supermercado',     data: '07/06', valor: -320,  tipo: 'saida',   conta: 'Nubank'    },
  { desc: 'Freelance UI',     data: '10/06', valor: 1800,  tipo: 'entrada', conta: 'Nubank'    },
  { desc: 'Conta de Luz',     data: '12/06', valor: -240,  tipo: 'saida',   conta: 'Inter'     },
  { desc: 'Consultoria Dev',  data: '14/06', valor: 1240,  tipo: 'entrada', conta: 'Itaú'      },
  { desc: 'iFood',            data: '15/06', valor: -85,   tipo: 'saida',   conta: 'Nubank'    },
  { desc: 'CDB Rendimento',   data: '15/06', valor: 320,   tipo: 'entrada', conta: 'Inter'     },
  { desc: 'Posto Shell',      data: '17/06', valor: -180,  tipo: 'saida',   conta: 'Bradesco'  },
]

const totalSaldo   = contas.reduce((s, c) => s + c.saldo, 0)
const totalEntrada = contas.reduce((s, c) => s + c.entrada, 0)
const totalSaida   = contas.reduce((s, c) => s + c.saida, 0)

const TABS = ['Todas', 'Nubank', 'Itaú', 'Inter', 'Bradesco']

function fmt(v: number) {
  return 'R$ ' + Math.abs(v).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
}

export default function ContasPage() {
  const [tab, setTab] = useState('Todas')
  const [dbContas, setDbContas] = useState<any[]>([])

  useEffect(() => {
    getContas().then(d => { if (d.length > 0) setDbContas(d) })
  }, [])

  const contasAtivas = dbContas.length > 0
    ? dbContas.map((c: any) => ({ nome: c.nome, sigla: c.sigla, cor: c.cor, rgb: c.rgb, saldo: Number(c.saldo), entrada: 0, saida: 0, pct: '0%', titular: c.titular }))
    : contas
  const filtrado = tab === 'Todas' ? movimentacoes : movimentacoes.filter(m => m.conta === tab)

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 500, color: '#fff', margin: 0, lineHeight: 1.2 }}>Saldo em Conta</h2>
          <p style={{ fontSize: 11, color: '#55556A', margin: '2px 0 0' }}>Contas bancárias do casal · Junho 2026</p>
        </div>
        <div style={{ display: 'flex', gap: 7 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '5px 12px', color: '#8888AA', fontSize: 11, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            <Calendar size={12} color="#55556A" /> Junho 2026 <ChevronDown size={11} color="#55556A" />
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '5px 14px', color: '#CCCCDD', fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            <Plus size={12} /> Nova Conta
          </button>
        </div>
      </div>

      {/* Grid principal */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Coluna esquerda */}
        <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr', gap: 14, minHeight: 0 }}>

          {/* 3 cards de métrica */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr', gap: 14 }}>

            {/* Saldo Total */}
            <Card glowRgb="160,100,255" glowAt="top right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={lbl}>Saldo Total em Conta</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{fmt(totalSaldo)}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#4ADE80', background: 'rgba(74,222,128,0.1)', borderRadius: 20, padding: '2px 8px', flexShrink: 0 }}>▲ +3.1%</span>
              </div>
              <div style={hr} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 9, color: '#55556A', margin: '0 0 2px' }}>Entradas</p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#4ADE80', margin: 0 }}>{fmt(totalEntrada)}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 9, color: '#55556A', margin: '0 0 2px' }}>Saídas</p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#FF4D6D', margin: 0 }}>{fmt(totalSaida)}</p>
                </div>
              </div>
            </Card>

            {/* Maior saldo */}
            <Card glowRgb="74,222,128" glowAt="top left">
              <p style={lbl}>Maior Saldo</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: '#FF7A00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11, color: '#fff', flexShrink: 0 }}>In</div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#CCCCDD' }}>Inter</span>
              </div>
              <p style={{ fontSize: 24, fontWeight: 800, color: '#4ADE80', letterSpacing: '-0.02em', margin: '0 0 4px' }}>{fmt(12000)}</p>
              <p style={{ fontSize: 9, color: '#55556A', margin: 0 }}>40% do patrimônio total</p>
            </Card>

            {/* Variação do mês */}
            <Card glowRgb="160,100,255" glowAt="top right">
              <p style={lbl}>Variação do Mês</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: '#4ADE80', letterSpacing: '-0.02em', margin: '0 0 4px' }}>
                + {fmt(totalEntrada - totalSaida)}
              </p>
              <p style={{ fontSize: 9, color: '#55556A', margin: '0 0 10px' }}>saldo positivo em junho</p>
              <div style={hr} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 9, color: '#55556A' }}>Total entradas</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#CCCCDD' }}>{fmt(totalEntrada)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 9, color: '#55556A' }}>Total saídas</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#8888AA' }}>{fmt(totalSaida)}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Cards bancários — estilo notch como na Visão Geral */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {contas.map(c => (
              <div key={c.nome} className="card-bank-notch" style={{
                borderRadius: 12, padding: '14px 14px 12px',
                background: `radial-gradient(ellipse 90% 60% at top center, rgba(${c.rgb},0.3) 0%, #111118 70%)`,
                border: `1px solid rgba(${c.rgb},0.3)`,
                boxShadow: `0 6px 28px rgba(0,0,0,0.6), 0 0 0 1px rgba(${c.rgb},0.12)`,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                position: 'relative', minHeight: 140,
              }}>
                {/* Topo */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 7, background: c.cor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 10, color: '#fff', flexShrink: 0 }}>{c.sigla}</div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.07em' }}>{c.nome.toUpperCase()}</span>
                  </div>
                  <Settings size={11} color="#55556A" />
                </div>

                {/* Titular */}
                <p style={{ fontSize: 9, color: '#55556A', margin: 0 }}>{c.titular}</p>

                {/* Saldo */}
                <div>
                  <p style={{ fontSize: 8, color: '#55556A', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 3px' }}>SALDO</p>
                  <p style={{ fontSize: 15, fontWeight: 800, color: '#fff', margin: '0 0 6px' }}>{fmt(c.saldo)}</p>

                  {/* Mini entradas/saídas */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <ArrowUpRight size={9} color="#4ADE80" />
                      <span style={{ fontSize: 9, color: '#4ADE80', fontWeight: 600 }}>{fmt(c.entrada)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <ArrowDownRight size={9} color="#FF4D6D" />
                      <span style={{ fontSize: 9, color: '#FF4D6D', fontWeight: 600 }}>{fmt(c.saida)}</span>
                    </div>
                  </div>

                  {/* Variação */}
                  <span style={{ fontSize: 9, fontWeight: 600, color: '#4ADE80', background: 'rgba(74,222,128,0.1)', padding: '1px 5px', borderRadius: 20, display: 'inline-block', marginTop: 5 }}>
                    ▲ {c.pct}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Tabela de movimentações */}
          <Card glowRgb="160,100,255" glowAt="top left" style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
            <div style={{ padding: '14px 18px 0', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>Movimentações Recentes</h3>
                <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '5px 10px', color: '#8888AA', fontSize: 10, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                  <RefreshCw size={10} /> Atualizar
                </button>
              </div>
              <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {TABS.map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    padding: '7px 12px', fontSize: 11,
                    fontWeight: tab === t ? 600 : 400,
                    color: tab === t ? '#fff' : '#55556A',
                    background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                    borderBottom: tab === t ? '2px solid rgba(255,255,255,0.3)' : '2px solid transparent',
                    marginBottom: -1, transition: 'all 0.12s ease',
                  }}>{t}</button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.5fr 0.7fr 1fr', padding: '10px 18px', borderBottom: '1px solid rgba(255,255,255,0.04)', flexShrink: 0 }}>
              {['Data', 'Descrição', 'Conta', 'Valor'].map(col => (
                <span key={col} style={{ fontSize: 9, fontWeight: 500, color: '#55556A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{col}</span>
              ))}
            </div>

            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              {filtrado.map((m, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '0.7fr 1.5fr 0.7fr 1fr',
                  padding: '10px 18px', borderBottom: '1px solid rgba(255,255,255,0.03)', alignItems: 'center',
                }}>
                  <span style={{ fontSize: 10, color: '#55556A' }}>{m.data}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 7, background: m.tipo === 'entrada' ? 'rgba(74,222,128,0.08)' : 'rgba(255,77,109,0.08)', border: `1px solid ${m.tipo === 'entrada' ? 'rgba(74,222,128,0.15)' : 'rgba(255,77,109,0.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {m.tipo === 'entrada'
                        ? <ArrowUpRight size={12} color="#4ADE80" />
                        : <ArrowDownRight size={12} color="#FF4D6D" />
                      }
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 500, color: '#CCCCDD' }}>{m.desc}</span>
                  </div>
                  <span style={{ fontSize: 10, color: '#55556A' }}>{m.conta}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: m.tipo === 'entrada' ? '#4ADE80' : '#FF4D6D' }}>
                    {m.tipo === 'entrada' ? '+' : '-'} {fmt(m.valor)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}
