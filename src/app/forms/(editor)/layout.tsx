import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { AppPaths } from '@/config/app-paths';

interface FormEditorLayoutProps {
  children: React.ReactNode;
}

export default async function FormEditorLayout({ children }: FormEditorLayoutProps) {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Link
        href={AppPaths.app.forms.getHref()}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        prefetch={false}
      >
        <ArrowLeft className="size-4" />
        Back to Forms
      </Link>

      {children}
    </div>
  );
}
