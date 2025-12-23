import fs from 'fs';
import path from 'path';
import { type FormInputData, type FormRecord } from '../schemas/form-schema';

const DATA_DIR = path.join(process.cwd(), 'src/data');
const DATA_PATH = path.join(DATA_DIR, 'forms.json');
const SEED_PATH = path.join(DATA_DIR, 'forms-seed.json');

class FormsStoreService {
  constructor() {
    this.init();
  }

  private init(): void {
    try {
      const forms = this.read();
      if (forms.length === 0) {
        this.seed();
      }
    } catch {
      this.seed();
    }
  }

  private read(): FormRecord[] {
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(data);
  }

  private write(forms: FormRecord[]): void {
    fs.writeFileSync(DATA_PATH, JSON.stringify(forms, null, 2));
  }

  private seed(): void {
    const data = fs.readFileSync(SEED_PATH, 'utf-8');
    fs.writeFileSync(DATA_PATH, data);
  }

  getAll(): FormRecord[] {
    return this.read().sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  getById(id: string): FormRecord | undefined {
    return this.read().find((form) => form.id === id);
  }

  create(data: FormInputData): FormRecord {
    const forms = this.read();
    const now = new Date().toISOString();
    const newForm: FormRecord = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now
    };
    forms.push(newForm);
    this.write(forms);
    return newForm;
  }

  update(id: string, data: Partial<FormInputData>): FormRecord | undefined {
    const forms = this.read();
    const index = forms.findIndex((form) => form.id === id);
    if (index === -1) return undefined;

    const updated: FormRecord = {
      ...forms[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    forms[index] = updated;
    this.write(forms);
    return updated;
  }

  delete(id: string): boolean {
    const forms = this.read();
    const index = forms.findIndex((form) => form.id === id);
    if (index === -1) return false;

    forms.splice(index, 1);
    this.write(forms);
    return true;
  }

  reset(): void {
    this.seed();
  }
}

export const formsStore = new FormsStoreService();
