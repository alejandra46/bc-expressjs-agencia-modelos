// ============================================
// ROUTES — Mapeo de URLs a controllers
// ============================================

import { Router } from 'express';
import * as controller from '../controllers/models.controller';

export const modelsRouter = Router();

modelsRouter.get('/', controller.getAll);
modelsRouter.get('/:id', controller.getById);
modelsRouter.post('/', controller.create);
modelsRouter.put('/:id', controller.update);
modelsRouter.delete('/:id', controller.remove);