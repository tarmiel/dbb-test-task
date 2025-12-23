import type { ReactNode } from 'react';
import type { FieldError } from 'react-hook-form';
import { Error } from '@/components/ui/form/error';
import { Label } from '@/components/ui/form/label';

export interface FieldWrapperProps {
  label?: string;
  error?: FieldError;
  required?: boolean;
  children: ReactNode;
  htmlFor?: string;
}

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'children' | 'htmlFor'>;

export function FieldWrapper({ label, error, required, children, htmlFor }: FieldWrapperProps) {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      {children}
      <Error message={error?.message} />
    </div>
  );
}
