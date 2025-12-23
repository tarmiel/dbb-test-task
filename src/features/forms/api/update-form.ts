import { formInputSchema, type FormInputData, type FormRecord } from '@/features/forms/schemas/form-schema';

export async function updateForm(
  id: string,
  data: FormInputData
): Promise<{ data?: FormRecord; error?: string }> {
  const result = formInputSchema.safeParse(data);

  if (!result.success) {
    return { error: 'Invalid form data' };
  }

  const res = await fetch(`/api/forms/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result.data)
  });

  if (!res.ok) {
    const err = await res.json();
    return { error: err.error ?? 'Failed to update form' };
  }

  return { data: await res.json() };
}
