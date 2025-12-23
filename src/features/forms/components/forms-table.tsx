import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { AppPaths } from '@/config/app-paths';
import {
  FORM_STATUS,
  type FormRecord,
  type FormStatus
} from '@/features/forms/schemas/form-schema';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/format-date';
import { Archive, CheckCircle, FileText, Pencil, PenLine } from 'lucide-react';
import Link from 'next/link';

interface FormsTableProps {
  forms: FormRecord[];
  isAdmin?: boolean;
}

const STATUS_CONFIG: Record<FormStatus, { style: string; icon: typeof FileText }> = {
  [FORM_STATUS.DRAFT]: { style: 'bg-yellow-100 text-yellow-800', icon: PenLine },
  [FORM_STATUS.ACTIVE]: { style: 'bg-green-100 text-green-800', icon: CheckCircle },
  [FORM_STATUS.ARCHIVED]: { style: 'bg-gray-100 text-gray-800', icon: Archive }
};

function StatusBadge({ status }: { status: FormStatus }) {
  const { style, icon: Icon } = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
        style
      )}
    >
      <Icon className="size-3" />
      {status}
    </span>
  );
}

export function FormsTable({ forms, isAdmin }: FormsTableProps) {
  if (forms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-12 text-center">
        <FileText className="size-10 text-muted-foreground/50" />
        <p className="text-muted-foreground">No forms found</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden sm:table-cell">Fields</TableHead>
            <TableHead className="hidden sm:table-cell">Updated</TableHead>
            {isAdmin && <TableHead className="text-right"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {forms.map((form) => (
            <TableRow key={form.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{form.title}</p>
                  {form.description && (
                    <p className="line-clamp-3 text-xs text-muted-foreground">{form.description}</p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={form.status} />
              </TableCell>
              <TableCell className="hidden text-muted-foreground sm:table-cell">
                {form.fieldsCount}
              </TableCell>
              <TableCell className="hidden text-muted-foreground sm:table-cell">
                {formatDate(form.updatedAt)}
              </TableCell>
              {isAdmin && (
                <TableCell className="text-right">
                  <Link
                    href={AppPaths.app.form.getHref(form.id)}
                    className="inline-flex items-center gap-1 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <Pencil className="size-3.5" />
                    Edit
                  </Link>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
