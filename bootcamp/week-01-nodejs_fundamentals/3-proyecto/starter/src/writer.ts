// ============================================
// WRITER — Escribe el reporte en output/report.json
// ============================================

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import type { Report } from './types.js';

export async function writeReport(report: Report): Promise<void> {
  const outputDirectory = join(import.meta.dirname, '..', 'output');
  const outputFile = join(outputDirectory, 'report.json');

  try {
    await mkdir(outputDirectory, { recursive: true });

    const reportData = JSON.stringify(report, null, 2);

    await writeFile(outputFile, reportData, 'utf-8');

    console.log(`Reporte guardado en: ${outputFile}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';

    throw new Error(`No se pudo guardar el reporte: ${message}`);
  }
}