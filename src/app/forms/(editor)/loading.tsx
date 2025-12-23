import { Spinner } from '@/components/ui/spinner';

export default function FormLoading() {
  return (
    <div className="w-full mx-auto flex justify-center px-4 py-8">
      <Spinner className="h-12 w-12" />
    </div>
  );
}
