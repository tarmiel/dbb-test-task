interface ErrorProps {
  message?: string;
}

export function Error({ message }: ErrorProps) {
  if (!message) return null;

  return (
    <p role="alert" className="text-sm font-medium text-destructive">
      {message}
    </p>
  );
}
