import { createApp } from './app.js';

const PORT = process.env.PORT ?? '3001';
const app = createApp();

const server = app.listen(Number(PORT), () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

function shutdown() {
  console.log('Shutting down server...');

  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);