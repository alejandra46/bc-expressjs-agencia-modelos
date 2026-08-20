// src/repositories/products.repository.ts — Acceso a datos con Prisma
// Toda interacción con la base de datos ocurre aquí

import { prisma } from '../lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AppError } from '../errors/AppError';
import { CreateProductDto, UpdateProductDto } from '../schemas/product.schema';

interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// ============================================================
// PASO 4A: findAll — Listado paginado de productos
// Descomenta la implementación de abajo
// ============================================================

export async function findAll(page: number, limit: number) {
  // Una petición, dos queries en paralelo usando Promise.all
  // Descomenta las siguientes líneas:
  // const [products, total] = await Promise.all([
  //   prisma.product.findMany({
  //     skip: (page - 1) * limit,
  //     take: limit,
  //     orderBy: { createdAt: 'desc' },
  //   }),
  //   prisma.product.count(),
  // ]);
  // return { data: products, total, page, limit };

  // Implementación temporal — reemplazar con el bloque de arriba
  return { data: [], total: 0, page, limit };
}

// ============================================================
// PASO 4B: findById — Buscar un producto por ID
// Descomenta la implementación de abajo
// ============================================================

export async function findById(id: string) {
  // findUnique retorna null si no existe (NO lanza error)
  // El controller convierte el null en 404
  // Descomenta las siguientes líneas:
  // const product = await prisma.product.findUnique({ where: { id } });
  // return product;

  // Implementación temporal — reemplazar con el bloque de arriba
  return null;
}

// ============================================================
// PASO 5A: create — Crear un producto nuevo
// Descomenta la implementación de abajo
// ============================================================

export async function create(data: CreateProductDto) {
  // P2002 = violación de restricción UNIQUE (sku duplicado)
  // Descomenta el bloque completo:
  // try {
  //   return await prisma.product.create({ data });
  // } catch (err) {
  //   if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
  //     throw new AppError(409, 'El SKU ya existe');
  //   }
  //   throw err;
  // }

  // Implementación temporal — reemplazar con el bloque de arriba
  throw new AppError(501, 'Not implemented');
}

// ============================================================
// PASO 5B: update — Actualizar un producto existente
// Descomenta la implementación de abajo
// ============================================================

export async function update(id: string, data: UpdateProductDto) {
  // P2025 = registro no encontrado (update sobre un ID que no existe)
  // Descomenta el bloque completo:
  // try {
  //   return await prisma.product.update({ where: { id }, data });
  // } catch (err) {
  //   if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
  //     throw new AppError(404, 'Producto no encontrado');
  //   }
  //   throw err;
  // }

  // Implementación temporal — reemplazar con el bloque de arriba
  throw new AppError(501, 'Not implemented');
}

// ============================================================
// PASO 5C: remove — Eliminar un producto
// Descomenta la implementación de abajo
// ============================================================

export async function remove(id: string) {
  // P2025 aplica también a delete — si el ID no existe lanza el error
  // Descomenta el bloque completo:
  // try {
  //   await prisma.product.delete({ where: { id } });
  // } catch (err) {
  //   if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
  //     throw new AppError(404, 'Producto no encontrado');
  //   }
  //   throw err;
  // }

  // Implementación temporal — reemplazar con el bloque de arriba
  throw new AppError(501, 'Not implemented');
}
