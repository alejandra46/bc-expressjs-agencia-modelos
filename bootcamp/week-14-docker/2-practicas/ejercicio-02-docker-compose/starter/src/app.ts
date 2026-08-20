import express from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma';

export const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', db: 'connected', uptime: process.uptime() });
  } catch {
    res.status(503).json({ status: 'error', db: 'disconnected' });
  }
});

app.get('/api/v1/tasks', async (_req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(tasks);
  } catch (err) { next(err); }
});

app.post('/api/v1/tasks', async (req, res, next) => {
  try {
    const { title } = req.body as { title?: string };
    if (!title) { res.status(400).json({ error: 'title required' }); return; }
    const task = await prisma.task.create({ data: { title } });
    res.status(201).json(task);
  } catch (err) { next(err); }
});

app.patch('/api/v1/tasks/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { done } = req.body as { done?: boolean };
    const task = await prisma.task.update({ where: { id }, data: { done } });
    res.json(task);
  } catch (err) { next(err); }
});

app.delete('/api/v1/tasks/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await prisma.task.delete({ where: { id } });
    res.status(204).send();
  } catch (err) { next(err); }
});

app.use((_err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.status(500).json({ error: 'Internal server error' });
});
