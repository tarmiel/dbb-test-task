import { UserLoginForm } from '@/features/auth/components/user-login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Sign In</h1>
          <p className="text-muted-foreground mt-2">
            Enter your credentials to access the dashboard
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-8">
          <UserLoginForm />
        </div>
      </div>
    </div>
  );
}
