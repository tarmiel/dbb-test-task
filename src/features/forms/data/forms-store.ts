import { Redis } from '@upstash/redis';
import { type FormInputData, type FormRecord } from '../schemas/form-schema';
import seedData from '@/data/forms-seed.json';

const redis = Redis.fromEnv();
const FORMS_KEY = 'app_forms';

class FormsStoreService {
  constructor() {
    this.seed();
  }

  private async seed(): Promise<void> {
    const forms = await redis.get<FormRecord[]>(FORMS_KEY);
    if (forms) return;

    const initial = seedData.map((f) => ({ ...f })) as FormRecord[];
    await redis.set(FORMS_KEY, initial);
  }

  private async getForms(): Promise<FormRecord[]> {
    return (await redis.get<FormRecord[]>(FORMS_KEY)) ?? [];
  }

  async getAll(): Promise<FormRecord[]> {
    const forms = await this.getForms();
    return forms.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  async getById(id: string): Promise<FormRecord | undefined> {
    const forms = await this.getForms();
    return forms.find((form) => form.id === id);
  }

  async create(data: FormInputData): Promise<FormRecord> {
    const forms = await this.getForms();
    const now = new Date().toISOString();

    const newForm: FormRecord = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now
    };

    forms.push(newForm);
    await redis.set(FORMS_KEY, forms);
    return newForm;
  }

  async update(id: string, data: Partial<FormInputData>): Promise<FormRecord | undefined> {
    const forms = await this.getForms();
    const index = forms.findIndex((form) => form.id === id);
    if (index === -1) return undefined;

    forms[index] = {
      ...forms[index],
      ...data,
      updatedAt: new Date().toISOString()
    };

    await redis.set(FORMS_KEY, forms);
    return forms[index];
  }

  async delete(id: string): Promise<boolean> {
    const forms = await this.getForms();
    const index = forms.findIndex((form) => form.id === id);
    if (index === -1) return false;

    forms.splice(index, 1);
    await redis.set(FORMS_KEY, forms);
    return true;
  }

  async reset(): Promise<void> {
    const initial = seedData.map((f) => ({ ...f })) as FormRecord[];
    await redis.set(FORMS_KEY, initial);
  }
}

export const formsStore = new FormsStoreService();
