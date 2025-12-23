import type { FormRecord } from '@/features/forms/schemas/form-schema';

export async function getForm(id: string): Promise<FormRecord | null> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const url = new URL(`/api/forms/${id}`, baseUrl);

  const res = await fetch(url.toString(), { cache: 'no-store' });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error('Failed to fetch form');
  }

  return res.json();
}
