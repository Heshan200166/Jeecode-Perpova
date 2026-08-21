'use client'

import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/shared/dialog'
import { Button } from '@/shared/Button/Button'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface DeleteConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
}

export default function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} size="sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>
        <DialogTitle>{title}</DialogTitle>
      </div>
      <DialogBody>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
      </DialogBody>
      <DialogActions>
        <Button outline onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
