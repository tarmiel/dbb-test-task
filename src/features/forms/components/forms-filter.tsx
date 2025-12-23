'use client';

import { Select } from '@/components/ui/form';
import { FORM_STATUS, type FormStatus } from '@/features/forms/schemas/form-schema';
import type { SortOrder } from '@/types/api';
import { ArrowDownUp, Filter } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const STATUS_OPTIONS: { value: FormStatus | ''; label: string }[] = [
  { value: '', label: 'All Statuses' },
  { value: FORM_STATUS.DRAFT, label: 'Draft' },
  { value: FORM_STATUS.ACTIVE, label: 'Active' },
  { value: FORM_STATUS.ARCHIVED, label: 'Archived' }
];

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'desc', label: 'Newest first' },
  { value: 'asc', label: 'Oldest first' }
];

export function FormsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get('status') ?? '';
  const currentSort = (searchParams.get('sort') as SortOrder) ?? 'desc';

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== (key === 'sort' ? 'desc' : '')) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Filter className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Select
          defaultValue={currentStatus}
          onChange={(e) => updateParams('status', e.target.value)}
          className={'pl-7 pr-3'}
          aria-label="Filter by status"
          options={STATUS_OPTIONS}
        />
      </div>

      <div className="relative">
        <ArrowDownUp className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Select
          defaultValue={currentSort}
          onChange={(e) => updateParams('sort', e.target.value)}
          className={'pl-7 pr-3'}
          aria-label="Sort by date"
          options={SORT_OPTIONS}
        />
      </div>
    </div>
  );
}
