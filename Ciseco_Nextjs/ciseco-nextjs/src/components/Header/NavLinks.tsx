import { getNavigation } from '@/data/navigation'
import { Link } from '../Link'

export default async function NavLinks() {
  const navItems = await getNavigation()

  return (
    <nav className="hidden lg:flex items-center gap-x-1">
      {navItems.map((item) => {
        const isSale = item.name === 'Sale'
        const isNew = item.name === 'New Arrivals'

        return (
          <Link
            key={item.id}
            href={item.href || '#'}
            className={[
              'relative px-3.5 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-full',
              isSale
                ? 'text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30'
                : isNew
                  ? 'text-[#FF6B9D] hover:text-[#e0508a] hover:bg-pink-50 dark:hover:bg-pink-950/30'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800',
            ].join(' ')}
          >
            {item.name}
            {isSale && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
