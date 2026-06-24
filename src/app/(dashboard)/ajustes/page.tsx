'use client'

import { useState } from 'react'
import { Check, User, Palette, Bell, Shield, Database } from 'lucide-react'

function Card({ children, glowRgb = '160,100,255', glowAt = 'top right', style = {} }: {
  children: React.ReactNode; glowRgb?: string; glowAt?: string; style?: React.CSSProperties
}) {
  return (
    <div style={{
      background: `radial-gradient(ellipse 70% 60% at ${glowAt}, rgba(${glowRgb},0.1) 0%, transparent 55%), #0A0A0F`,
      border: `1px solid rgba(${glowRgb},0.12)`,
      borderRadius: 16, padding: 24,
      boxShadow: `inset 0 1px 0 rgba(${glowRgb},0.06), 0 8px 32px rgba(0,0,0,0.4)`,
      ...style,
    }}>
      {children}
    </div>
  )
}

const lbl: React.CSSProperties = { fontSize: 9, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#55556A', margin: '0 0 6px', display: 'block' }

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
  padding: '10px 14px', color: '#fff', fontSize: 13,
  fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box',
}

const TABS = [
  { id: 'perfil',    label: 'Perfil',       icon: User     },
  { id: 'sistema',   label: 'Sistema',      icon: Palette  },
  { id: 'banco',     label: 'Banco de Dados', icon: Database },
  { id: 'seguranca', label: 'Segurança',    icon: Shield   },
]

