'use client'

import AdminTopBar from '@/components/admin/AdminTopBar'
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog'
import { useAdminStore } from '@/hooks/useAdminStore'
import { Badge } from '@/shared/badge'
import { Button } from '@/shared/Button/Button'
import { Input } from '@/shared/input'
import { Select } from '@/shared/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/table'
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon,
  ShoppingBagIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export default function AdminProductsPage() {
  const { products, categories, deleteProduct } = useAdminStore()
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.handle.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !filterCategory || p.categoryId === filterCategory
      const matchesStatus = !filterStatus || p.status === filterStatus
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [products, search, filterCategory, filterStatus])

  const handleDelete = () => {
    if (deleteTarget) {
      deleteProduct(deleteTarget)
      setDeleteTarget(null)
    }
  }

  const deleteTargetProduct = deleteTarget ? products.find((p) => p.id === deleteTarget) : null

  return (
    <div>
      <AdminTopBar
        title="Products"
        subtitle={`${products.length} total products`}
        actions={
          <Button color="dark" href="/admin/products/add">
            <PlusIcon className="h-4 w-4" />
            Add Product
          </Button>
        }
      />

      <div className="p-4 sm:p-6 lg:p-8">
        {/* Filters Bar */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-full border border-neutral-200 bg-neutral-50 py-2 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-secondary-500 focus:outline-none focus:ring-1 focus:ring-secondary-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-secondary-400"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={filterCategory}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterCategory(e.target.value)}
                className="w-40"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
              <Select
                value={filterStatus}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value)}
                className="w-36"
              >
                <option value="">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Limited">Limited</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="mt-4 rounded-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
          <div className="px-2">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Product</TableHeader>
                  <TableHeader>Category</TableHeader>
                  <TableHeader>Price</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Arrival</TableHeader>
                  <TableHeader>Colors</TableHeader>
                  <TableHeader>
                    <span className="sr-only">Actions</span>
                  </TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div className="flex flex-col items-center justify-center py-12">
                        <ShoppingBagIcon className="mb-3 h-10 w-10 text-neutral-300 dark:text-neutral-600" />
                        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                          {search || filterCategory || filterStatus
                            ? 'No products match your filters'
                            : 'No products yet'}
                        </p>
                        {!search && !filterCategory && !filterStatus && (
                          <Link
                            href="/admin/products/add"
                            className="mt-2 text-sm text-secondary-600 hover:underline dark:text-secondary-400"
                          >
                            Add your first product →
                          </Link>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => {
                    const category = categories.find((c) => c.id === product.categoryId)
                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-700">
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
                                {product.sizes.length} sizes
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
                        <TableCell>
                          <div className="flex -space-x-1">
                            {product.colors.slice(0, 4).map((color, i) => (
                              <span
                                key={i}
                                className="inline-block h-6 w-6 rounded-full border-2 border-white dark:border-neutral-800"
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                              />
                            ))}
                            {product.colors.length > 4 && (
                              <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-neutral-200 text-[10px] font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-600 dark:text-neutral-300">
                                +{product.colors.length - 4}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/admin/products/edit/${product.id}`}
                              className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-secondary-50 hover:text-secondary-600 dark:hover:bg-secondary-500/10 dark:hover:text-secondary-400"
                            >
                              <PencilSquareIcon className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => setDeleteTarget(product.id)}
                              className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Product"
        description={`Are you sure you want to delete "${deleteTargetProduct?.title}"? This action cannot be undone.`}
      />
    </div>
  )
}
