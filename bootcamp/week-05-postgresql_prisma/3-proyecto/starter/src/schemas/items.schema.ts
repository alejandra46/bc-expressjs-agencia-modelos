// src/schemas/items.schema.ts — Validación Zod para el recurso principal
// ============================================================
// TODO: Define el schema Zod para tu recurso según tu dominio
//
// Lineamientos:
//   - createItemSchema: todos los campos requeridos con validaciones
//   - updateItemSchema: todos opcionales (partial)
//   - Exportar tipos inferidos: CreateItemDto, UpdateItemDto
//
// Ejemplo — Biblioteca (libro):
//
// import { z } from 'zod';
//
// export const createItemSchema = z.object({
//   title:     z.string().min(1).max(200),
//   isbn:      z.string().regex(/^[0-9-]{10,17}$/, 'ISBN inválido'),
//   year:      z.number().int().min(1000).max(new Date().getFullYear()),
//   pages:     z.number().int().positive().optional(),
//   available: z.boolean().default(true),
//   authorId:  z.string().uuid().optional(),  // FK a UUID = string, no number
// });
//
// export const updateItemSchema = createItemSchema.partial();
//
// export type CreateItemDto = z.infer<typeof createItemSchema>;
// export type UpdateItemDto = z.infer<typeof updateItemSchema>;
// ============================================================
