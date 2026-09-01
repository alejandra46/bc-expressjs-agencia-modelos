// ============================================
// REPOSITORY — Capa de acceso a datos
// ============================================

import { Model, CreateModelDto, UpdateModelDto } from '../types';

// Datos iniciales de la agencia
const store: Model[] = [
  {
    id: 1,
    name: 'Laura Gómez',
    age: 22,
    height: 1.75,
    city: 'Bogotá',
    available: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Sofía Martínez',
    age: 24,
    height: 1.78,
    city: 'Medellín',
    available: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Valentina Rodríguez',
    age: 21,
    height: 1.72,
    city: 'Cali',
    available: false,
    createdAt: new Date().toISOString(),
  },
];

let nextId = 4;

export async function findAll(): Promise<Model[]> {
  return store.map((model) => ({ ...model }));
}

export async function findById(id: number): Promise<Model | undefined> {
  const model = store.find((model) => model.id === id);

  if (!model) {
    return undefined;
  }

  return { ...model };
}

export async function create(dto: CreateModelDto): Promise<Model> {
  const model: Model = {
    id: nextId++,
    ...dto,
    createdAt: new Date().toISOString(),
  };

  store.push(model);

  return { ...model };
}

export async function update(
  id: number,
  dto: UpdateModelDto
): Promise<Model | undefined> {
  const index = store.findIndex((model) => model.id === id);

  if (index === -1) {
    return undefined;
  }

  store[index] = {
    ...store[index]!,
    ...dto,
  };

  return { ...store[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((model) => model.id === id);

  if (index === -1) {
    return false;
  }

  store.splice(index, 1);

  return true;
}