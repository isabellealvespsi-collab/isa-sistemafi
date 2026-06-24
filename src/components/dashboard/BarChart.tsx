'use client'

const bars = [
  { mes: 'Set', pct: 56 },
  { mes: 'Out', pct: 75 },
  { mes: 'Nov', pct: 91 },
  { mes: 'Dez', pct: 88 },
  { mes: 'Jan', pct: 100, active: true },
  { mes: 'Fev', pct: 66 },
]

// Gradiente inativo: cinza-lilás escuro → quase preto, 3 stops
const inactiveGrad = 'linear-gradient(180deg, rgba(80,70,110,0.9) 0%, rgba(40,35,65,0.7) 55%, rgba(10,10,18,0) 100%)'
// Gradiente ativo: lilás claro → roxo → quase preto
const activeGrad   = 'linear-gradient(180deg, #E0CFFF 0%, #B47FFF 20%, #7B3FD4 50%, rgba(60,20,120,0.6) 80%, rgba(10,10,18,0) 100%)'

export default function BarChart() {
  return (
    <div style={{ position: 'relative', paddingBottom: 28 }}>
      {/* Linhas de grade horizontais */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 28, pointerEvents: 'none' }}>
        {[0, 25, 50, 75].map(p => (
          <div key={p} style={{
            position: 'absolute',
            bottom: `${p}%`, left: 0, right: 0,
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }} />
        ))}
      </div>

      {/* Barras */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 200 }}>
        {bars.map((b) => (
          <div key={b.mes} style={{
            flex: 1, position: 'relative',
            display: 'flex', flexDirection: 'column',
            alignItems: 'stretch', height: '100%', justifyContent: 'flex-end',
          }}>
            {/* Tooltip */}
            {b.active && (
              <div style={{
                position: 'absolute', top: -36,
                left: '50%', transform: 'translateX(-50%)',
                background: '#1E1C2A',
                border: '1px solid rgba(196,77,255,0.25)',
                color: '#E0D8FF', fontSize: 12, fontWeight: 600,
                padding: '5px 12px', borderRadius: 8,
                whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                zIndex: 10,
              }}>
                R$ 3.200
                <span style={{
                  position: 'absolute', bottom: -5, left: '50%',
                  transform: 'translateX(-50%)',
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: '5px solid rgba(196,77,255,0.25)',
                  display: 'block', width: 0, height: 0,
                }} />
              </div>
            )}

            {/* Barra */}
            <div style={{
              height: `${b.pct}%`,
              borderRadius: '6px 6px 0 0',
              background: b.active ? activeGrad : inactiveGrad,
              position: 'relative',
            }}>
              {/* Reflexo no chão — só na barra ativa */}
              {b.active && (
                <div style={{
                  position: 'absolute',
                  bottom: -20, left: '10%', right: '10%',
                  height: 20,
                  background: 'radial-gradient(ellipse at center top, rgba(180,127,255,0.35) 0%, transparent 70%)',
                  filter: 'blur(4px)',
                  pointerEvents: 'none',
                }} />
              )}
            </div>

            {/* Label */}
            <span style={{
              position: 'absolute', bottom: -22,
              left: '50%', transform: 'translateX(-50%)',
              fontSize: 11,
              color: b.active ? '#E0D8FF' : '#55556A',
              fontWeight: b.active ? 700 : 400,
              fontFamily: 'Inter, sans-serif',
              whiteSpace: 'nowrap',
            }}>
              {b.mes}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
