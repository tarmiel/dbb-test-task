'use client';

import { Button } from '@/components/ui/button';
import { Input, Select } from '@/components/ui/form';
import { AppPaths } from '@/config/app-paths';
import {
  getLoginFormDefaults,
  loginInputSchema,
  USER_ROLE,
  type LoginInputData
} from '@/features/auth/schemas/auth-schema';
import { authActionsSelector, useAuthStore } from '@/features/auth/stores/auth-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

const ROLE_OPTIONS = [
  { value: USER_ROLE.INDIVIDUAL, label: 'Individual' },
  { value: USER_ROLE.ADMIN, label: 'Admin' }
];

export function UserLoginForm() {
  const router = useRouter();
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

  const onSubmit = (data: LoginInputData) => {
    document.cookie = `role=${data.role}; path=/`;
    setUser(data.email, data.role);
    router.replace(
      `${redirectTo ? `${decodeURIComponent(redirectTo)}` : AppPaths.app.forms.getHref()}`
    );
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
