'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Search, X, Check, Upload, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Titular = 'Isa' | 'Fe' | 'Casal'

const CATEGORIAS = [
  'Moradia', 'Alimentação', 'Transporte', 'Saúde',
  'Lazer', 'Mercado', 'iFood', 'Educação',
  'Despesas Fixas', 'Investimentos', 'UBER', 'PETS',
  'Farmácia', 'Presentes', 'Dívidas', 'Outros',
]
const CONTAS = ['Nubank', 'Itaú', 'Inter', 'Bradesco']

interface Saida {
  id: string
  data: string
  descricao: string
  categoria: string
  titular: Titular
  valor: number
  conta: string
}

const corTitular = (t: Titular) => t === 'Isa' ? '#4ADE80' : t === 'Fe' ? '#C44DFF' : '#8888AA'
function fmt(v: number) { return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }
function fmtData(d: string) { const [y,m,day] = d.split('-'); return `${day}/${m}/${y}` }

/* ── Modal ── */
function NovoModal({ onSave, onClose }: { onSave: (s: Omit<Saida,'id'>) => Promise<void>; onClose: () => void }) {
  const [form, setForm] = useState({ data: new Date().toISOString().split('T')[0], descricao: '', categoria: CATEGORIAS[0], titular: 'Isa' as Titular, valor: '', conta: CONTAS[0] })
  const [saving, setSaving] = useState(false)
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const inputStyle: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '9px 12px', color: '#fff', fontSize: 12, fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box' }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: '#12121C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 28, width: 460, boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', margin: 0 }}>Nova Saída</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#55556A', cursor: 'pointer', padding: 0 }}><X size={18} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ fontSize: 9, color: '#55556A', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 5 }}>Data</label>
              <input type="date" value={form.data} onChange={e => set('data', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 9, color: '#55556A', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 5 }}>Valor (R$)</label>
              <input type="number" placeholder="0,00" value={form.valor} onChange={e => set('valor', e.target.value)} style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 9, color: '#55556A', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 5 }}>Descrição</label>
            <input type="text" placeholder="Ex: Supermercado Extra" value={form.descricao} onChange={e => set('descricao', e.target.value)} style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ fontSize: 9, color: '#55556A', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 5 }}>Categoria</label>
              <select value={form.categoria} onChange={e => set('categoria', e.target.value)} style={{ ...inputStyle, cursor: 'pointer', background: '#1A1A28' }}>
                {CATEGORIAS.map(c => <option key={c} value={c} style={{ background: '#1A1A28' }}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 9, color: '#55556A', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 5 }}>Conta</label>
              <select value={form.conta} onChange={e => set('conta', e.target.value)} style={{ ...inputStyle, cursor: 'pointer', background: '#1A1A28' }}>
                {CONTAS.map(c => <option key={c} value={c} style={{ background: '#1A1A28' }}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={{ fontSize: 9, color: '#55556A', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>De quem saiu</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {(['Isa', 'Fe', 'Casal'] as Titular[]).map(t => (
                <button key={t} onClick={() => set('titular', t)} style={{
                  padding: '9px 0', borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  background: form.titular === t ? `rgba(${t==='Isa'?'74,222,128':t==='Fe'?'196,77,255':'136,136,170'},0.12)` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${form.titular === t ? corTitular(t)+'40' : 'rgba(255,255,255,0.07)'}`,
                  color: form.titular === t ? corTitular(t) : '#55556A',
                  fontFamily: 'Inter, sans-serif',
                }}>{t}</button>
              ))}
            </div>
          </div>
          <button
            disabled={saving || !form.descricao || !form.valor}
            onClick={async () => {
              setSaving(true)
              await onSave({ data: form.data, descricao: form.descricao, categoria: form.categoria, titular: form.titular, valor: parseFloat(form.valor), conta: form.conta })
              setSaving(false)
              onClose()
            }}
            style={{ width: '100%', padding: 12, marginTop: 4, background: saving ? 'rgba(196,77,255,0.4)' : 'linear-gradient(90deg,#C44DFF,#9B59FF)', border: 'none', borderRadius: 11, color: '#fff', fontSize: 13, fontWeight: 700, cursor: saving ? 'wait' : 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 20px rgba(196,77,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {saving ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Check size={14} />}
            {saving ? 'Salvando...' : 'Salvar Saída'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Página principal ── */
export default function ExtratoPage() {
  const supabase = createClient()
  const [saidas, setSaidas]               = useState<Saida[]>([])
  const [loading, setLoading]             = useState(true)
  const [modalAberto, setModalAberto]     = useState(false)
  const [busca, setBusca]                 = useState('')
  const [filtroTitular, setFiltroTitular] = useState('Todos')
  const [filtroCateg, setFiltroCateg]     = useState('Todas')

  /* Buscar dados do Supabase */
  const carregar = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('saidas')
      .select('*')
      .order('data', { ascending: false })
    if (!error && data) setSaidas(data)
    setLoading(false)
  }, [supabase])

  useEffect(() => { carregar() }, [carregar])

  /* Salvar nova saída no Supabase */
  async function adicionarSaida(nova: Omit<Saida,'id'>) {
    const { data, error } = await supabase.from('saidas').insert([nova]).select().single()
    if (!error && data) setSaidas(prev => [data, ...prev])
  }

  const totalGeral = saidas.reduce((s, l) => s + l.valor, 0)
  const totalIsa   = saidas.filter(l => l.titular === 'Isa').reduce((s, l) => s + l.valor, 0)
  const totalFe    = saidas.filter(l => l.titular === 'Fe').reduce((s, l) => s + l.valor, 0)
  const totalCasal = saidas.filter(l => l.titular === 'Casal').reduce((s, l) => s + l.valor, 0)

  const categsUsadas = ['Todas', ...Array.from(new Set(saidas.map(s => s.categoria)))]

  const filtrado = saidas
    .filter(l => !busca || l.descricao.toLowerCase().includes(busca.toLowerCase()) || l.categoria.toLowerCase().includes(busca.toLowerCase()))
    .filter(l => filtroTitular === 'Todos' || l.titular === filtroTitular)
    .filter(l => filtroCateg === 'Todas' || l.categoria === filtroCateg)

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>

      {modalAberto && <NovoModal onSave={adicionarSaida} onClose={() => setModalAberto(false)} />}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 500, color: '#fff', margin: 0 }}>Extrato Bancário</h2>
          <p style={{ fontSize: 11, color: '#55556A', margin: '2px 0 0' }}>
            Registro de saídas · {saidas.length} lançamentos · atualiza todas as páginas
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '5px 14px', color: '#8888AA', fontSize: 11, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            <Upload size={12} /> Importar Extrato
          </button>
          <button onClick={() => setModalAberto(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'linear-gradient(90deg,#C44DFF,#9B59FF)', border: 'none', borderRadius: 20, padding: '5px 16px', color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(196,77,255,0.3)' }}>
            <Plus size={12} /> Nova Saída
          </button>
        </div>
      </div>

      {/* 4 cards resumo */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: 14, flexShrink: 0 }}>
        {[
          { l: 'Total de Saídas', v: totalGeral, cor: '#FF4D6D', rgb: '255,77,109', side: 'top right' },
          { l: 'Saídas da Isa',   v: totalIsa,   cor: '#4ADE80', rgb: '74,222,128', side: 'top left'  },
          { l: 'Saídas do Fe',    v: totalFe,    cor: '#C44DFF', rgb: '196,77,255', side: 'top right' },
          { l: 'Gastos do Casal', v: totalCasal, cor: '#8888AA', rgb: '136,136,170',side: 'top left'  },
        ].map(({ l, v, cor, rgb, side }) => (
          <div key={l} style={{ background: `radial-gradient(ellipse 70% 60% at ${side}, rgba(${rgb},0.13) 0%, transparent 55%), #0A0A0F`, border: `1px solid rgba(${rgb},0.13)`, borderRadius: 16, padding: 14, boxShadow: `inset 0 1px 0 rgba(${rgb},0.07), 0 8px 32px rgba(0,0,0,0.4)` }}>
            <p style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#55556A', margin: '0 0 8px' }}>{l}</p>
            <p style={{ fontSize: 22, fontWeight: 800, color: cor, letterSpacing: '-0.02em', margin: 0 }}>{fmt(v)}</p>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '7px 12px' }}>
          <Search size={12} color="#55556A" />
          <input type="text" placeholder="Buscar descrição ou categoria..." value={busca} onChange={e => setBusca(e.target.value)} style={{ background: 'none', border: 'none', color: '#CCCCDD', fontSize: 11, outline: 'none', width: '100%', fontFamily: 'Inter, sans-serif' }} />
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {['Todos', 'Isa', 'Fe', 'Casal'].map(t => (
            <button key={t} onClick={() => setFiltroTitular(t)} style={{ padding: '6px 12px', borderRadius: 20, fontSize: 11, fontWeight: filtroTitular===t?600:400, cursor: 'pointer', fontFamily: 'Inter, sans-serif', background: filtroTitular===t?'rgba(255,255,255,0.08)':'rgba(255,255,255,0.03)', border: `1px solid ${filtroTitular===t?'rgba(255,255,255,0.15)':'rgba(255,255,255,0.06)'}`, color: filtroTitular===t?(t==='Isa'?'#4ADE80':t==='Fe'?'#C44DFF':'#fff'):'#55556A' }}>{t}</button>
          ))}
        </div>
        <select value={filtroCateg} onChange={e => setFiltroCateg(e.target.value)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '6px 12px', color: '#8888AA', fontSize: 11, fontFamily: 'Inter, sans-serif', outline: 'none', cursor: 'pointer' }}>
          {categsUsadas.map(c => <option key={c} value={c} style={{ background: '#1A1A28' }}>{c}</option>)}
        </select>
        <span style={{ fontSize: 10, color: '#55556A' }}>{filtrado.length} registros</span>
      </div>

      {/* Tabela */}
      <div style={{ flex: 1, minHeight: 0, background: '#0A0A0F', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 140px 70px 110px 80px', padding: '11px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', flexShrink: 0 }}>
          {['Data', 'Descrição', 'Categoria', 'De quem', 'Valor', 'Conta'].map(col => (
            <span key={col} style={{ fontSize: 9, fontWeight: 600, color: '#55556A', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{col}</span>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 10 }}>
              <Loader2 size={18} color="#55556A" style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: 12, color: '#55556A' }}>Carregando do banco...</span>
            </div>
          )}
          {!loading && filtrado.length === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 10 }}>
              <p style={{ fontSize: 13, color: '#55556A', margin: 0 }}>Nenhuma saída ainda</p>
              <button onClick={() => setModalAberto(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(196,77,255,0.1)', border: '1px solid rgba(196,77,255,0.2)', borderRadius: 20, padding: '7px 16px', color: '#C44DFF', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                <Plus size={12} /> Adicionar primeira saída
              </button>
            </div>
          )}
          {!loading && filtrado.map((l, i) => (
            <div key={l.id} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 140px 70px 110px 80px', padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center', background: i%2===0?'transparent':'rgba(255,255,255,0.01)' }}>
              <span style={{ fontSize: 11, color: '#55556A' }}>{fmtData(l.data)}</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: '#CCCCDD' }}>{l.descricao}</span>
              <span style={{ fontSize: 10, color: '#8888AA', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', padding: '2px 8px', borderRadius: 20, display: 'inline-block' }}>{l.categoria}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: corTitular(l.titular) }}>{l.titular}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#FF4D6D' }}>- {fmt(l.valor)}</span>
              <span style={{ fontSize: 10, color: '#55556A' }}>{l.conta}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 140px 70px 110px 80px', padding: '10px 20px', borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', flexShrink: 0 }}>
          <span style={{ fontSize: 9, color: '#55556A', gridColumn: '1/5' }}>{filtrado.length} lançamentos filtrados</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: '#FF4D6D' }}>- {fmt(filtrado.reduce((s,l)=>s+l.valor,0))}</span>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
