'use client'

import AdminSidebar from '@/components/admin/AdminSidebar'
import clsx from 'clsx'
import { useState } from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #fff5f7 0%, #fff 60%, #fce7f3 100%)'}}>
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar — always visible on desktop */}
      <div className={clsx('hidden lg:block')}>
        <AdminSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Sidebar — mobile slide-in */}
      <div
        className={clsx(
          'fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 lg:hidden',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <AdminSidebar collapsed={false} onToggle={() => setMobileMenuOpen(false)} />
      </div>

      {/* Main content */}
      <main
        className={clsx(
          'min-h-screen transition-all duration-300',
          sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-64'
        )}
      >
        {children}
      </main>
    </div>
  )
}
