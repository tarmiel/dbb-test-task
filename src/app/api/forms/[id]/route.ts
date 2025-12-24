import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { isAdmin } from '@/features/auth/utils/auth-cookies.server';
import { formsStore } from '@/features/forms/data/forms-store';
import { formInputSchema } from '@/features/forms/schemas/form-schema';

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const form = formsStore.getById(id);

  if (!form) {
    return NextResponse.json({ error: 'Form not found' }, { status: 404 });
  }

  return NextResponse.json(form);
}

export async function PUT(request: Request, { params }: RouteParams) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const result = formInputSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: z.treeifyError(result.error) }, { status: 400 });
  }

  const updated = formsStore.update(id, result.data);

  if (!updated) {
    return NextResponse.json({ error: 'Form not found' }, { status: 404 });
  }

  revalidatePath('/forms');
  revalidatePath(`/forms/${id}`);
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = await params;
  const deleted = formsStore.delete(id);

  if (!deleted) {
    return NextResponse.json({ error: 'Form not found' }, { status: 404 });
  }

  revalidatePath('/forms');
  return new NextResponse(null, { status: 204 });
}
