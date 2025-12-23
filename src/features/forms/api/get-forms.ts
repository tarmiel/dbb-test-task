import type { FormRecord, FormStatus } from '@/features/forms/schemas/form-schema';
import type { SortOrder } from '@/types/api';

export interface GetFormsParams {
  status?: FormStatus;
  sortOrder?: SortOrder;
}

export async function getForms(params?: GetFormsParams): Promise<FormRecord[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const url = new URL('/api/forms', baseUrl);

  if (params?.status) {
    url.searchParams.set('status', params.status);
  }
  if (params?.sortOrder) {
    url.searchParams.set('sortOrder', params.sortOrder);
  }

  const res = await fetch(url.toString(), { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch forms');
  }

  return res.json();
}
