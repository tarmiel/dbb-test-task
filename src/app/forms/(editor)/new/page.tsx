import type { Metadata } from 'next';

import { FormEditor } from '@/features/forms/components/form-editor';

export const metadata: Metadata = {
  title: 'Create Form',
  description: 'Create a new form'
};

export default function NewFormPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Create New Form</h1>
      <FormEditor />
    </>
  );
}
