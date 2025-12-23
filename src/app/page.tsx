import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { AppPaths } from '@/config/app-paths';

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <section className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Manage Your Forms
          <span className="block text-muted-foreground">With Ease</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Create, edit, and organize your forms with our intuitive dashboard. Role-based access
          ensures the right people have the right permissions.
        </p>

        <div className="mt-8 flex gap-4">
          <Link href={AppPaths.auth.login.getHref()}>
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href={AppPaths.app.forms.getHref()}>
            <Button variant="outline" size="lg">
              View Forms
            </Button>
          </Link>
        </div>

        <div className="relative mt-16 w-full max-w-3xl overflow-hidden rounded-xl border border-border shadow-2xl">
          <Image
            src="https://picsum.photos/seed/forms/1200/675"
            alt="Forms Dashboard Preview"
            width={1200}
            height={675}
            className="w-full"
            priority
          />
        </div>
      </section>
    </div>
  );
}
