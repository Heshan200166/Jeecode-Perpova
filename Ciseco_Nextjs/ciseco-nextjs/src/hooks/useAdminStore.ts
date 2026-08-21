'use client'

import { useCallback, useEffect, useState } from 'react'

// ── Types ───────────────────────────────────────────────────────────────────

export interface AdminProductImage {
  src: string
  alt: string
}

export interface AdminProductVariantColor {
  name: string
  hex: string
}

export interface AdminProduct {
  id: string
  title: string
  handle: string
  price: number
  description: string
  categoryId: string
  isNewArrival: boolean
  status: 'In Stock' | 'Out of Stock' | 'Limited'
  images: AdminProductImage[]
  colors: AdminProductVariantColor[]
  sizes: string[]
  createdAt: string
  updatedAt: string
}

export interface AdminCategory {
  id: string
  name: string
  description: string
  image: string
  createdAt: string
}

interface AdminStore {
  products: AdminProduct[]
  categories: AdminCategory[]
  addProduct: (product: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>) => AdminProduct
  updateProduct: (id: string, updates: Partial<AdminProduct>) => void
  deleteProduct: (id: string) => void
  getProduct: (id: string) => AdminProduct | undefined
  addCategory: (category: Omit<AdminCategory, 'id' | 'createdAt'>) => AdminCategory
  updateCategory: (id: string, updates: Partial<AdminCategory>) => void
  deleteCategory: (id: string) => void
  getCategory: (id: string) => AdminCategory | undefined
  getProductCountByCategory: (categoryId: string) => number
}

// ── Sample Data ─────────────────────────────────────────────────────────────

const SAMPLE_CATEGORIES: AdminCategory[] = [
  {
    id: 'cat-1',
    name: 'Tops & T-Shirts',
    description: 'Casual and formal tops for everyday wear',
    image: '',
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'cat-2',
    name: 'Dresses',
    description: 'Elegant dresses for all occasions',
    image: '',
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'cat-3',
    name: 'Pants & Jeans',
    description: 'Comfortable bottoms and denim',
    image: '',
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'cat-4',
    name: 'Jackets & Coats',
    description: 'Outerwear for all seasons',
    image: '',
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'cat-5',
    name: 'Accessories',
    description: 'Bags, scarves, and more',
    image: '',
    createdAt: '2025-01-15T10:00:00Z',
  },
]

