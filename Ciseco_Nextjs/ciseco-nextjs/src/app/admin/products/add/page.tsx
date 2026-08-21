'use client'

import AdminTopBar from '@/components/admin/AdminTopBar'
import ProductForm from '@/components/admin/ProductForm'
import { useAdminStore } from '@/hooks/useAdminStore'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function AdminAddProductPage() {
  const { addProduct, categories } = useAdminStore()
  const router = useRouter()

  const handleSubmit = useCallback(
    (data: Parameters<typeof addProduct>[0]) => {
      addProduct(data)
      router.push('/admin/products')
    },
    [addProduct, router]
  )

  return (
    <div>
      <AdminTopBar
        title="Add Product"
        subtitle="Create a new product listing"
      />

      <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        <ProductForm
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={() => router.push('/admin/products')}
          submitLabel="Create Product"
        />
      </div>
    </div>
  )
}
