'use client';

import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

import { cn } from '@/utils/cn';
import {
  useToastStore,
  toastsSelector,
  toastActionsSelector
} from '@/stores/toast';

const TOAST_DURATION = 5000;

export function ToastContainer() {
  const toasts = useToastStore(toastsSelector);
  const { removeToast } = useToastStore(toastActionsSelector);

  useEffect(() => {
    if (toasts.length === 0) return;

    const latestToast = toasts[toasts.length - 1];
    const timer = setTimeout(() => {
      removeToast(latestToast.id);
    }, TOAST_DURATION);

    return () => clearTimeout(timer);
  }, [toasts, removeToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          className={cn(
            'flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg',
            'animate-in slide-in-from-right-full fade-in duration-200',
            toast.type === 'success' && 'bg-green-900/90 text-green-100',
            toast.type === 'error' && 'bg-destructive text-destructive-foreground'
          )}
        >
          {toast.type === 'success' ? (
            <CheckCircle className="size-4 shrink-0" />
          ) : (
            <AlertCircle className="size-4 shrink-0" />
          )}
          <span className="text-sm">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 rounded p-1 hover:bg-white/10 transition-colors"
            aria-label="Dismiss"
          >
            <X className="size-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
