// ============================================
// SERVICE — Lógica de negocio
// ============================================

import {
  CreateModelDto,
  UpdateModelDto,
  Model,
  PaginatedResponse,
  PaginationParams,
} from '../types';

import * as repo from '../repositories/models.repository';

export async function findAll(
  params: PaginationParams
): Promise<PaginatedResponse<Model>> {
  const { page, limit } = params;

  const all = await repo.findAll();

  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);

  return {
    data,
    total: all.length,
    page,
    limit,
  };
}

export async function findById(
  id: number
): Promise<Model | undefined> {
  return repo.findById(id);
}

export async function create(dto: CreateModelDto): Promise<Model> {
  return repo.create(dto);
}

export async function update(
  id: number,
  dto: UpdateModelDto
): Promise<Model | undefined> {
  const exists = await repo.findById(id);

  if (!exists) {
    return undefined;
  }

  return repo.update(id, dto);
}

export async function remove(id: number): Promise<boolean> {
  const exists = await repo.findById(id);

  if (!exists) {
    return false;
  }

  return repo.remove(id);
}