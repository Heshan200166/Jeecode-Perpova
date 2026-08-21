'use client'

import AdminTopBar from '@/components/admin/AdminTopBar'
import ProductForm from '@/components/admin/ProductForm'
import { AdminProduct, useAdminStore } from '@/hooks/useAdminStore'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function AdminEditProductPage() {
  const { id } = useParams<{ id: string }>()
  const { getProduct, updateProduct, categories } = useAdminStore()
  const router = useRouter()

  const product = getProduct(id)

  const handleSubmit = useCallback(
    (data: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>) => {
      updateProduct(id, data)
      router.push('/admin/products')
    },
    [id, updateProduct, router]
  )

  if (!product) {
    return (
      <div>
        <AdminTopBar title="Edit Product" />
        <div className="flex flex-col items-center justify-center p-16 text-center">
          <ShoppingBagIcon className="mb-4 h-12 w-12 text-neutral-300 dark:text-neutral-600" />
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Product not found
          </h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            The product you're looking for doesn't exist.
          </p>
          <Link
            href="/admin/products"
            className="mt-4 text-sm text-primary-600 hover:underline dark:text-primary-400"
          >
            ← Back to products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <AdminTopBar
        title="Edit Product"
        subtitle={product.title}
      />

      <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        <ProductForm
          initialData={product}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={() => router.push('/admin/products')}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  )
}