const SAMPLE_PRODUCTS: AdminProduct[] = [
  {
    id: 'prod-1',
    title: 'Classic Cotton T-Shirt',
    handle: 'classic-cotton-t-shirt',
    price: 29.99,
    description: 'A timeless cotton t-shirt made from 100% organic cotton. Soft, breathable, and perfect for everyday wear.',
    categoryId: 'cat-1',
    isNewArrival: true,
    status: 'In Stock',
    images: [],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#1B2A4A' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    createdAt: '2025-06-01T10:00:00Z',
    updatedAt: '2025-06-01T10:00:00Z',
  },
  {
    id: 'prod-2',
    title: 'Silk Midi Dress',
    handle: 'silk-midi-dress',
    price: 149.00,
    description: 'Elegant silk midi dress with a flattering A-line silhouette. Perfect for special occasions.',
    categoryId: 'cat-2',
    isNewArrival: true,
    status: 'In Stock',
    images: [],
    colors: [
      { name: 'Rose', hex: '#E8A0BF' },
      { name: 'Champagne', hex: '#F7E3D4' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    createdAt: '2025-06-05T10:00:00Z',
    updatedAt: '2025-06-05T10:00:00Z',
  },
  {
    id: 'prod-3',
    title: 'Slim Fit Chinos',
    handle: 'slim-fit-chinos',
    price: 69.00,
    description: 'Modern slim-fit chinos with stretch fabric for all-day comfort. Smart casual essential.',
    categoryId: 'cat-3',
    isNewArrival: false,
    status: 'In Stock',
    images: [],
    colors: [
      { name: 'Khaki', hex: '#C3B091' },
      { name: 'Olive', hex: '#556B2F' },
      { name: 'Navy', hex: '#1B2A4A' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    createdAt: '2025-05-20T10:00:00Z',
    updatedAt: '2025-05-20T10:00:00Z',
  },
  {
    id: 'prod-4',
    title: 'Wool Blend Overcoat',
    handle: 'wool-blend-overcoat',
    price: 249.00,
    description: 'Premium wool blend overcoat with satin lining. Tailored fit for a sophisticated look.',
    categoryId: 'cat-4',
    isNewArrival: false,
    status: 'Limited',
    images: [],
    colors: [
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Camel', hex: '#C19A6B' },
    ],
    sizes: ['M', 'L', 'XL'],
    createdAt: '2025-04-10T10:00:00Z',
    updatedAt: '2025-04-10T10:00:00Z',
  },
  {
    id: 'prod-5',
    title: 'Leather Crossbody Bag',
    handle: 'leather-crossbody-bag',
    price: 89.00,
    description: 'Genuine leather crossbody bag with adjustable strap. Multiple compartments for daily essentials.',
    categoryId: 'cat-5',
    isNewArrival: true,
    status: 'In Stock',
    images: [],
    colors: [
      { name: 'Tan', hex: '#D2B48C' },
      { name: 'Black', hex: '#000000' },
    ],
    sizes: [],
    createdAt: '2025-06-10T10:00:00Z',
    updatedAt: '2025-06-10T10:00:00Z',
  },
  {
    id: 'prod-6',
    title: 'Linen Summer Dress',
    handle: 'linen-summer-dress',
    price: 79.00,
    description: 'Lightweight linen dress perfect for warm weather. Relaxed fit with side pockets.',
    categoryId: 'cat-2',
    isNewArrival: false,
    status: 'Out of Stock',
    images: [],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Sky Blue', hex: '#87CEEB' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    createdAt: '2025-03-15T10:00:00Z',
    updatedAt: '2025-03-15T10:00:00Z',
  },
]

const STORAGE_KEY_PRODUCTS = 'admin_products'
const STORAGE_KEY_CATEGORIES = 'admin_categories'

function generateId(): string {
  return `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

// ── Hook ────────────────────────────────────────────────────────────────────

export function useAdminStore(): AdminStore {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [categories, setCategories] = useState<AdminCategory[]>([])
  const [initialized, setInitialized] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(STORAGE_KEY_PRODUCTS)
      const storedCategories = localStorage.getItem(STORAGE_KEY_CATEGORIES)

      if (storedProducts) {
        setProducts(JSON.parse(storedProducts))
      } else {
        setProducts(SAMPLE_PRODUCTS)
        localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(SAMPLE_PRODUCTS))
      }

      if (storedCategories) {
        setCategories(JSON.parse(storedCategories))
      } else {
        setCategories(SAMPLE_CATEGORIES)
        localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(SAMPLE_CATEGORIES))
      }
    } catch {
      setProducts(SAMPLE_PRODUCTS)
      setCategories(SAMPLE_CATEGORIES)
    }
    setInitialized(true)
  }, [])

  // Persist products
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products))
    }
  }, [products, initialized])

  // Persist categories
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories))
    }
  }, [categories, initialized])

  const addProduct = useCallback(
    (productData: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>): AdminProduct => {
      const now = new Date().toISOString()
      const newProduct: AdminProduct = {
        ...productData,
        id: generateId(),
        handle: slugify(productData.title),
        createdAt: now,
        updatedAt: now,
      }
      setProducts((prev) => [newProduct, ...prev])
      return newProduct
    },
    []
  )

  const updateProduct = useCallback((id: string, updates: Partial<AdminProduct>) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, ...updates, updatedAt: new Date().toISOString() }
          : p
      )
    )
  }, [])

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const getProduct = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products]
  )

  const addCategory = useCallback(
    (categoryData: Omit<AdminCategory, 'id' | 'createdAt'>): AdminCategory => {
      const newCategory: AdminCategory = {
        ...categoryData,
        id: generateId(),
        createdAt: new Date().toISOString(),
      }
      setCategories((prev) => [newCategory, ...prev])
      return newCategory
    },
    []
  )

  const updateCategory = useCallback((id: string, updates: Partial<AdminCategory>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    )
  }, [])

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const getCategory = useCallback(
    (id: string) => categories.find((c) => c.id === id),
    [categories]
  )

  const getProductCountByCategory = useCallback(
    (categoryId: string) => products.filter((p) => p.categoryId === categoryId).length,
    [products]
  )

  return {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getProductCountByCategory,
  }
}
