import { FORM_STATUS, type FormInputData, type FormRecord } from '../schemas/form-schema';

const SEED_DATA: FormRecord[] = [
  {
    id: '1',
    title: 'Contact Form',
    description: 'Basic contact form for website',
    fieldsCount: 5,
    status: FORM_STATUS.ACTIVE,
    createdAt: '2025-12-21T10:00:00Z',
    updatedAt: '2025-12-22T15:30:00Z'
  },
  {
    id: '2',
    title: 'Newsletter Signup',
    description: 'Email subscription form',
    fieldsCount: 2,
    status: FORM_STATUS.DRAFT,
    createdAt: '2025-12-21T09:00:00Z',
    updatedAt: '2025-12-22T11:00:00Z'
  },
  {
    id: '3',
    title: 'Customer Feedback',
    description: 'Feedback survey for customers',
    fieldsCount: 10,
    status: FORM_STATUS.ARCHIVED,
    createdAt: '2025-12-21T14:00:00Z',
    updatedAt: '2025-12-22T16:45:00Z'
  }
];

class FormsStore {
  private forms: FormRecord[] = [...SEED_DATA];

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
}

export const formsStore = new FormsStore();
