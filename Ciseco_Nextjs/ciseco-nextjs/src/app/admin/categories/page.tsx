'use client'

import AdminTopBar from '@/components/admin/AdminTopBar'
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog'
import { AdminCategory, useAdminStore } from '@/hooks/useAdminStore'
import { Button } from '@/shared/Button/Button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/shared/dialog'
import { Field, Label } from '@/shared/fieldset'
import { Input } from '@/shared/input'
import { Textarea } from '@/shared/textarea'
import {
  PencilSquareIcon,
  PlusIcon,
  ShoppingBagIcon,
  TagIcon,
  TrashIcon,
  PhotoIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useCallback, useRef, useState } from 'react'

interface CategoryFormState {
  name: string
  description: string
  image: string
}

const EMPTY_FORM: CategoryFormState = { name: '', description: '', image: '' }

export default function AdminCategoriesPage() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useAdminStore()
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<CategoryFormState>(EMPTY_FORM)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const openAdd = useCallback(() => {
    setForm(EMPTY_FORM)
    setEditingId(null)
    setModalOpen(true)
  }, [])

  const openEdit = useCallback(
    (cat: AdminCategory) => {
      setForm({ name: cat.name, description: cat.description, image: cat.image })
      setEditingId(cat.id)
      setModalOpen(true)
    },
    []
  )

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setEditingId(null)
    setForm(EMPTY_FORM)
  }, [])

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setForm((prev) => ({ ...prev, image: ev.target!.result as string }))
      }
    }
    reader.readAsDataURL(file)
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (editingId) {
        updateCategory(editingId, form)
      } else {
        addCategory(form)
      }
      closeModal()
    },
    [editingId, form, addCategory, updateCategory, closeModal]
  )

  const handleDelete = useCallback(() => {
    if (deleteTarget) {
      deleteCategory(deleteTarget)
      setDeleteTarget(null)
    }
  }, [deleteTarget, deleteCategory])

  const deleteTargetCat = deleteTarget ? categories.find((c) => c.id === deleteTarget) : null

  return (
    <div>
      <AdminTopBar
        title="Categories"
        subtitle={`${categories.length} categories`}
        actions={
          <Button color="dark" onClick={openAdd}>
            <PlusIcon className="h-4 w-4" />
            Add Category
          </Button>
        }
      />

      <div className="p-4 sm:p-6 lg:p-8">
        {categories.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 py-20 text-center dark:border-neutral-700">
            <TagIcon className="mb-4 h-12 w-12 text-neutral-300 dark:text-neutral-600" />
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
              No categories yet
            </h3>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Create your first category to organize your products.
            </p>
            <Button color="dark" onClick={openAdd} className="mt-6">
              <PlusIcon className="h-4 w-4" />
              Create Category
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => {
              const productCount = products.filter((p) => p.categoryId === cat.id).length
              return (
                <div
                  key={cat.id}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-200 hover:shadow-lg hover:shadow-neutral-200/50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:shadow-neutral-900/50"
                >
                  {/* Category image / placeholder */}
                  <div className="relative h-36 overflow-hidden bg-gradient-to-br from-secondary-50 to-pink-50 dark:from-secondary-500/5 dark:to-pink-500/5">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <TagIcon className="h-12 w-12 text-secondary-200 dark:text-secondary-500/30" />
                      </div>
                    )}
                    {/* Action buttons - visible on hover */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <button
                        onClick={() => openEdit(cat)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-white"
                      >
                        <PencilSquareIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(cat.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-white"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-semibold text-neutral-900 dark:text-white">{cat.name}</h3>
                    {cat.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
                        {cat.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 dark:bg-neutral-700">
                        <ShoppingBagIcon className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
                        <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                          {productCount} {productCount === 1 ? 'product' : 'products'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Add new card */}
            <button
              onClick={openAdd}
              className={clsx(
                'flex min-h-[13rem] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 p-6 text-center',
                'text-neutral-400 transition-all duration-200 hover:border-secondary-400 hover:bg-secondary-50/50 hover:text-secondary-600',
                'dark:border-neutral-700 dark:hover:border-secondary-500 dark:hover:bg-secondary-500/5 dark:hover:text-secondary-400'
              )}
            >
              <PlusIcon className="mb-2 h-8 w-8" />
              <span className="text-sm font-medium">Add Category</span>
            </button>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Dialog open={modalOpen} onClose={closeModal} size="md">
        <DialogTitle>{editingId ? 'Edit Category' : 'Add Category'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <div className="space-y-5">
              <Field>
                <Label>Category Name</Label>
                <Input
                  value={form.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g. Tops & T-Shirts"
                  required
                />
              </Field>

              <Field>
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Brief description of this category..."
                  rows={3}
                />
              </Field>

              <Field>
                <Label>Category Image</Label>
                <div
                  onClick={() => imageInputRef.current?.click()}
                  className={clsx(
                    'relative mt-2 flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-all duration-200',
                    form.image
                      ? 'border-neutral-200 dark:border-neutral-600'
                      : 'border-neutral-300 bg-neutral-50 hover:border-secondary-400 hover:bg-secondary-50/50 dark:border-neutral-600 dark:bg-neutral-800 dark:hover:border-secondary-500'
                  )}
                  style={{ height: form.image ? 'auto' : '9rem' }}
                >
                  {form.image ? (
                    <div className="relative w-full">
                      <img
                        src={form.image}
                        alt="Category preview"
                        className="h-36 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setForm((prev) => ({ ...prev, image: '' }))
                        }}
                        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                      >
                        <XMarkIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <PhotoIcon className="mb-2 h-8 w-8 text-neutral-400" />
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Click to upload image
                      </p>
                    </>
                  )}
                </div>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </Field>
            </div>
          </DialogBody>
          <DialogActions>
            <Button outline type="button" onClick={closeModal}>
              Cancel
            </Button>
            <Button color="dark" type="submit">
              {editingId ? 'Save Changes' : 'Create Category'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Category"
        description={`Are you sure you want to delete "${deleteTargetCat?.name}"? Products in this category will not be deleted, but they will become uncategorized.`}
      />
    </div>
  )
}
