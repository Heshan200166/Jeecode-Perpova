'use client'

import AdminTopBar from '@/components/admin/AdminTopBar'
import StatCard from '@/components/admin/StatCard'
import { useAdminStore } from '@/hooks/useAdminStore'
import { Badge } from '@/shared/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/table'
import {
  ShoppingBagIcon,
  SparklesIcon,
  TagIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function AdminDashboard() {
  const { products, categories } = useAdminStore()

  const totalProducts = products.length
  const newArrivals = products.filter((p) => p.isNewArrival).length
  const totalCategories = categories.length
  const totalValue = products.reduce((sum, p) => sum + p.price, 0)

  const recentProducts = products.slice(0, 5)

  return (
    <div>
      <AdminTopBar
        title="Dashboard"
        subtitle="Overview of your store"
      />

      <div className="p-4 sm:p-6 lg:p-8">
        {/* Stat Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Products"
            value={totalProducts}
            icon={ShoppingBagIcon}
            color="pink"
          />
          <StatCard
            title="New Arrivals"
            value={newArrivals}
            icon={SparklesIcon}
            color="rose"
          />
          <StatCard
            title="Categories"
            value={totalCategories}
            icon={TagIcon}
            color="green"
          />
          <StatCard
            title="Avg. Price"
            value={`$${totalProducts > 0 ? (totalValue / totalProducts).toFixed(2) : '0.00'}`}
            icon={CurrencyDollarIcon}
            color="amber"
          />
        </div>

        {/* Recent Products */}
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-700">
            <div>
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
                Recent Products
              </h2>
              <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
                Latest products added to the store
              </p>
            </div>
            <Link
              href="/admin/products"
              className="text-sm font-medium text-secondary-600 transition-colors hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300"
            >
              View all →
            </Link>
          </div>

          <div className="px-2">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Product</TableHeader>
                  <TableHeader>Category</TableHeader>
                  <TableHeader>Price</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Arrival</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <div className="py-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
                        No products yet.{' '}
                        <Link
                          href="/admin/products/add"
                          className="text-secondary-600 hover:underline dark:text-secondary-400"
                        >
                          Add your first product
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  recentProducts.map((product) => {
                    const category = categories.find((c) => c.id === product.categoryId)
                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-700">
                              {product.images[0] ? (
                                <img
                                  src={product.images[0].src}
                                  alt={product.title}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <ShoppingBagIcon className="h-5 w-5 text-neutral-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-neutral-900 dark:text-white">
                                {product.title}
                              </p>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                {product.colors.length} colors · {product.sizes.length} sizes
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-neutral-600 dark:text-neutral-300">
                            {category?.name || '—'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-neutral-900 dark:text-white">
                            ${product.price.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            color={
                              product.status === 'In Stock'
                                ? 'green'
                                : product.status === 'Limited'
                                  ? 'amber'
                                  : 'red'
                            }
                          >
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {product.isNewArrival ? (
                            <Badge color="pink">New</Badge>
                          ) : (
                            <span className="text-sm text-neutral-400">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Categories Overview */}
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-700">
            <div>
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white">
                Categories
              </h2>
              <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
                Product distribution by category
              </p>
            </div>
            <Link
              href="/admin/categories"
              className="text-sm font-medium text-secondary-600 transition-colors hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300"
            >
              Manage →
            </Link>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const count = products.filter((p) => p.categoryId === category.id).length
              return (
                <div
                  key={category.id}
                  className="flex items-center gap-4 rounded-xl border border-neutral-200 p-4 transition-all duration-200 hover:shadow-md dark:border-neutral-700 dark:hover:border-neutral-600"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-50 dark:bg-secondary-500/10">
                    <TagIcon className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-neutral-900 dark:text-white">
                      {category.name}
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {count} {count === 1 ? 'product' : 'products'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
