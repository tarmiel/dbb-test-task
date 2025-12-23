export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type SortOrder = 'asc' | 'desc';
