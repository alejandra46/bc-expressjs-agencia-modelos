// Tipos para los modelos de la agencia

export interface Model {
  id: number;
  name: string;
  age: number;
  city: string;
  phone: string;
}

// Datos necesarios para crear un modelo
export type CreateModelDto = Omit<Model, 'id'>;

// Datos permitidos para actualizar un modelo
export type UpdateModelDto = Partial<CreateModelDto>;