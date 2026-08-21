'use client'

import clsx from 'clsx'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ElementType
  trend?: { value: string; positive: boolean }
  color?: 'pink' | 'rose' | 'green' | 'amber'
}

const colorMap = {
  pink: {
    bg: 'bg-secondary-50 dark:bg-secondary-500/10',
    icon: 'text-secondary-600 dark:text-secondary-400',
    glow: 'from-secondary-500/10 to-secondary-300/5',
    border: 'border-secondary-100 dark:border-secondary-500/20',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-500/10',
    icon: 'text-rose-500 dark:text-rose-400',
    glow: 'from-rose-500/10 to-rose-300/5',
    border: 'border-rose-100 dark:border-rose-500/20',
  },
  green: {
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    icon: 'text-emerald-600 dark:text-emerald-400',
    glow: 'from-emerald-500/10 to-emerald-300/5',
    border: 'border-emerald-100 dark:border-emerald-500/20',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    icon: 'text-amber-600 dark:text-amber-400',
    glow: 'from-amber-500/10 to-amber-300/5',
    border: 'border-amber-100 dark:border-amber-500/20',
  },
}

export default function StatCard({ title, value, icon: Icon, trend, color = 'pink' }: StatCardProps) {
  const colors = colorMap[color]

  return (
    <div className={clsx(
      'group relative overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300',
      'hover:shadow-xl hover:shadow-secondary-100/60 hover:-translate-y-0.5',
      'dark:bg-neutral-800 dark:hover:shadow-neutral-900/50',
      colors.border
    )}>
      {/* Decorative gradient orb */}
      <div className={clsx(
        'pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-60 transition-transform duration-500 group-hover:scale-150 group-hover:opacity-80',
        colors.glow
      )} />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-neutral-900 dark:text-white">{value}</p>
          {trend && (
            <p className={clsx(
              'mt-1 text-xs font-semibold',
              trend.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'
            )}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className={clsx('flex h-12 w-12 items-center justify-center rounded-xl', colors.bg)}>
          <Icon className={clsx('h-6 w-6', colors.icon)} />
        </div>
      </div>
    </div>
  )
}
