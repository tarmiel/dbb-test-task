'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'destructive';
  onConfirm: () => void;
  isPending?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  onConfirm,
  isPending = false
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
      cancelRef.current?.focus();
    } else {
      dialog.close();
    }
  }, [open]);

  const handleClose = () => {
    if (!isPending) onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !isPending) {
      onOpenChange(false);
    }
  };

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 bg-transparent p-0 backdrop:bg-black/50 text-primary"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
          <h2 id="dialog-title" className="text-lg font-semibold">
            {title}
          </h2>
          <p id="dialog-description" className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <Button ref={cancelRef} variant="outline" onClick={handleClose} disabled={isPending}>
              {cancelLabel}
            </Button>
            <Button
              variant={variant === 'destructive' ? 'destructive' : 'default'}
              onClick={onConfirm}
              disabled={isPending}
            >
              {isPending ? 'Please wait...' : confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
