import { formInputSchema, type FormInputData, type FormRecord } from '@/features/forms/schemas/form-schema';

export async function createForm(data: FormInputData): Promise<{ data?: FormRecord; error?: string }> {
  const result = formInputSchema.safeParse(data);

  if (!result.success) {
    return { error: 'Invalid form data' };
  }

  const res = await fetch('/api/forms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result.data)
  });

  if (!res.ok) {
    const err = await res.json();
    return { error: err.error ?? 'Failed to create form' };
  }

  return { data: await res.json() };
}
