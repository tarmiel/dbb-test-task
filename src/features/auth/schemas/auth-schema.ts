import { z } from 'zod';
import type { ValueOf } from '@/types/utils';

export const USER_ROLE = {
  INDIVIDUAL: 'individual',
  ADMIN: 'admin'
} as const;

export type UserRole = ValueOf<typeof USER_ROLE>;
export const USER_ROLE_VALUES = Object.values(USER_ROLE) satisfies UserRole[];

export const loginInputSchema = z.object({
  email: z.email('Invalid email address'),
  role: z.enum(USER_ROLE_VALUES)
});

export type LoginInputData = z.infer<typeof loginInputSchema>;

export const getLoginFormDefaults = (data?: Partial<LoginInputData>): LoginInputData => {
  return {
    email: data?.email ?? '',
    role: data?.role ?? USER_ROLE.INDIVIDUAL
  };
};
