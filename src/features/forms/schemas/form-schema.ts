import { z } from 'zod';
import type { ValueOf } from '@/types/utils';
import type { Entity } from '@/types/api';

export const FORM_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  ARCHIVED: 'archived'
} as const;

export type FormStatus = ValueOf<typeof FORM_STATUS>;
export const FORM_STATUS_VALUES = Object.values(FORM_STATUS) satisfies FormStatus[];

export const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  fieldsCount: z.number().int().min(0).max(50),
  status: z.enum(FORM_STATUS_VALUES)
});

export type FormData = z.infer<typeof formSchema>;
export type FormRecord = Entity<FormData>;
