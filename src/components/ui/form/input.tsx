import { cn } from '@/utils/cn';
import { useId, type InputHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import {
  FieldWrapper,
  type FieldWrapperPassThroughProps
} from '@/components/ui/form/field-wrapper';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>,
    FieldWrapperPassThroughProps {
  className?: string;
  registration?: Partial<UseFormRegisterReturn>;
}

export function Input({
  className,
  type = 'text',
  label,
  error,
  required,
  registration,
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = props.id ?? generatedId;

  return (
    <FieldWrapper label={label} error={error} required={required} htmlFor={id}>
      <input
        id={id}
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
          'ring-offset-background transition-colors',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-destructive focus-visible:ring-destructive',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        {...registration}
        {...props}
      />
    </FieldWrapper>
  );
}
