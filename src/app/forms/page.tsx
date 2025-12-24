import { Plus } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { AppPaths } from '@/config/app-paths';
import { FormsFilter } from '@/features/forms/components/forms-filter';
import { FormsTable } from '@/features/forms/components/forms-table';
import { getForms } from '@/features/forms/data/queries';
import { parseSortOrder } from '@/features/forms/utils/parse-form-sort-order';
import { parseStatusFilter } from '@/features/forms/utils/parse-form-status-filter';
import { cn } from '@/utils/cn';
import { isAdmin } from '@/features/auth/utils/auth-cookies.server';

export const metadata: Metadata = {
  title: 'Forms',
  description: 'View all the forms'
};

interface FormsPageProps {
  searchParams: Promise<{ status?: string; sort?: string }>;
}

export default async function FormsPage({ searchParams }: FormsPageProps) {
  const { status, sort } = await searchParams;
  const isUserAdmin = await isAdmin();

  const forms = await getForms({
    status: parseStatusFilter(status),
    sortOrder: parseSortOrder(sort)
  });

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Forms</h1>
        <div className="flex items-center gap-3 flex-wrap-reverse justify-end">
          <FormsFilter />
          {isUserAdmin && (
            <Link href={AppPaths.app.forms_new.getHref()} className={cn(buttonVariants(), 'gap-1')}>
              <Plus className="size-4" />
              New Form
            </Link>
          )}
        </div>
      </div>

      <FormsTable forms={forms} isAdmin={isUserAdmin} />
    </div>
  );
}
