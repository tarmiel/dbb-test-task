import { SortOrder } from '@/types/api';

export function parseSortOrder(sort: string | undefined): SortOrder {
  return sort === 'asc' ? 'asc' : 'desc';
}
