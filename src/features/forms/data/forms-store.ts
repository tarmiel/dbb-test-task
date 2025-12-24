import { type FormInputData, type FormRecord } from '../schemas/form-schema';
import seedData from '@/data/forms-seed.json';

class FormsStoreService {
  private forms: FormRecord[] = [];

  constructor() {
    this.seed();
  }

  private seed(): void {
    if (this.forms.length > 0) return;

    this.forms = seedData.map((form) => ({ ...form })) as FormRecord[];
  }

  getAll(): FormRecord[] {
    return [...this.forms].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  getById(id: string): FormRecord | undefined {
    return this.forms.find((form) => form.id === id);
  }

  create(data: FormInputData): FormRecord {
    const now = new Date().toISOString();

    const newForm: FormRecord = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now
    };

    this.forms.push(newForm);
    return newForm;
  }

  update(id: string, data: Partial<FormInputData>): FormRecord | undefined {
    const index = this.forms.findIndex((form) => form.id === id);
    if (index === -1) return undefined;

    const updated: FormRecord = {
      ...this.forms[index],
      ...data,
      updatedAt: new Date().toISOString()
    };

    this.forms[index] = updated;
    return updated;
  }

  delete(id: string): boolean {
    const index = this.forms.findIndex((form) => form.id === id);
    if (index === -1) return false;

    this.forms.splice(index, 1);
    return true;
  }

  reset(): void {
    this.forms = [];
    this.seed();
  }
}

const globalForLogger = globalThis as typeof globalThis & { __formsStore?: FormsStoreService };
if (!globalForLogger.__formsStore) {
  globalForLogger.__formsStore = new FormsStoreService();
  console.log('Global forms store initialized');
}
export const formsStore = globalForLogger.__formsStore!;
