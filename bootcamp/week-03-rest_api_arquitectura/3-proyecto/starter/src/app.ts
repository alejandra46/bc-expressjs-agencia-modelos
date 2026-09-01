// ============================================
// APP — Configuración Express
// ============================================
import express from 'express';
import { modelsRouter } from './routes/models.routes';
import { ErrorResponse } from './types';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', week: '03', project: 'api-arquitectura' });
});

// Ruta principal del dominio de modelos
app.use('/api/v1/models', modelsRouter);

// Error handler — no modificar
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.message);
  const response: ErrorResponse = {
    error: 'Internal Server Error',
    message: err.message,
  };
  res.status(500).json(response);
});

export default app;
