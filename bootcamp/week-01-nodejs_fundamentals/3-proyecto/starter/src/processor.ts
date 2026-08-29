// ============================================
// PROCESSOR — Filtra y calcula estadísticas
// ============================================

import type { Model, ModelSummary } from './types.js';

export function filterByCategory(
  models: Model[],
  categoryFilter: string | null
): Model[] {
  if (categoryFilter === null) {
    return models;
  }

  const filteredModels = models.filter(
    (model) => model.category.toLowerCase() === categoryFilter.toLowerCase()
  );

  if (filteredModels.length === 0) {
    const categories = Array.from(
      new Set(models.map((model) => model.category))
    );

    throw new Error(
      `No se encontraron modelos en la categoría "${categoryFilter}". ` +
      `Categorías disponibles: ${categories.join(', ')}`
    );
  }

  return filteredModels;
}

export function calculateSummary(models: Model[]): ModelSummary {
  const total = models.length;

  const active = models.filter((model) => model.active).length;

  const inactive = models.filter((model) => !model.active).length;

  const totalPrice = models.reduce(
    (sum, model) => sum + model.price,
    0
  );

  const averagePrice =
    total > 0 ? Math.round((totalPrice / total) * 100) / 100 : 0;

  const mostExpensive = models.reduce((expensive, model) =>
    model.price > expensive.price ? model : expensive
  );

  const cheapest = models.reduce((cheap, model) =>
    model.price < cheap.price ? model : cheap
  );

  const categories = Array.from(
    new Set(models.map((model) => model.category))
  );

  return {
    total,
    active,
    inactive,
    averagePrice,
    mostExpensive,
    cheapest,
    categories
  };
}