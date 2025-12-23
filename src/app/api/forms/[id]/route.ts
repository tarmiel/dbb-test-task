import { z } from 'zod';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { USER_ROLE } from '@/features/auth/schemas/auth-schema';
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
  const cookieStore = await cookies();
  const role = cookieStore.get('role')?.value;

  if (role !== USER_ROLE.ADMIN) {
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

  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const cookieStore = await cookies();
  const role = cookieStore.get('role')?.value;

  if (role !== USER_ROLE.ADMIN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = await params;
  const deleted = formsStore.delete(id);

  if (!deleted) {
    return NextResponse.json({ error: 'Form not found' }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
