// src/services/products.service.ts — Lógica de negocio
// Delega el acceso a datos al repositorio

import * as repo from '../repositories/products.repository';
import { AppError } from '../errors/AppError';
import { CreateProductDto, UpdateProductDto } from '../schemas/product.schema';

export async function listProducts(page: number, limit: number) {
  return repo.findAll(page, limit);
}

export async function getProduct(id: string) {
  const product = await repo.findById(id);
  if (!product) {
    throw new AppError(404, 'Producto no encontrado');
  }
  return product;
}

export async function createProduct(data: CreateProductDto) {
  return repo.create(data);
}

export async function updateProduct(id: string, data: UpdateProductDto) {
  return repo.update(id, data);
}

export async function deleteProduct(id: string) {
  return repo.remove(id);
}
