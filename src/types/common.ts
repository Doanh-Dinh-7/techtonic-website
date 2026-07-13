export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Identifier = string;

export interface BaseEntity {
  id: Identifier;
  createdAt?: string;
  updatedAt?: string;
}
