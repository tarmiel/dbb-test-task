import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { isAdmin } from '@/features/auth/utils/auth-cookies.server';
import { formsStore } from '@/features/forms/data/forms-store';
import {
  FORM_STATUS_VALUES,
  formInputSchema,
  type FormStatus
} from '@/features/forms/schemas/form-schema';
import type { SortOrder } from '@/types/api';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get('status') as FormStatus | null;
  const sortOrder = (searchParams.get('sortOrder') as SortOrder) ?? 'desc';

  let forms = formsStore.getAll();

  // Filter by status
  if (status && FORM_STATUS_VALUES.includes(status)) {
    forms = forms.filter((form) => form.status === status);
  }

  // Sort by updatedAt
  forms.sort((a, b) => {
    const diff = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    return sortOrder === 'asc' ? diff : -diff;
  });

  return NextResponse.json(forms);
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const body = await request.json();
  const result = formInputSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: z.treeifyError(result.error) }, { status: 400 });
  }

  const created = formsStore.create(result.data);
  revalidatePath('/forms');
  return NextResponse.json(created, { status: 201 });
}
