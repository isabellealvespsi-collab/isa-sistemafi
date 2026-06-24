'use client'

export default function Sparkline({
  data, color = '#4ADE80', height = 40, width = 120,
}: { data: number[]; color?: string; height?: number; width?: number }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * (height * 0.75) - height * 0.1,
  }))

  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const areaD = `${pathD} L${width},${height} L0,${height} Z`

  const lastPt = pts[pts.length - 1]
  const lastVal = data[data.length - 1]

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <defs>
        <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <filter id="sparkGlow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d={areaD} fill={`url(#sg-${color.replace('#','')})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5"
        filter="url(#sparkGlow)" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dot + label no último ponto */}
      <circle cx={lastPt.x} cy={lastPt.y} r="2.5" fill={color} />
      <rect x={lastPt.x - 16} y={lastPt.y - 14} width="32" height="11" rx="3"
        fill="rgba(10,10,15,0.85)" stroke={`${color}40`} strokeWidth="0.5" />
      <text x={lastPt.x} y={lastPt.y - 6.5} textAnchor="middle"
        fontSize="5" fontWeight="700" fill={color} fontFamily="Inter, sans-serif">
        R${(lastVal/1000).toFixed(1)}k
      </text>
    </svg>
  )
}
