import { z } from 'zod';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { USER_ROLE } from '@/features/auth/schemas/auth-schema';
import { formsStore } from '@/features/forms/data/forms-store';
import {
  formInputSchema,
  FORM_STATUS_VALUES,
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
  const cookieStore = await cookies();
  const role = cookieStore.get('role')?.value;

  if (role !== USER_ROLE.ADMIN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const body = await request.json();
  const result = formInputSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: z.treeifyError(result.error) }, { status: 400 });
  }

  const created = formsStore.create(result.data);
  return NextResponse.json(created, { status: 201 });
}
