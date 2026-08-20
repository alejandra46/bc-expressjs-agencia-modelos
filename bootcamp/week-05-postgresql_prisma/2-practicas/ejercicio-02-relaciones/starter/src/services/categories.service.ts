import * as repo from '../repositories/categories.repository';
import { AppError } from '../errors/AppError';
import { CreateCategoryDto, UpdateCategoryDto } from '../schemas/category.schema';

export async function listCategories() {
  return repo.findAll();
}

export async function getCategory(id: string) {
  const category = await repo.findById(id);
  if (!category) throw new AppError(404, 'Categoría no encontrada');
  return category;
}

export async function createCategory(data: CreateCategoryDto) {
  return repo.create(data);
}

export async function updateCategory(id: string, data: UpdateCategoryDto) {
  return repo.update(id, data);
}

export async function deleteCategory(id: string) {
  return repo.remove(id);
}
