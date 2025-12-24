'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { AppPaths } from '@/config/app-paths';
import { useToastStore, toastActionsSelector } from '@/stores/toast';
import { useDisclosure } from '@/hooks/use-disclosure';
import { deleteForm } from '@/features/forms/api/delete-form';

interface DeleteFormButtonProps {
  formId: string;
}

export function DeleteFormButton({ formId }: DeleteFormButtonProps) {
  const router = useRouter();
  const { addToast } = useToastStore(toastActionsSelector);
  const [isPending, setIsPending] = useState(false);
  const { isOpen, open, close } = useDisclosure();

  const handleDelete = async () => {
    setIsPending(true);
    const result = await deleteForm(formId);

    if (result.error) {
      addToast(result.error, 'error');
      setIsPending(false);
      close();
      return;
    }

    addToast('Form deleted successfully', 'success');
    router.push(AppPaths.app.forms.getHref());
  };

  return (
    <>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={open}
        disabled={isPending}
      >
        <Trash2 className="mr-1 size-4" />
        Delete
      </Button>
      <ConfirmDialog
        open={isOpen}
        onOpenChange={(v) => (v ? open() : close())}
        title="Delete form"
        description="Are you sure you want to delete this form? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        isPending={isPending}
      />
    </>
  );
}
