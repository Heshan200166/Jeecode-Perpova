'use client'

import SwitchDarkMode from '@/shared/SwitchDarkMode/SwitchDarkMode'
import { Bars3Icon } from '@heroicons/react/24/outline'

interface AdminTopBarProps {
  title: string
  subtitle?: string
  onMenuToggle?: () => void
  actions?: React.ReactNode
}

export default function AdminTopBar({ title, subtitle, onMenuToggle, actions }: AdminTopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-secondary-100 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8 dark:border-neutral-700 dark:bg-neutral-900/80" style={{boxShadow: '0 1px 0 rgba(240,80,130,0.08)'}}>
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 lg:hidden dark:hover:bg-neutral-800"
        >
          <Bars3Icon className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-neutral-900 dark:text-white">{title}</h1>
          {subtitle && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {actions}
        <SwitchDarkMode />
      </div>
    </header>
  )
}
