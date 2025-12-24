import 'server-only';

import { unstable_noStore as noStore } from 'next/cache';

import { formsStore } from '@/features/forms/data/forms-store';
import type { FormRecord, FormStatus } from '../schemas/form-schema';
import type { SortOrder } from '@/types/api';

export interface GetFormsParams {
  status?: FormStatus;
  sortOrder?: SortOrder;
}

export async function getForms(params?: GetFormsParams): Promise<FormRecord[]> {
  noStore();
  let forms = await formsStore.getAll();

  if (params?.status) {
    forms = forms.filter((form) => form.status === params.status);
  }

  if (params?.sortOrder === 'asc') {
    forms = forms.reverse();
  }

  return forms;
}

export async function getForm(id: string): Promise<FormRecord | null> {
  noStore();
  return (await formsStore.getById(id)) ?? null;
}
