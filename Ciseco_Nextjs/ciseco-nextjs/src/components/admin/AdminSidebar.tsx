'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Squares2X2Icon,
  ShoppingBagIcon,
  TagIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Squares2X2Icon },
  { name: 'Products', href: '/admin/products', icon: ShoppingBagIcon },
  { name: 'Categories', href: '/admin/categories', icon: TagIcon },
]

interface AdminSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside
      className={clsx(
        'fixed inset-y-0 left-0 z-40 flex flex-col border-r border-secondary-100 bg-white transition-all duration-300 dark:border-neutral-700 dark:bg-neutral-900',
        'shadow-[4px_0_24px_rgba(240,80,130,0.06)]',
        collapsed ? 'w-[72px]' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-neutral-200 px-4 dark:border-neutral-700">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-700 text-white font-bold text-sm shadow-lg shadow-secondary-200 dark:shadow-secondary-900/50">
            JC
          </div>
          {!collapsed && (
            <span className="text-lg font-semibold bg-gradient-to-r from-secondary-600 to-secondary-800 bg-clip-text text-transparent dark:from-secondary-300 dark:to-secondary-500">
              Jee Admin
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const active = isActive(item.href)
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={clsx(
                    'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    active
                      ? 'bg-secondary-50 text-secondary-700 dark:bg-secondary-500/10 dark:text-secondary-400'
                      : 'text-neutral-500 hover:bg-secondary-50/70 hover:text-secondary-700 dark:text-neutral-400 dark:hover:bg-secondary-500/5 dark:hover:text-secondary-300'
                  )}
                >
                  <item.icon
                    className={clsx(
                      'h-5 w-5 shrink-0 transition-colors',
                      active
                        ? 'text-secondary-600 dark:text-secondary-400'
                        : 'text-neutral-400 group-hover:text-secondary-500 dark:text-neutral-500 dark:group-hover:text-secondary-400'
                    )}
                  />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-neutral-200 p-3 dark:border-neutral-700">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-xl p-2 text-neutral-400 transition-colors hover:bg-secondary-50 hover:text-secondary-600 dark:hover:bg-secondary-500/10 dark:hover:text-secondary-400"
        >
          {collapsed ? (
            <ChevronRightIcon className="h-5 w-5" />
          ) : (
            <ChevronLeftIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  )
}
