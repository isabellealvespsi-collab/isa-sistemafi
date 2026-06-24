'use client'

import { useEffect, useState } from 'react'
import { Calendar, ChevronDown, Plus, Heart, Home, Car, Plane, GraduationCap, TrendingUp, Target } from 'lucide-react'
import { getMetas } from '@/lib/data'

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

const metas = [
  { nome: 'Casamento',       Icon: Heart,         meta: 100000, atual: 45000, prazo: 'Dez 2026', cor: '#D966FF', rgb: '217,102,255', titular: 'Casal'  },
  { nome: 'Casa Própria',    Icon: Home,          meta: 80000,  atual: 12000, prazo: 'Dez 2028', cor: '#60A5FA', rgb: '96,165,250',  titular: 'Casal'  },
  { nome: 'Carro Novo',      Icon: Car,           meta: 45000,  atual: 18000, prazo: 'Jun 2027', cor: '#F59E0B', rgb: '245,158,11',  titular: 'Fe'     },
  { nome: 'Viagem Europa',   Icon: Plane,         meta: 20000,  atual: 8500,  prazo: 'Jan 2027', cor: '#4ADE80', rgb: '74,222,128',  titular: 'Casal'  },
  { nome: 'MBA Isa',         Icon: GraduationCap, meta: 15000,  atual: 4200,  prazo: 'Mar 2027', cor: '#FB923C', rgb: '251,146,60',  titular: 'Isa'    },
  { nome: 'Reserva Emerg.',  Icon: TrendingUp,    meta: 30000,  atual: 22000, prazo: 'Set 2026', cor: '#34D399', rgb: '52,211,153',  titular: 'Casal'  },
]

const totalMeta   = metas.reduce((s, m) => s + m.meta, 0)
const totalAtual  = metas.reduce((s, m) => s + m.atual, 0)
const concluidas  = metas.filter(m => m.atual >= m.meta).length
const emAndamento = metas.filter(m => m.atual < m.meta).length
const pctGeral    = Math.round(totalAtual / totalMeta * 100)

function fmt(v: number) { return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }
function fmtK(v: number) { return v >= 1000 ? 'R$' + (v/1000).toFixed(0) + 'k' : 'R$' + v }

