import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express';
import { modelsRouter } from './routes/models.routes.js';

export function createApp(): Application {
  const app = express();

  // Parsear JSON
  app.use(express.json());

  // Logger personalizado
  app.use((req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
      const time = Date.now() - start;

      console.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} - ${time}ms`
      );
    });

    next();
  });

  // Health check
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Rutas de modelos
  app.use('/api/v1/models', modelsRouter);

  // Rutas no encontradas
  app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

  // Error handler global
  app.use(
    (
      err: Error,
      _req: Request,
      res: Response,
      _next: NextFunction
    ) => {
      console.error(err);

      res.status(500).json({
        error: 'Internal server error'
      });
    }
  );

  return app;
}