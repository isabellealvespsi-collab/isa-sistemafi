'use client'

import { useState } from 'react'
import { ChevronDown, Calendar, Plus, Home, Zap, Wifi, Car, Shield, Smartphone, GraduationCap, Heart } from 'lucide-react'

function Card({ children, glowRgb = '160,100,255', glowAt = 'top right', style = {} }: {
  children: React.ReactNode; glowRgb?: string; glowAt?: string; style?: React.CSSProperties
}) {
  return (
    <div className="card-hover" style={{
      background: `radial-gradient(ellipse 70% 60% at ${glowAt}, rgba(${glowRgb},0.11) 0%, transparent 55%), #0A0A0F`,
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 16, padding: 16,
      boxShadow: `inset 0 1px 0 rgba(${glowRgb},0.06), 0 8px 32px rgba(0,0,0,0.4)`,
      ...style,
    }}>
      {children}
    </div>
  )
}

/* Hierarquia de texto — igual à Visão Geral */
const lbl: React.CSSProperties = { fontSize: 9, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#55556A', margin: '0 0 6px' }
const hr:  React.CSSProperties = { height: 1, background: 'rgba(255,255,255,0.05)', margin: '10px 0' }

const TABS = ['Todas', 'Pagas', 'Pendentes', 'Vencidas']

const despesas = [
  { desc: 'Aluguel',          cat: 'Moradia',    dia: 5,  valor: 1800, pago: true,  Icon: Home,          pessoa: 'Casal' },
  { desc: 'Condomínio',       cat: 'Moradia',    dia: 10, valor: 450,  pago: false, Icon: Home,          pessoa: 'Casal' },
  { desc: 'Energia Elétrica', cat: 'Utilidades', dia: 12, valor: 240,  pago: false, Icon: Zap,           pessoa: 'Casal' },
  { desc: 'Internet',         cat: 'Utilidades', dia: 15, valor: 120,  pago: true,  Icon: Wifi,          pessoa: 'Casal' },
  { desc: 'Plano de Saúde',   cat: 'Saúde',      dia: 1,  valor: 680,  pago: true,  Icon: Heart,         pessoa: 'Casal' },
  { desc: 'Seguro Auto',      cat: 'Transporte', dia: 20, valor: 290,  pago: true,  Icon: Shield,        pessoa: 'Fe'    },
  { desc: 'Celular Isa',      cat: 'Telefone',   dia: 8,  valor: 85,   pago: false, Icon: Smartphone,    pessoa: 'Isa'   },
  { desc: 'Celular Fe',       cat: 'Telefone',   dia: 8,  valor: 85,   pago: true,  Icon: Smartphone,    pessoa: 'Fe'    },
  { desc: 'Curso Online',     cat: 'Educação',   dia: 25, valor: 97,   pago: false, Icon: GraduationCap, pessoa: 'Isa'   },
  { desc: 'Combustível',      cat: 'Transporte', dia: 28, valor: 300,  pago: false, Icon: Car,           pessoa: 'Casal' },
]

const total     = despesas.reduce((s, d) => s + d.valor, 0)
const pagas     = despesas.filter(d => d.pago)
const pendentes = despesas.filter(d => !d.pago)
const totalPago = pagas.reduce((s, d) => s + d.valor, 0)
const totalPend = pendentes.reduce((s, d) => s + d.valor, 0)
const pctPago   = Math.round(totalPago / total * 100)

function fmt(v: number) { return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }

export default function DespesasPage() {
  const [tab, setTab] = useState('Todas')

  const filtrado =
    tab === 'Pagas'     ? despesas.filter(d => d.pago) :
    tab === 'Pendentes' ? despesas.filter(d => !d.pago && d.dia >= 12) :
    tab === 'Vencidas'  ? despesas.filter(d => !d.pago && d.dia < 12) :
    despesas

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 500, color: '#fff', margin: 0, lineHeight: 1.2 }}>Despesas Fixas</h2>
          <p style={{ fontSize: 11, color: '#55556A', margin: '2px 0 0' }}>Contas recorrentes do casal · Junho 2026</p>
        </div>
        <div style={{ display: 'flex', gap: 7 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '5px 12px', color: '#8888AA', fontSize: 11, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            <Calendar size={12} color="#55556A" /> Junho 2026 <ChevronDown size={11} color="#55556A" />
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '5px 14px', color: '#CCCCDD', fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            <Plus size={12} /> Nova Despesa
          </button>
        </div>
      </div>

      {/* Grid principal */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Coluna esquerda */}
        <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: 14, minHeight: 0 }}>

          {/* 3 cards de métrica */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr', gap: 14 }}>

            {/* Total */}
            <Card glowRgb="255,77,109" glowAt="top right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={lbl}>Total · Jun 2026</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                {/* Número principal = vermelho coral (despesa) */}
                <span style={{ fontSize: 26, fontWeight: 800, color: '#FF4D6D', letterSpacing: '-0.02em', lineHeight: 1 }}>{fmt(total)}</span>
                <span style={{ fontSize: 10, color: '#8888AA', background: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: '2px 8px' }}>▲ +5.2%</span>
              </div>
              <div style={hr} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 9, color: '#55556A' }}>Pago · {pctPago}%</span>
                  <span style={{ fontSize: 9, color: '#55556A' }}>Pendente · {100 - pctPago}%</span>
                </div>
                <div style={{ height: 4, borderRadius: 99, overflow: 'hidden', display: 'flex', background: 'rgba(255,255,255,0.05)' }}>
                  <div style={{ width: `${pctPago}%`, background: 'rgba(74,222,128,0.45)' }} />
                  <div style={{ width: `${100 - pctPago}%`, background: 'rgba(255,77,109,0.3)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#CCCCDD' }}>{fmt(totalPago)}</span>
                  <span style={{ fontSize: 11, fontWeight: 500, color: '#8888AA' }}>{fmt(totalPend)}</span>
                </div>
              </div>
            </Card>

            {/* Status */}
            <Card glowRgb="74,222,128" glowAt="top left">
              <p style={lbl}>Status de Pagamento</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: '#4ADE80', letterSpacing: '-0.02em' }}>{pagas.length}</span>
                <span style={{ fontSize: 14, fontWeight: 400, color: '#55556A' }}>/ {despesas.length} pagas</span>
              </div>
              <p style={{ fontSize: 10, color: '#55556A', margin: '0 0 10px' }}>{pctPago}% concluído este mês</p>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden', marginBottom: 10 }}>
                <div style={{ height: '100%', width: `${pctPago}%`, background: 'rgba(255,255,255,0.25)', borderRadius: 99 }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 10, color: '#55556A' }}>Valor pago</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#CCCCDD' }}>{fmt(totalPago)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 10, color: '#55556A' }}>Restante</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#8888AA' }}>{fmt(totalPend)}</span>
                </div>
              </div>
            </Card>

            {/* Próximos */}
            <Card glowRgb="245,158,11" glowAt="top right">
              <p style={lbl}>Em Aberto</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: '#F59E0B', letterSpacing: '-0.02em' }}>{pendentes.length}</span>
                <span style={{ fontSize: 14, fontWeight: 400, color: '#55556A' }}>contas</span>
              </div>
              <p style={{ fontSize: 10, color: '#55556A', margin: '0 0 10px' }}>ainda pendentes este mês</p>
              <div style={hr} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {pendentes.slice(0, 3).map(d => (
                  <div key={d.desc} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 10, color: '#55556A' }}>Dia {d.dia} · {d.desc}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#CCCCDD' }}>{fmt(d.valor)}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Tabela */}
          <Card glowRgb="160,100,255" glowAt="top left" style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
            <div style={{ padding: '14px 18px 0', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>Contas Recorrentes</h3>
                <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '5px 12px', color: '#8888AA', fontSize: 10, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                  <Plus size={11} /> Adicionar
                </button>
              </div>
              <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {TABS.map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    padding: '7px 14px', fontSize: 11,
                    fontWeight: tab === t ? 600 : 400,
                    color: tab === t ? '#fff' : '#55556A',
                    background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                    borderBottom: tab === t ? '2px solid rgba(255,255,255,0.3)' : '2px solid transparent',
                    marginBottom: -1, transition: 'all 0.12s ease',
                  }}>{t}</button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr 0.6fr 0.9fr 0.7fr', padding: '10px 18px', borderBottom: '1px solid rgba(255,255,255,0.04)', flexShrink: 0 }}>
              {['Despesa', 'Categoria', 'Dia', 'Valor', 'Status'].map(col => (
                <span key={col} style={{ fontSize: 9, fontWeight: 500, color: '#55556A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{col}</span>
              ))}
            </div>

            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              {filtrado.map((item, idx) => (
                <div key={idx} style={{
                  display: 'grid', gridTemplateColumns: '1.4fr 0.8fr 0.6fr 0.9fr 0.7fr',
                  padding: '11px 18px', borderBottom: '1px solid rgba(255,255,255,0.03)', alignItems: 'center',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 7, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <item.Icon size={12} color="#55556A" />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 500, color: '#CCCCDD' }}>{item.desc}</span>
                  </div>
                  <span style={{ fontSize: 10, color: '#55556A' }}>{item.cat}</span>
                  <span style={{ fontSize: 10, color: '#55556A' }}>Dia {item.dia}</span>
                  {/* Valor = destaque principal da linha */}
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{fmt(item.valor)}</span>
                  {/* Status com cor sutil mas legível */}
                  <span style={{
                    fontSize: 9, fontWeight: 600,
                    color: item.pago ? '#4ADE80' : '#FF4D6D',
                    background: item.pago ? 'rgba(74,222,128,0.08)' : 'rgba(255,77,109,0.08)',
                    padding: '3px 8px', borderRadius: 20, display: 'inline-block',
                  }}>
                    {item.pago ? 'Pago' : 'Pendente'}
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
