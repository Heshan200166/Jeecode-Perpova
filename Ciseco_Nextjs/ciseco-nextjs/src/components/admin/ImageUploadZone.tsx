'use client'

import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useCallback, useRef, useState } from 'react'

interface ImageUploadZoneProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
  className?: string
}

export default function ImageUploadZone({
  images,
  onChange,
  maxImages = 6,
  className,
}: ImageUploadZoneProps) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return
      const remaining = maxImages - images.length
      const newFiles = Array.from(files).slice(0, remaining)

      const newImages: string[] = []
      let loadedCount = 0

      newFiles.forEach((file) => {
        if (!file.type.startsWith('image/')) return
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string)
          }
          loadedCount++
          if (loadedCount === newFiles.length) {
            onChange([...images, ...newImages])
          }
        }
        reader.readAsDataURL(file)
      })
    },
    [images, maxImages, onChange]
  )

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  const removeImage = useCallback(
    (index: number) => {
      onChange(images.filter((_, i) => i !== index))
    },
    [images, onChange]
  )

  return (
    <div className={className}>
      {/* Upload Zone */}
      {images.length < maxImages && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={clsx(
            'relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 transition-all duration-200',
            dragActive
              ? 'border-secondary-500 bg-secondary-50 dark:bg-secondary-500/5'
              : 'border-neutral-300 bg-neutral-50 hover:border-secondary-400 hover:bg-secondary-50/50 dark:border-neutral-600 dark:bg-neutral-800 dark:hover:border-secondary-500 dark:hover:bg-secondary-500/5'
          )}
        >
          <PhotoIcon className="mb-3 h-10 w-10 text-neutral-400 dark:text-neutral-500" />
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <span className="text-secondary-600 dark:text-secondary-400">Click to upload</span> or drag and drop
          </p>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            PNG, JPG, WEBP up to 5MB ({images.length}/{maxImages})
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700"
            >
              <img
                src={src}
                alt={`Product image ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 hover:bg-red-600"
              >
                <XMarkIcon className="h-3.5 w-3.5" />
              </button>
              {index === 0 && (
                <span className="absolute bottom-1.5 left-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                  Main
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
