import Sidebar from '@/components/layout/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0F' }}>
      <Sidebar />
      <main style={{ marginLeft: 224, flex: 1, padding: '20px 24px 40px', fontFamily: 'Inter, sans-serif' }}>
        {children}
      </main>
    </div>
  )
}
