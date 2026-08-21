'use client'

import { AdminCategory, AdminProduct, AdminProductVariantColor } from '@/hooks/useAdminStore'
import { Button } from '@/shared/Button/Button'
import { Field, Label } from '@/shared/fieldset'
import { Input } from '@/shared/input'
import { Select } from '@/shared/select'
import { Textarea } from '@/shared/textarea'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import ImageUploadZone from './ImageUploadZone'

const ALL_SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL']

const STATUS_OPTIONS: AdminProduct['status'][] = ['In Stock', 'Out of Stock', 'Limited']

interface ProductFormProps {
  initialData?: AdminProduct
  categories: AdminCategory[]
  onSubmit: (data: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
  submitLabel?: string
}

export default function ProductForm({
  initialData,
  categories,
  onSubmit,
  onCancel,
  submitLabel = 'Save Product',
}: ProductFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '')
  const [price, setPrice] = useState(initialData?.price?.toString() ?? '')
  const [description, setDescription] = useState(initialData?.description ?? '')
  const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? '')
  const [isNewArrival, setIsNewArrival] = useState(initialData?.isNewArrival ?? false)
  const [status, setStatus] = useState<AdminProduct['status']>(initialData?.status ?? 'In Stock')
  const [images, setImages] = useState<string[]>(initialData?.images?.map((i) => i.src) ?? [])
  const [colors, setColors] = useState<AdminProductVariantColor[]>(initialData?.colors ?? [])
  const [sizes, setSizes] = useState<string[]>(initialData?.sizes ?? [])
  const [newColorName, setNewColorName] = useState('')
  const [newColorHex, setNewColorHex] = useState('#000000')

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit({
        title,
        handle: title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-'),
        price: parseFloat(price) || 0,
        description,
        categoryId,
        isNewArrival,
        status,
        images: images.map((src, i) => ({ src, alt: `${title} image ${i + 1}` })),
        colors,
        sizes,
      })
    },
    [title, price, description, categoryId, isNewArrival, status, images, colors, sizes, onSubmit]
  )

  const addColor = useCallback(() => {
    if (!newColorName.trim()) return
    setColors((prev) => [...prev, { name: newColorName.trim(), hex: newColorHex }])
    setNewColorName('')
    setNewColorHex('#000000')
  }, [newColorName, newColorHex])

  const removeColor = useCallback((index: number) => {
    setColors((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const toggleSize = useCallback((size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }, [])

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Product Info Card */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
          Product Information
        </h3>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Basic details about your product
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Field className="sm:col-span-2">
            <Label>Product Name</Label>
            <Input
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              placeholder="e.g. Classic Cotton T-Shirt"
              required
            />
          </Field>

          <Field>
            <Label>Price (USD)</Label>
            <Input
              type="number"
              value={price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
              placeholder="0.00"
              required
            />
          </Field>

          <Field>
            <Label>Category</Label>
            <Select
              value={categoryId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </Field>

          <Field>
            <Label>Status</Label>
            <Select
              value={status}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as AdminProduct['status'])}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Field>

          <Field>
            <Label>New Arrival</Label>
            <div className="mt-2">
              <button
                type="button"
                onClick={() => setIsNewArrival(!isNewArrival)}
                className={clsx(
                  'relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2',
                  isNewArrival ? 'bg-secondary-600' : 'bg-neutral-300 dark:bg-neutral-600'
                )}
              >
                <span
                  className={clsx(
                    'pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
                    isNewArrival ? 'translate-x-5' : 'translate-x-0'
                  )}
                />
              </button>
              <span className="ml-3 text-sm text-neutral-600 dark:text-neutral-400">
                {isNewArrival ? 'Marked as new arrival' : 'Not a new arrival'}
              </span>
            </div>
          </Field>

          <Field className="sm:col-span-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe your product..."
            />
          </Field>
        </div>
      </div>

      {/* Images Card */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
          Product Images
        </h3>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Upload up to 6 product images. The first image will be the main image.
        </p>
        <div className="mt-4">
          <ImageUploadZone images={images} onChange={setImages} maxImages={6} />
        </div>
      </div>

      {/* Variants Card */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
          Variants
        </h3>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Add color and size options for this product
        </p>

        {/* Colors */}
        <div className="mt-6">
          <label className="text-sm/6 font-medium text-neutral-950 dark:text-white">Colors</label>
          <div className="mt-3 flex flex-wrap gap-2">
            {colors.map((color, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 py-1 pl-1.5 pr-2.5 text-sm dark:border-neutral-600 dark:bg-neutral-700"
              >
                <span
                  className="inline-block h-5 w-5 rounded-full border border-neutral-300 dark:border-neutral-500"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-neutral-700 dark:text-neutral-300">{color.name}</span>
                <button
                  type="button"
                  onClick={() => removeColor(index)}
                  className="ml-0.5 text-neutral-400 hover:text-red-500"
                >
                  <XMarkIcon className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input
              type="color"
              value={newColorHex}
              onChange={(e) => setNewColorHex(e.target.value)}
              className="h-9 w-9 cursor-pointer rounded-lg border border-neutral-300 p-0.5 dark:border-neutral-600"
            />
            <Input
              value={newColorName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewColorName(e.target.value)}
              placeholder="Color name"
              className="max-w-[200px]"
            />
            <Button type="button" outline onClick={addColor} size="smaller">
              <PlusIcon className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>

        {/* Sizes */}
        <div className="mt-6">
          <label className="text-sm/6 font-medium text-neutral-950 dark:text-white">Sizes</label>
          <p className="text-sm/6 text-neutral-500 dark:text-neutral-400">Select available sizes for this product</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {ALL_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={clsx(
                  'flex h-10 min-w-[2.75rem] items-center justify-center rounded-xl border px-3 text-sm font-medium transition-all duration-200',
                  sizes.includes(size)
                    ? 'border-secondary-500 bg-secondary-50 text-secondary-700 dark:border-secondary-400 dark:bg-secondary-500/10 dark:text-secondary-300'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-500'
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button type="button" outline onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" color="dark">
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
