// ============================================
// ENTRY POINT — Orquesta todo el flujo
// ============================================

import { readItems } from './reader.js';
import { filterByCategory, calculateSummary } from './processor.js';
import { writeReport } from './writer.js';
import type { Report } from './types.js';

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const categoryIndex = args.indexOf('--category');

  const categoryFilter: string | null =
    categoryIndex !== -1 ? args[categoryIndex + 1] ?? null : null;

  try {
    const items = await readItems();

    const filteredItems = filterByCategory(items, categoryFilter);

    const summary = calculateSummary(filteredItems);

    const report: Report = {
      generatedAt: new Date().toISOString(),
      appliedFilter: categoryFilter,
      summary,
      items: filteredItems
    };

    console.log('\n===== RESUMEN DE MODELOS =====');
    console.log(`Total de modelos: ${summary.total}`);
    console.log(`Modelos activos: ${summary.active}`);
    console.log(`Modelos inactivos: ${summary.inactive}`);
    console.log(`Precio promedio: $${summary.averagePrice}`);
    console.log(`Categorías: ${summary.categories.join(', ')}`);

    await writeReport(report);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';

    console.error(`\nError: ${message}`);
    process.exit(1);
  }
}

main();