import { Router } from 'express';
import * as store from '../store.js';
import type { CreateModelDto, UpdateModelDto } from '../types.js';

export const modelsRouter = Router();

// GET /models — Listar todos los modelos
modelsRouter.get('/', (_req, res) => {
  const models = store.getAll();

  res.status(200).json(models);
});

// GET /models/:id — Obtener un modelo por ID
modelsRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const model = store.getById(id);

  if (!model) {
    res.status(404).json({ error: 'Model not found' });
    return;
  }

  res.status(200).json(model);
});

// POST /models — Crear un nuevo modelo
modelsRouter.post('/', (req, res) => {
  const data = req.body as CreateModelDto;
  const model = store.create(data);

  res.status(201).json(model);
});

// PUT /models/:id — Actualizar un modelo
modelsRouter.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const data = req.body as UpdateModelDto;

  const model = store.update(id, data);

  if (!model) {
    res.status(404).json({ error: 'Model not found' });
    return;
  }

  res.status(200).json(model);
});

// DELETE /models/:id — Eliminar un modelo
modelsRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const deleted = store.remove(id);

  if (!deleted) {
    res.status(404).json({ error: 'Model not found' });
    return;
  }

  res.status(204).send();
});