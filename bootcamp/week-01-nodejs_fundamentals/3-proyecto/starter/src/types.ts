// ============================================
// TIPOS — Agencia de Modelos
// ============================================

export interface Model {
  id: string;
  name: string;
  category: string;
  price: number;
  age: number;
  city: string;
  active: boolean;
}

// Resumen que el procesador debe calcular
export interface ModelSummary {
  total: number;
  active: number;
  inactive: number;
  averagePrice: number;
  mostExpensive: Model;
  cheapest: Model;
  categories: string[];
}

// Reporte final que se escribirá en output/report.json
export interface Report {
  generatedAt: string;
  appliedFilter: string | null;
  summary: ModelSummary;
  items: Model[];
}