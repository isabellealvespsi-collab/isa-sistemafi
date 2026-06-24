'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const data = [
  { mes: 'Set', valor: 1800 },
  { mes: 'Out', valor: 2400 },
  { mes: 'Nov', valor: 2900 },
  { mes: 'Dez', valor: 2800 },
  { mes: 'Jan', valor: 3200 },
  { mes: 'Fev', valor: 2100 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1f35] border border-white/10 rounded-lg px-3 py-2 text-xs text-white shadow-xl">
        <p className="font-semibold">R$ {payload[0].value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
      </div>
    )
  }
  return null
}

export default function BalancoChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barCategoryGap="30%" margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="mes"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#ffffff50', fontSize: 12 }}
        />
        <YAxis hide />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Bar dataKey="valor" radius={[6, 6, 6, 6]}>
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={entry.mes === 'Jan' ? 'url(#barActive)' : '#1e2440'}
            />
          ))}
        </Bar>
        <defs>
          <linearGradient id="barActive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c4b5fd" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.4} />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  )
}
