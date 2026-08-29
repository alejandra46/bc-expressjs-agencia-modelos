import type { Model, CreateModelDto, UpdateModelDto } from './types.js';

// Store en memoria
const models: Model[] = [];
let nextId = 1;

// Obtener todos los modelos
export function getAll(): Model[] {
  return models;
}

// Buscar un modelo por su id
export function getById(id: number): Model | undefined {
  return models.find(model => model.id === id);
}

// Crear un modelo
export function create(data: CreateModelDto): Model {
  const newModel: Model = {
    id: nextId++,
    ...data
  };

  models.push(newModel);

  return newModel;
}

// Actualizar un modelo
export function update(id: number, data: UpdateModelDto): Model | undefined {
  const model = models.find(model => model.id === id);

  if (!model) {
    return undefined;
  }

  Object.assign(model, data);

  return model;
}

// Eliminar un modelo
export function remove(id: number): boolean {
  const index = models.findIndex(model => model.id === id);

  if (index === -1) {
    return false;
  }

  models.splice(index, 1);

  return true;
}