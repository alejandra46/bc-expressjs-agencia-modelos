// src/repositories/categories.repository.ts — CRUD de categorías con include de productos

import { prisma } from '../lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AppError } from '../errors/AppError';
import { CreateCategoryDto, UpdateCategoryDto } from '../schemas/category.schema';

export async function findAll() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { products: true },
  });
}

export async function findById(id: string) {
  return prisma.category.findUnique({
    where: { id },
    include: { products: true },
  });
}

export async function create(data: CreateCategoryDto) {
  try {
    return await prisma.category.create({ data });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new AppError(409, 'Ya existe una categoría con ese nombre');
    }
    throw err;
  }
}

export async function update(id: string, data: UpdateCategoryDto) {
  try {
    return await prisma.category.update({ where: { id }, data });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, 'Categoría no encontrada');
    }
    throw err;
  }
}

export async function remove(id: string) {
  try {
    await prisma.category.delete({ where: { id } });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, 'Categoría no encontrada');
    }
    // P2003 = FK constraint — hay productos asociados y onDelete es Restrict
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2003') {
      throw new AppError(400, 'No se puede eliminar: la categoría tiene productos asociados');
    }
    throw err;
  }
}
