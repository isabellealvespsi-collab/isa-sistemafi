import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glow?: boolean
}

export default function GlassCard({ children, className, glow }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card rounded-xl',
        glow && 'shadow-[0_0_40px_rgba(208,188,255,0.08)]',
        className
      )}
    >
      {children}
    </div>
  )
}