export default function MetasPage() {
  const [dbMetas, setDbMetas] = useState<any[]>([])
  useEffect(() => { getMetas().then(d => { if (d.length > 0) setDbMetas(d) }) }, [])
  const metasAtivas = dbMetas.length > 0
    ? dbMetas.map((m: any) => ({ ...m, nome: m.nome, meta: Number(m.valor_meta), atual: Number(m.valor_atual), prazo: m.prazo?.slice(0,7), cor: m.cor || '#D966FF', rgb: '217,102,255', titular: m.titular, Icon: Heart }))
    : metas
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 500, color: '#fff', margin: 0 }}>Metas</h2>
          <p style={{ fontSize: 11, color: '#55556A', margin: '2px 0 0' }}>Objetivos financeiros do casal</p>
        </div>
        <div style={{ display: 'flex', gap: 7 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '5px 12px', color: '#8888AA', fontSize: 11, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            <Calendar size={12} color="#55556A" /> 2026 <ChevronDown size={11} color="#55556A" />
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '5px 14px', color: '#CCCCDD', fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            <Plus size={12} /> Nova Meta
          </button>
        </div>
      </div>

      <div style={{ minHeight: 0, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 14 }}>

        {/* Coluna esquerda */}
        <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: 14, minHeight: 0 }}>

          {/* 3 cards de métrica */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr', gap: 14 }}>

            <Card glowRgb="160,100,255" glowAt="top right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={lbl}>Progresso Geral</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{pctGeral}%</span>
                <span style={{ fontSize: 10, color: '#4ADE80', background: 'rgba(74,222,128,0.1)', borderRadius: 20, padding: '2px 8px' }}>▲ +3% mês</span>
              </div>
              <div style={hr} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 9, color: '#55556A' }}>Acumulado</span>
                  <span style={{ fontSize: 9, color: '#55556A' }}>Total</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pctGeral}%`, background: 'linear-gradient(90deg,#C44DFF,#9B59FF)', boxShadow: '0 0 8px rgba(196,77,255,0.4)', borderRadius: 99 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#CCCCDD' }}>{fmt(totalAtual)}</span>
                  <span style={{ fontSize: 11, fontWeight: 500, color: '#8888AA' }}>{fmt(totalMeta)}</span>
                </div>
              </div>
            </Card>

            <Card glowRgb="74,222,128" glowAt="top left">
              <p style={lbl}>Em Andamento</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: '#4ADE80', letterSpacing: '-0.02em' }}>{emAndamento}</span>
                <span style={{ fontSize: 14, color: '#55556A' }}>metas</span>
              </div>
              <p style={{ fontSize: 10, color: '#55556A', margin: '0 0 10px' }}>objetivos em progresso</p>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.round(emAndamento/metas.length*100)}%`, background: 'rgba(74,222,128,0.45)', borderRadius: 99 }} />
              </div>
            </Card>

            <Card glowRgb="217,102,255" glowAt="top right">
              <p style={lbl}>Próxima Conquista</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#D966FF', letterSpacing: '-0.01em', margin: '0 0 4px' }}>Reserva Emerg.</p>
              <p style={{ fontSize: 10, color: '#55556A', margin: '0 0 8px' }}>73% concluída · Set 2026</p>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden', marginBottom: 8 }}>
                <div style={{ height: '100%', width: '73%', background: 'rgba(217,102,255,0.5)', borderRadius: 99 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, color: '#55556A' }}>Falta</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#CCCCDD' }}>{fmt(30000 - 22000)}</span>
              </div>
            </Card>
          </div>

          {/* Grid de metas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, alignContent: 'start', overflowY: 'auto', minHeight: 0 }}>
            {metas.map(m => {
              const pct     = Math.min(Math.round(m.atual / m.meta * 100), 100)
              const falta   = m.meta - m.atual
              const concl   = pct >= 100
              return (
                <div key={m.nome} style={{
                  background: `radial-gradient(ellipse 80% 60% at top right, rgba(${m.rgb},0.1) 0%, transparent 55%), #0A0A0F`,
                  border: `1px solid rgba(${m.rgb},0.15)`,
                  borderRadius: 14, padding: 16,
                  display: 'flex', flexDirection: 'column', gap: 10,
                }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 9, background: `rgba(${m.rgb},0.15)`, border: `1px solid rgba(${m.rgb},0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <m.Icon size={15} color={m.cor} />
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#CCCCDD', margin: 0 }}>{m.nome}</p>
                        <p style={{ fontSize: 9, color: '#55556A', margin: 0 }}>{m.titular} · {m.prazo}</p>
                      </div>
                    </div>
                    {concl && <span style={{ fontSize: 9, fontWeight: 700, color: '#4ADE80', background: 'rgba(74,222,128,0.1)', padding: '2px 7px', borderRadius: 20 }}>✓ Concluída</span>}
                  </div>

                  {/* Valores */}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: 9, color: '#55556A', margin: '0 0 2px' }}>Acumulado</p>
                      <p style={{ fontSize: 16, fontWeight: 800, color: m.cor, margin: 0 }}>{fmtK(m.atual)}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: 9, color: '#55556A', margin: '0 0 2px' }}>Meta</p>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#8888AA', margin: 0 }}>{fmtK(m.meta)}</p>
                    </div>
                  </div>

                  {/* Barra + % */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: 9, color: '#55556A' }}>Falta {fmtK(Math.max(0, falta))}</span>
                      <span style={{ fontSize: 12, fontWeight: 800, color: m.cor }}>{pct}%</span>
                    </div>
                    <div style={{ height: 5, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${pct}%`, borderRadius: 99,
                        background: concl ? '#4ADE80' : m.cor,
                        opacity: 0.7,
                        boxShadow: `0 0 6px ${m.cor}60`,
                        transition: 'width 0.6s ease',
                      }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Coluna direita */}
        <Card glowRgb="160,100,255" glowAt="top right" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ flexShrink: 0, marginBottom: 14 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: '0 0 2px' }}>Ranking de Progresso</h3>
            <p style={{ fontSize: 10, color: '#55556A', margin: 0 }}>Metas mais avançadas</p>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', minHeight: 0 }}>
            {[...metas].sort((a, b) => (b.atual/b.meta) - (a.atual/a.meta)).map((m, i) => {
              const pct = Math.min(Math.round(m.atual / m.meta * 100), 100)
              return (
                <div key={m.nome}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ fontSize: 10, color: '#3A3A50', width: 14 }}>#{i+1}</span>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: m.cor, flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: '#CCCCDD' }}>{m.nome}</span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: m.cor }}>{pct}%</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 99 }}>
                    <div style={{ height: '100%', width: `${pct}%`, borderRadius: 99, background: m.cor, opacity: 0.6 }} />
                  </div>
                </div>
              )
            })}
          </div>

          <div style={hr} />

          <div style={{ flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(196,77,255,0.06)', border: '1px solid rgba(196,77,255,0.12)', borderRadius: 10, padding: '10px 12px' }}>
              <Target size={14} color="#C44DFF" />
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#fff', margin: 0 }}>Meta do mês</p>
                <p style={{ fontSize: 9, color: '#55556A', margin: '2px 0 0' }}>Poupar R$ 2.000 no total</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
