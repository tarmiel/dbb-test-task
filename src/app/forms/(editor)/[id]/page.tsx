import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getForm } from '@/features/forms/api/get-form';
import { FormEditor } from '@/features/forms/components/form-editor';
import { DeleteFormButton } from '@/features/forms/components/delete-form-button';

interface EditFormPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EditFormPageProps): Promise<Metadata> {
  const { id } = await params;
  const form = await getForm(id);

  if (!form) {
    return { title: 'Form Not Found' };
  }

  return {
    title: `Edit: ${form.title}`,
    description: form.description || `Edit form: ${form.title}`
  };
}

export default async function EditFormPage({ params }: EditFormPageProps) {
  const { id } = await params;
  const form = await getForm(id);

  if (!form) {
    notFound();
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Form</h1>
        <DeleteFormButton formId={form.id} />
      </div>

      <FormEditor form={form} />
    </>
  );
}
