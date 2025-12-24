'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input, Select } from '@/components/ui/form';
import {
  getLoginFormDefaults,
  loginInputSchema,
  USER_ROLE,
  type LoginInputData
} from '@/features/auth/schemas/auth-schema';
import { authActionsSelector, useAuthStore } from '@/features/auth/stores/auth-store';
import { loginAction } from '../actions/login';

const ROLE_OPTIONS = [
  { value: USER_ROLE.INDIVIDUAL, label: 'Individual' },
  { value: USER_ROLE.ADMIN, label: 'Admin' }
];

export function UserLoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo');

  const { setUser } = useAuthStore(authActionsSelector);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginInputData>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: getLoginFormDefaults()
  });

  const onSubmit = async (data: LoginInputData) => {
    setUser(data.email, data.role);

    await loginAction(data, redirectTo);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        type="email"
        label="Email"
        placeholder="name@example.com"
        error={errors.email}
        registration={register('email')}
        required
      />

      <Select
        label="Role"
        options={ROLE_OPTIONS}
        error={errors.role}
        registration={register('role')}
      />

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
}
