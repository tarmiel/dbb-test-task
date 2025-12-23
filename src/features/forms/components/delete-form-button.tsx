'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AppPaths } from '@/config/app-paths';
import { useToastStore, toastActionsSelector } from '@/stores/toast';
import { deleteForm } from '@/features/forms/api/delete-form';

interface DeleteFormButtonProps {
  formId: string;
}

export function DeleteFormButton({ formId }: DeleteFormButtonProps) {
  const router = useRouter();
  const { addToast } = useToastStore(toastActionsSelector);
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this form?')) {
      return;
    }

    setIsPending(true);
    const result = await deleteForm(formId);

    if (result.error) {
      addToast(result.error, 'error');
      setIsPending(false);
      return;
    }

    addToast('Form deleted successfully', 'success');
    router.push(AppPaths.app.forms.getHref());
  };

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash2 className="mr-1 size-4" />
      {isPending ? 'Deleting...' : 'Delete'}
    </Button>
  );
}