export default function AjustesPage() {
  const [tab, setTab] = useState('perfil')
  const [saved, setSaved] = useState(false)

  const [perfil, setPerfil] = useState({
    nomeTitular1: 'Isabelle',
    nomeTitular2: 'Felipe',
    apelido1: 'Isa',
    apelido2: 'Fe',
    email: 'isabellealvespsi@gmail.com',
  })

  const [sistema, setSistema] = useState({
    nomeApp: 'Prosperidade',
    subtitulo: 'Nosso Finder',
    moeda: 'BRL',
    idioma: 'pt-BR',
    mesInicio: '1',
  })

  const [banco, setBanco] = useState({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 20) + '...' || '',
  })

  function salvar() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Header */}
      <div style={{ flexShrink: 0 }}>
        <h2 style={{ fontSize: 20, fontWeight: 500, color: '#fff', margin: 0 }}>Ajustes</h2>
        <p style={{ fontSize: 11, color: '#55556A', margin: '2px 0 0' }}>Personalize o sistema do casal</p>
      </div>

      <div style={{ minHeight: 0, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 14 }}>

        {/* Menu lateral de tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px', borderRadius: 10, fontSize: 13,
              fontWeight: tab === id ? 600 : 400,
              color: tab === id ? '#fff' : '#55556A',
              background: tab === id ? 'rgba(196,77,255,0.1)' : 'transparent',
              border: `1px solid ${tab === id ? 'rgba(196,77,255,0.2)' : 'transparent'}`,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              textAlign: 'left', transition: 'all 0.12s ease',
            }}>
              <Icon size={15} color={tab === id ? '#C44DFF' : '#55556A'} strokeWidth={tab === id ? 2 : 1.5} />
              {label}
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto', minHeight: 0 }}>

          {/* ── ABA: Perfil ── */}
          {tab === 'perfil' && (
            <Card glowRgb="196,77,255" glowAt="top right">
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: '0 0 20px' }}>Dados do Casal</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

                {/* Titular 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ padding: 14, background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.1)', borderRadius: 12, marginBottom: 4 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#4ADE80', margin: '0 0 12px' }}>Titular 1 — Isa</p>
                    <div style={{ marginBottom: 10 }}>
                      <label style={lbl}>Nome completo</label>
                      <input style={inputStyle} value={perfil.nomeTitular1} onChange={e => setPerfil(p => ({ ...p, nomeTitular1: e.target.value }))} />
                    </div>
                    <div>
                      <label style={lbl}>Apelido (usado no sistema)</label>
                      <input style={inputStyle} value={perfil.apelido1} onChange={e => setPerfil(p => ({ ...p, apelido1: e.target.value }))} />
                    </div>
                  </div>
                </div>

                {/* Titular 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ padding: 14, background: 'rgba(196,77,255,0.05)', border: '1px solid rgba(196,77,255,0.1)', borderRadius: 12, marginBottom: 4 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#C44DFF', margin: '0 0 12px' }}>Titular 2 — Fe</p>
                    <div style={{ marginBottom: 10 }}>
                      <label style={lbl}>Nome completo</label>
                      <input style={inputStyle} value={perfil.nomeTitular2} onChange={e => setPerfil(p => ({ ...p, nomeTitular2: e.target.value }))} />
                    </div>
                    <div>
                      <label style={lbl}>Apelido (usado no sistema)</label>
                      <input style={inputStyle} value={perfil.apelido2} onChange={e => setPerfil(p => ({ ...p, apelido2: e.target.value }))} />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <label style={lbl}>E-mail de acesso</label>
                <input style={inputStyle} value={perfil.email} onChange={e => setPerfil(p => ({ ...p, email: e.target.value }))} />
              </div>
            </Card>
          )}

          {/* ── ABA: Sistema ── */}
          {tab === 'sistema' && (
            <Card glowRgb="160,100,255" glowAt="top right">
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: '0 0 20px' }}>Identidade do Sistema</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={lbl}>Nome do sistema</label>
                    <input style={inputStyle} value={sistema.nomeApp} onChange={e => setSistema(s => ({ ...s, nomeApp: e.target.value }))} placeholder="Ex: Prosperidade" />
                    <p style={{ fontSize: 10, color: '#55556A', margin: '5px 0 0' }}>Aparece na sidebar e na aba do navegador</p>
                  </div>
                  <div>
                    <label style={lbl}>Subtítulo / slogan</label>
                    <input style={inputStyle} value={sistema.subtitulo} onChange={e => setSistema(s => ({ ...s, subtitulo: e.target.value }))} placeholder="Ex: Nosso Finder" />
                    <p style={{ fontSize: 10, color: '#55556A', margin: '5px 0 0' }}>Aparece abaixo do nome na sidebar</p>
                  </div>
                </div>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={lbl}>Moeda</label>
                    <select style={{ ...inputStyle, cursor: 'pointer', background: '#1A1A28' }} value={sistema.moeda} onChange={e => setSistema(s => ({ ...s, moeda: e.target.value }))}>
                      <option value="BRL" style={{ background: '#1A1A28' }}>BRL — Real Brasileiro</option>
                      <option value="USD" style={{ background: '#1A1A28' }}>USD — Dólar</option>
                      <option value="EUR" style={{ background: '#1A1A28' }}>EUR — Euro</option>
                    </select>
                  </div>
                  <div>
                    <label style={lbl}>Idioma</label>
                    <select style={{ ...inputStyle, cursor: 'pointer', background: '#1A1A28' }} value={sistema.idioma} onChange={e => setSistema(s => ({ ...s, idioma: e.target.value }))}>
                      <option value="pt-BR" style={{ background: '#1A1A28' }}>Português (Brasil)</option>
                      <option value="en-US" style={{ background: '#1A1A28' }}>English (US)</option>
                    </select>
                  </div>
                  <div>
                    <label style={lbl}>Início do mês fiscal</label>
                    <select style={{ ...inputStyle, cursor: 'pointer', background: '#1A1A28' }} value={sistema.mesInicio} onChange={e => setSistema(s => ({ ...s, mesInicio: e.target.value }))}>
                      {Array.from({ length: 28 }, (_, i) => (
                        <option key={i+1} value={String(i+1)} style={{ background: '#1A1A28' }}>Dia {i+1}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preview */}
                <div style={{ padding: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12 }}>
                  <p style={{ fontSize: 10, color: '#55556A', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Preview da Sidebar</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#3d1a6e,#1a0a40)', border: '2px solid rgba(196,77,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>👫</div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0 }}>{sistema.nomeApp || 'Prosperidade'}</p>
                      <p style={{ fontSize: 10, color: '#55556A', margin: 0 }}>{sistema.subtitulo || 'Nosso Finder'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* ── ABA: Banco de Dados ── */}
          {tab === 'banco' && (
            <Card glowRgb="74,222,128" glowAt="top left">
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: '0 0 20px' }}>Conexão com Supabase</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ padding: 14, background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 8px rgba(74,222,128,0.6)' }} />
                  <span style={{ fontSize: 12, color: '#4ADE80', fontWeight: 600 }}>Conectado ao Supabase</span>
                  <span style={{ fontSize: 11, color: '#55556A' }}>· tljrzaswxdtabeqnsswj</span>
                </div>

                <div>
                  <label style={lbl}>Supabase URL</label>
                  <input style={{ ...inputStyle, color: '#8888AA' }} value="https://tljrzaswxdtabeqnsswj.supabase.co" readOnly />
                </div>
                <div>
                  <label style={lbl}>Chave Anônima (pública)</label>
                  <input style={{ ...inputStyle, color: '#8888AA' }} value="eyJhbGci... (configurada)" readOnly />
                </div>

                <div style={{ padding: 14, background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#F59E0B', margin: '0 0 4px' }}>⚠️ Service Role Key</p>
                  <p style={{ fontSize: 10, color: '#55556A', margin: 0 }}>A chave de serviço está configurada no .env.local e no Vercel. Nunca a exponha publicamente.</p>
                </div>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#fff', margin: '0 0 10px' }}>Tabelas ativas</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {['saidas', 'entradas', 'contas_bancarias', 'cartoes_credito', 'despesas_fixas', 'metas'].map(t => (
                      <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 10px', background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.1)', borderRadius: 8 }}>
                        <Check size={11} color="#4ADE80" />
                        <span style={{ fontSize: 11, color: '#8888AA', fontFamily: 'monospace' }}>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* ── ABA: Segurança ── */}
          {tab === 'seguranca' && (
            <Card glowRgb="255,77,109" glowAt="top right">
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: '0 0 20px' }}>Segurança e Acesso</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={lbl}>Senha atual</label>
                  <input type="password" style={inputStyle} placeholder="••••••••" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={lbl}>Nova senha</label>
                    <input type="password" style={inputStyle} placeholder="••••••••" />
                  </div>
                  <div>
                    <label style={lbl}>Confirmar senha</label>
                    <input type="password" style={inputStyle} placeholder="••••••••" />
                  </div>
                </div>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

                <div style={{ padding: 14, background: 'rgba(255,77,109,0.05)', border: '1px solid rgba(255,77,109,0.12)', borderRadius: 12 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#FF4D6D', margin: '0 0 4px' }}>Zona de Perigo</p>
                  <p style={{ fontSize: 10, color: '#55556A', margin: '0 0 12px' }}>Estas ações são irreversíveis.</p>
                  <button style={{ padding: '8px 16px', background: 'rgba(255,77,109,0.1)', border: '1px solid rgba(255,77,109,0.2)', borderRadius: 8, color: '#FF4D6D', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    Apagar todos os dados do mês
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* Botão salvar */}
          {tab !== 'banco' && (
            <button onClick={salvar} style={{
              alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 24px',
              background: saved ? 'rgba(74,222,128,0.15)' : 'linear-gradient(90deg,#C44DFF,#9B59FF)',
              border: saved ? '1px solid rgba(74,222,128,0.3)' : 'none',
              borderRadius: 12, color: saved ? '#4ADE80' : '#fff',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              boxShadow: saved ? 'none' : '0 4px 16px rgba(196,77,255,0.3)',
              transition: 'all 0.2s ease',
            }}>
              <Check size={14} />
              {saved ? 'Salvo com sucesso!' : 'Salvar alterações'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
