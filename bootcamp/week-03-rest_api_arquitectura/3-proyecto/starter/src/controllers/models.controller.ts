// ============================================
// CONTROLLER — Interfaz HTTP
// ============================================

import { Request, Response, NextFunction } from 'express';
import * as service from '../services/models.service';
import { CreateModelDto, UpdateModelDto } from '../types';

export async function getAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await service.findAll({ page, limit });

    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);

    const model = await service.findById(id);

    if (!model) {
      res.status(404).json({
        error: 'Not Found',
        message: `Model ${id} not found`,
      });
      return;
    }

    res.json({ data: model });
  } catch (err) {
    next(err);
  }
}

export async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dto = req.body as CreateModelDto;

    const model = await service.create(dto);

    res.status(201).json({ data: model });
  } catch (err) {
    next(err);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const dto = req.body as UpdateModelDto;

    const updated = await service.update(id, dto);

    if (!updated) {
      res.status(404).json({
        error: 'Not Found',
        message: `Model ${id} not found`,
      });
      return;
    }

    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
}

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);

    const removed = await service.remove(id);

    if (!removed) {
      res.status(404).json({
        error: 'Not Found',
        message: `Model ${id} not found`,
      });
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}