import { cn } from '@/utils/cn';
import { useId, type SelectHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import {
  FieldWrapper,
  type FieldWrapperPassThroughProps
} from '@/components/ui/form/field-wrapper';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'>,
    FieldWrapperPassThroughProps {
  className?: string;
  options: SelectOption[];
  placeholder?: string;
  registration?: Partial<UseFormRegisterReturn>;
}

export function Select({
  className,
  label,
  error,
  required,
  options,
  placeholder,
  registration,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const id = props.id ?? generatedId;

  return (
    <FieldWrapper label={label} error={error} required={required} htmlFor={id}>
      <select
        id={id}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
          'ring-offset-background transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-destructive focus-visible:ring-destructive',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        {...registration}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}
