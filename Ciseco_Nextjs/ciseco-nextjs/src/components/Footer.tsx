import Logo from '@/components/Logo'
import { CustomLink } from '@/data/types'
import SocialsList1 from '@/shared/SocialsList1/SocialsList1'
import React from 'react'

interface WidgetFooterMenu {
  id: string
  title: string
  menus: CustomLink[]
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: '5',
    title: 'Customer Service',
    menus: [
      { href: '/contact', label: 'Contact Us' },
      { href: '/faq', label: 'FAQ' },
      { href: '/shipping', label: 'Shipping Info' },
      { href: '/returns', label: 'Returns & Exchanges' },
    ],
  },
  {
    id: '1',
    title: 'Shop',
    menus: [
      { href: '/collections/all', label: 'All Products' },
      { href: '/collections/new-arrivals', label: 'New Arrivals' },
      { href: '/collections/best-sellers', label: 'Best Sellers' },
      { href: '/collections/sale', label: 'Sale' },
    ],
  },
  {
    id: '2',
    title: 'About',
    menus: [
      { href: '/about', label: 'Our Story' },
      { href: '/size-guide', label: 'Size Guide' },
      { href: '/blog', label: 'Blog' },
      { href: '/careers', label: 'Careers' },
    ],
  },
  {
    id: '4',
    title: 'Legal',
    menus: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/cookies', label: 'Cookie Policy' },
      { href: '/accessibility', label: 'Accessibility' },
    ],
  },
]

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">{menu.title}</h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="relative border-t py-20 lg:pt-28 lg:pb-24">
      {/* Newsletter signup */}
      <div className="container mb-16 lg:mb-20">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-neutral-100 px-8 py-10 sm:flex-row sm:px-12 dark:bg-neutral-800">
          <div>
            <h3 className="text-xl font-semibold">Stay in the loop</h3>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Subscribe for exclusive deals, new arrivals, and style tips.
            </p>
          </div>
          <form className="flex w-full max-w-md gap-2 sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm outline-none focus:border-neutral-900 dark:border-neutral-600 dark:bg-neutral-900 dark:focus:border-white"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer columns */}
      <div className="container grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10">
        <div className="col-span-2 grid grid-cols-4 gap-5 md:col-span-4 lg:flex lg:flex-col lg:md:col-span-1">
          <div className="col-span-2 md:col-span-1">
            <Logo />
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialsList1 />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>

      {/* Payment icons & copyright */}
      <div className="container mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row dark:border-neutral-700">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          &copy; {new Date().getFullYear()} Jee code. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          {/* Visa */}
          <svg className="h-8 w-auto text-neutral-400" viewBox="0 0 48 32" fill="currentColor">
            <rect width="48" height="32" rx="4" fill="currentColor" opacity="0.1" />
            <text x="24" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">VISA</text>
          </svg>
          {/* Mastercard */}
          <svg className="h-8 w-auto" viewBox="0 0 48 32">
            <rect width="48" height="32" rx="4" fill="currentColor" opacity="0.1" className="text-neutral-400" />
            <circle cx="20" cy="16" r="8" fill="#EB001B" opacity="0.6" />
            <circle cx="28" cy="16" r="8" fill="#F79E1B" opacity="0.6" />
          </svg>
          {/* Amex */}
          <svg className="h-8 w-auto text-neutral-400" viewBox="0 0 48 32" fill="currentColor">
            <rect width="48" height="32" rx="4" fill="currentColor" opacity="0.1" />
            <text x="24" y="20" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor">AMEX</text>
          </svg>
          {/* PayPal */}
          <svg className="h-8 w-auto text-neutral-400" viewBox="0 0 48 32" fill="currentColor">
            <rect width="48" height="32" rx="4" fill="currentColor" opacity="0.1" />
            <text x="24" y="20" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor">PayPal</text>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Footer
