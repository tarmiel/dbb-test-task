import Link from 'next/link';
import { AppPaths } from '@/config/app-paths';
import { buttonVariants } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="mt-52 flex flex-col items-center font-semibold gap-3">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link
        href={AppPaths.home.getHref()}
        replace
        className={buttonVariants({ variant: 'outline' })}
      >
        Go to Home
      </Link>
    </div>
  );
}
