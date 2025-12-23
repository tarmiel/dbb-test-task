'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input, Select, Textarea } from '@/components/ui/form';
import { AppPaths } from '@/config/app-paths';
import { useToastStore, toastActionsSelector } from '@/stores/toast';
import { createForm } from '@/features/forms/api/create-form';
import { updateForm } from '@/features/forms/api/update-form';
import {
  formInputSchema,
  FORM_STATUS,
  type FormInputData,
  type FormRecord,
  getFormDefaults
} from '@/features/forms/schemas/form-schema';

const STATUS_OPTIONS = [
  { value: FORM_STATUS.DRAFT, label: 'Draft' },
  { value: FORM_STATUS.ACTIVE, label: 'Active' },
  { value: FORM_STATUS.ARCHIVED, label: 'Archived' }
];

interface FormEditorProps {
  form?: FormRecord;
}

export function FormEditor({ form }: FormEditorProps) {
  const router = useRouter();
  const { addToast } = useToastStore(toastActionsSelector);
  const [isPending, setIsPending] = useState(false);
  const isEditing = !!form;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputData>({
    resolver: zodResolver(formInputSchema),
    defaultValues: getFormDefaults(form)
  });

  const onSubmit = async (data: FormInputData) => {
    setIsPending(true);
    const result = isEditing ? await updateForm(form.id, data) : await createForm(data);

    if (result.error) {
      addToast(result.error, 'error');
      setIsPending(false);
      return;
    }

    addToast(isEditing ? 'Form updated successfully' : 'Form created successfully', 'success');
    router.push(AppPaths.app.forms.getHref());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Title"
        placeholder="Enter form title"
        error={errors.title}
        registration={register('title')}
        required
      />

      <Textarea
        label="Description"
        placeholder="Enter description"
        error={errors.description}
        registration={register('description')}
      />

      <Input
        type="number"
        label="Fields Count"
        placeholder="0"
        error={errors.fieldsCount}
        registration={register('fieldsCount', { valueAsNumber: true })}
        min={0}
        max={50}
        required
      />

      <Select
        label="Status"
        options={STATUS_OPTIONS}
        error={errors.status}
        registration={register('status')}
        required
      />

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : isEditing ? 'Update Form' : 'Create Form'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(AppPaths.app.forms.getHref())}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
