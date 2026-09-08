// ============================================
// READER — Lee el archivo de datos JSON
// ============================================

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Model } from './types.js';

export async function readItems(): Promise<Model[]> {
  const filePath = join(import.meta.dirname, '..', 'data', 'items.json');

  try {
    const raw = await readFile(filePath, 'utf-8');

    return JSON.parse(raw) as Model[];
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';

    throw new Error(`No se pudo leer el archivo de modelos: ${message}`);
  }
}