'use client'

import dynamic from 'next/dynamic'

const BalancoChart = dynamic(() => import('./BalancoChart'), { ssr: false })

export default function BalancoChartWrapper() {
  return <BalancoChart />
}
