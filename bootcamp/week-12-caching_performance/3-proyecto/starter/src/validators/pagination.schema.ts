import { z } from 'zod';

// Paginación por cursor — para el endpoint principal GET /items
export const cursorPaginationSchema = z.object({
  cursor: z.string().uuid().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// Parámetros de filtro opcionales — adaptar al dominio
export const itemFilterSchema = z.object({
  category: z.string().optional(),
  search: z.string().max(100).optional(),
});

export const paginatedQuerySchema = cursorPaginationSchema.merge(itemFilterSchema);

export type CursorPaginationDto = z.infer<typeof cursorPaginationSchema>;
export type PaginatedQueryDto = z.infer<typeof paginatedQuerySchema>;
