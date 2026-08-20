// src/controllers/products.controller.ts — Capa HTTP
// Valida con Zod, llama al servicio y responde con status codes apropiados

import { Request, Response, NextFunction } from 'express';
import * as service from '../services/products.service';
import { createProductSchema, updateProductSchema } from '../schemas/product.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, Number(req.query['page']) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query['limit']) || 10));
    const result = await service.listProducts(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params['id'];
    const product = await service.getProduct(id);
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = createProductSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ status: 'error', message: parsed.error.flatten() });
      return;
    }
    const product = await service.createProduct(parsed.data);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params['id'];
    const parsed = updateProductSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ status: 'error', message: parsed.error.flatten() });
      return;
    }
    const product = await service.updateProduct(id, parsed.data);
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params['id'];
    await service.deleteProduct(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
