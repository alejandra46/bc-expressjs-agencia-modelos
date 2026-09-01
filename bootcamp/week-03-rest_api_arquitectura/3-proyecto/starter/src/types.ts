// ============================================
// TYPES — Agencia de modelos
// ============================================

export interface Model {
  id: number;
  name: string;
  age: number;
  height: number;
  city: string;
  available: boolean;
  createdAt: string;
}

// DTO para crear — sin campos auto-generados
export type CreateModelDto = Omit<Model, 'id' | 'createdAt'>;

// DTO para actualizar — todos los campos opcionales
export type UpdateModelDto = Partial<CreateModelDto>;

// Contratos de respuesta
export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}