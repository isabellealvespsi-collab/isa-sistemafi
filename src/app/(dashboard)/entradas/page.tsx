'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, Calendar, Plus, Briefcase, Laptop, TrendingUp, ArrowUpRight } from 'lucide-react'
import BarChart from '@/components/dashboard/BarChart'
import { getEntradas } from '@/lib/data'

/* ─── Card idêntico ao da Visão Geral ─── */
function Card({ children, glowRgb = '74,222,128', glowAt = 'top right', style = {} }: {
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

const lbl: React.CSSProperties = { fontSize: 9, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3A3A50', margin: '0 0 6px' }
const pill = (c: string, bg: string): React.CSSProperties => ({ background: bg, color: c, borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 2, flexShrink: 0 })
const hr: React.CSSProperties = { height: 1, background: 'rgba(255,255,255,0.04)', margin: '10px 0' }
/* Texto secundário super apagado */
const muted = { color: '#3A3A50' } as React.CSSProperties
const soft  = { color: '#6A6A85' } as React.CSSProperties

const TABS = ['Todas', 'Salário', 'Freelance', 'Rendimento', 'Outros']

const historico = [
  { tipo: 'Salário',    desc: 'Salário Isa',       data: '05/06/2026', valor: 5200, pessoa: 'Isa', cor: '#4ADE80', Icon: Briefcase    },
  { tipo: 'Salário',    desc: 'Salário Fe',         data: '05/06/2026', valor: 4800, pessoa: 'Fe',  cor: '#4ADE80', Icon: Briefcase    },
  { tipo: 'Freelance',  desc: 'Projeto UI Design',  data: '10/06/2026', valor: 1800, pessoa: 'Isa', cor: '#D966FF', Icon: Laptop       },
  { tipo: 'Freelance',  desc: 'Consultoria Dev',    data: '14/06/2026', valor: 1240, pessoa: 'Fe',  cor: '#D966FF', Icon: Laptop       },
  { tipo: 'Rendimento', desc: 'CDB Nubank',         data: '15/06/2026', valor: 320,  pessoa: 'Isa', cor: '#7B5EA7', Icon: TrendingUp   },
  { tipo: 'Freelance',  desc: 'Landing Page',       data: '20/06/2026', valor: 900,  pessoa: 'Isa', cor: '#D966FF', Icon: Laptop       },
  { tipo: 'Rendimento', desc: 'Tesouro Direto',     data: '22/06/2026', valor: 180,  pessoa: 'Fe',  cor: '#7B5EA7', Icon: TrendingUp   },
  { tipo: 'Outros',     desc: 'Venda Marketplace',  data: '24/06/2026', valor: 350,  pessoa: 'Fe',  cor: '#F59E0B', Icon: ArrowUpRight  },
]

const fontes = [
  { label: 'Salário',    cor: '#4ADE80' },
  { label: 'Freelance',  cor: '#D966FF' },
  { label: 'Rendimento', cor: '#7B5EA7' },
  { label: 'Outros',     cor: '#F59E0B' },
]

const total    = historico.reduce((s, i) => s + i.valor, 0)
const totalIsa = historico.filter(i => i.pessoa === 'Isa').reduce((s, i) => s + i.valor, 0)
const totalFe  = historico.filter(i => i.pessoa === 'Fe').reduce((s, i) => s + i.valor, 0)

const corRgb = (cor: string) =>
  cor === '#4ADE80' ? '74,222,128' :
  cor === '#D966FF' ? '217,102,255' :
  cor === '#7B5EA7' ? '123,94,167' : '245,158,11'

function fmt(v: number) {
  return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
}

export default function EntradasPage() {
  const [tab, setTab] = useState('Todas')
  const [dbEntradas, setDbEntradas] = useState<any[]>([])

  useEffect(() => {
    const now = new Date()
    getEntradas(now.getMonth()+1, now.getFullYear()).then(d => { if (d.length > 0) setDbEntradas(d) })
  }, [])

  // Usa dados do banco se existirem, senão usa mock
  const fonte = dbEntradas.length > 0
    ? dbEntradas.map((e: any) => ({ tipo: e.tipo || 'Salário', desc: e.descricao, data: e.data?.slice(5).split('-').reverse().join(' Jun'), valor: e.valor, pessoa: e.titular, cor: '#4ADE80', Icon: Briefcase, status: 'Recebido' }))
    : historico

  const filtrado = tab === 'Todas' ? fonte : fonte.filter((i: any) => i.tipo === tab)

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 500, color: '#fff', margin: 0, lineHeight: 1.2 }}>Entradas</h2>
          <p style={{ fontSize: 11, color: '#55556A', margin: '2px 0 0' }}>Receitas e fontes de renda do casal</p>
        </div>
        <div style={{ display: 'flex', gap: 7 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '5px 12px', color: '#8888AA', fontSize: 11, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            <Calendar size={12} color="#55556A" /> Junho 2026 <ChevronDown size={11} color="#55556A" />
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.22)', borderRadius: 20, padding: '5px 14px', color: '#4ADE80', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            <Plus size={12} /> Nova Entrada
          </button>
        </div>
      </div>

      {/* ── Conteúdo principal em coluna única ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* 4 cards na mesma linha: Total + Isa + Fe + BarChart */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.4fr', gap: 14, alignItems: 'start' }}>

            {/* Total */}
            <Card glowRgb="74,222,128" glowAt="top right" style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={lbl}>Total de Entradas · Jun</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{fmt(total)}</span>
                <span style={pill('#4ADE80', 'rgba(74,222,128,0.12)')}>▲ +12.4%</span>
              </div>
              <div style={hr} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 9, ...muted }}>Isa · {Math.round(totalIsa/total*100)}%</span>
                  <span style={{ fontSize: 9, ...muted }}>Fe · {Math.round(totalFe/total*100)}%</span>
                </div>
                <div style={{ height: 4, borderRadius: 99, overflow: 'hidden', display: 'flex', background: 'rgba(255,255,255,0.04)' }}>
                  <div style={{ width: `${totalIsa/total*100}%`, background: 'rgba(74,222,128,0.5)' }} />
                  <div style={{ width: `${totalFe/total*100}%`,  background: 'rgba(196,77,255,0.4)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(74,222,128,0.7)' }}>{fmt(totalIsa)}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(196,77,255,0.7)' }}>{fmt(totalFe)}</span>
                </div>
              </div>
            </Card>

            {/* Isabelle */}
            <Card glowRgb="74,222,128" glowAt="top left">
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>🙋‍♀️</div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#fff', margin: 0 }}>Isabelle</p>
                  <p style={{ fontSize: 9, ...muted, margin: 0 }}>{Math.round(totalIsa/total*100)}% do total</p>
                </div>
              </div>
              {/* Número principal — destaque máximo */}
              <p style={{ fontSize: 24, fontWeight: 800, color: '#4ADE80', letterSpacing: '-0.02em', margin: '0 0 10px' }}>{fmt(totalIsa)}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {fontes.map(f => {
                  const v = historico.filter(i => i.pessoa === 'Isa' && i.tipo === f.label).reduce((s, i) => s + i.valor, 0)
                  if (!v) return null
                  return (
                    <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      {/* Label apagada */}
                      <span style={{ fontSize: 10, ...muted }}>{f.label}</span>
                      {/* Valor secundário quase branco mas fraco */}
                      <span style={{ fontSize: 10, fontWeight: 500, color: '#5A5A72' }}>{fmt(v)}</span>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Felipe */}
            <Card glowRgb="196,77,255" glowAt="top right">
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>🙋‍♂️</div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#fff', margin: 0 }}>Felipe</p>
                  <p style={{ fontSize: 9, ...muted, margin: 0 }}>{Math.round(totalFe/total*100)}% do total</p>
                </div>
              </div>
              <p style={{ fontSize: 24, fontWeight: 800, color: '#D966FF', letterSpacing: '-0.02em', margin: '0 0 10px' }}>{fmt(totalFe)}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {fontes.map(f => {
                  const v = historico.filter(i => i.pessoa === 'Fe' && i.tipo === f.label).reduce((s, i) => s + i.valor, 0)
                  if (!v) return null
                  return (
                    <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 10, ...muted }}>{f.label}</span>
                      <span style={{ fontSize: 10, fontWeight: 500, color: '#5A5A72' }}>{fmt(v)}</span>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* BarChart — 4º card na mesma linha */}
            <Card glowRgb="120,70,220" glowAt="top right" style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={lbl}>Crescimento Mensal</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 2px', letterSpacing: '-0.02em' }}>{fmt(total)}</p>
              <span style={{ ...pill('#4ADE80', 'rgba(74,222,128,0.12)'), marginBottom: 10, alignSelf: 'flex-start' }}>▲ +12.4%</span>
              <div style={{ flex: 1 }}>
                <BarChart />
              </div>
            </Card>
          </div>

          {/* Tabela — full width */}
          <Card glowRgb="74,222,128" glowAt="top left" style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>

            {/* Header + Tabs */}
            <div style={{ padding: '14px 18px 0', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>Histórico de Entradas</h3>
                <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: 20, padding: '5px 12px', color: '#4ADE80', fontSize: 10, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                  <Plus size={11} /> Adicionar
                </button>
              </div>
              <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {TABS.map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    padding: '7px 14px', fontSize: 11, fontWeight: tab === t ? 600 : 400,
                    color: tab === t ? '#fff' : '#55556A',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    borderBottom: tab === t ? '2px solid #4ADE80' : '2px solid transparent',
                    marginBottom: -1, transition: 'all 0.12s ease',
                  }}>{t}</button>
                ))}
              </div>
            </div>

            {/* Cabeçalho colunas */}
            <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.4fr 0.8fr 0.7fr 1fr', padding: '10px 18px', borderBottom: '1px solid rgba(255,255,255,0.04)', flexShrink: 0 }}>
              {['Data', 'Descrição', 'Tipo', 'Titular', 'Valor'].map(col => (
                <span key={col} style={{ fontSize: 9, fontWeight: 500, color: '#55556A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{col}</span>
              ))}
            </div>

            {/* Linhas */}
            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              {filtrado.map((item, idx) => {
                const rgb = corRgb(item.cor)
                return (
                  <div key={idx} style={{
                    display: 'grid', gridTemplateColumns: '0.9fr 1.4fr 0.8fr 0.7fr 1fr',
                    padding: '11px 18px', borderBottom: '1px solid rgba(255,255,255,0.03)',
                    alignItems: 'center',
                  }}>
                    {/* Data — super muted */}
                    <span style={{ fontSize: 10, color: '#3A3A50' }}>{item.data}</span>
                    {/* Descrição — principal da linha, peso médio */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 24, height: 24, borderRadius: 7, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <item.Icon size={11} color="#4A4A62" />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 500, color: '#8888A0' }}>{item.desc}</span>
                    </div>
                    {/* Tipo — quase invisível */}
                    <span style={{ fontSize: 10, color: '#3A3A50' }}>{item.tipo}</span>
                    {/* Titular — discreto */}
                    <span style={{ fontSize: 10, color: '#4A4A62' }}>{item.pessoa}</span>
                    {/* Valor — ÚNICO elemento colorido da linha */}
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#4ADE80' }}>+{fmt(item.valor)}</span>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
