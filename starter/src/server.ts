// ============================================
// SERVER — Entry point
// ============================================
import app from './app';

const PORT = parseInt(process.env['PORT'] ?? '3001', 10);

app.listen(PORT, () => {
  console.log(`[server] Running on http://localhost:${PORT}`);
  console.log(`[server] Health: http://localhost:${PORT}/health`);
  console.log(`[server] API v1: http://localhost:${PORT}/api/v1/models`);
});