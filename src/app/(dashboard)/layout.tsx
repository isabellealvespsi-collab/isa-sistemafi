import Sidebar from '@/components/layout/Sidebar'
import BottomNav from '@/components/layout/BottomNav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Aurora background effect */}
      <div className="aurora-bg" aria-hidden />

      {/* Sidebar desktop */}
      <Sidebar />

      {/* Main content */}
      <main className="relative z-10 md:pl-72 min-h-screen pb-20 md:pb-0">
        <div className="max-w-[1200px] mx-auto p-6">
          {children}
        </div>
      </main>

      {/* Bottom nav mobile */}
      <BottomNav />
    </>
  )
}
