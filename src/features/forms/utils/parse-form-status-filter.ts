import { FORM_STATUS_VALUES, type FormStatus } from '@/features/forms/schemas/form-schema';

export function parseStatusFilter(status: string | undefined): FormStatus | undefined {
  if (status && FORM_STATUS_VALUES.includes(status as FormStatus)) {
    return status as FormStatus;
  }
  return undefined;
}
