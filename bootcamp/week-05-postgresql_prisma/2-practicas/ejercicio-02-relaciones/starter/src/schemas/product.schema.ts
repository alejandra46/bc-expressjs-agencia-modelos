import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  price: z.number().positive(),
  stock: z.number().int().min(0).default(0),
  sku: z.string().min(1).max(50).regex(/^[A-Z0-9-]+$/),
  active: z.boolean().default(true),
  categoryId: z.string().uuid().optional(),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
