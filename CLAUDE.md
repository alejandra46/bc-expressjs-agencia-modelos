# CLAUDE.md — bc-expressjs

Bootcamp Express.js Zero to Hero (16 semanas, ~128h, ergrato-dev). Nivel de
salida: backend junior Node.js/Express. Convenciones de contenido pedagógico
(estructura de semana, tono, checklist de nueva semana, stack, objetivos) viven
en [`.github/copilot-instructions.md`](.github/copilot-instructions.md) — léelo
antes de crear o editar contenido de cualquier semana. No se duplican aquí.

## Prompts reutilizables

`.github/prompts/` tiene plantillas para tareas recurrentes — úsalas en vez de
generar contenido libre: `nueva-semana`, `nuevo-ejercicio`, `nueva-teoria`,
`nuevo-proyecto`, `svg-diagrama`, `commit-message`, `security-review`.

## Estructura por semana

```
week-XX-tema/
├── README.md · rubrica-evaluacion.md (30% conocimiento / 40% desempeño / 30% producto)
├── 0-assets/ · 1-teoria/ · 2-practicas/ (2 ejercicios con starter/)
├── 3-proyecto/starter/ · 4-recursos/ · 5-glosario/
```

`solution/` está en `.gitignore` (`**/solution/`) por política anticopia
(dominios únicos por estudiante) — nunca crees ni comitees una carpeta
`solution/` en este repo.

## Reglas que rompen fácil (aprendidas de bugs reales de este repo)

- **Nunca `npm`/`npx`/`yarn`** — siempre `pnpm`. Cada `package.json` fija
  `"packageManager": "pnpm@10.34.5"`.
- **Nunca `^`/`~`/rangos** en ningún `package.json` — versión exacta siempre.
  Ver [`docs/politica-versiones-dependencias.md`](docs/politica-versiones-dependencias.md).
  Si tocas una dependencia compartida entre semanas (`zod`, `prisma`,
  `typescript`, `express`), homogeniza la MISMA versión exacta en todas las
  semanas que la usan — no dejes bloques de semanas en versiones distintas de
  una dependencia mayor (pasó con Zod 3 vs 4 y Prisma 6 vs 7, auditado y
  corregido en 2026-07).
- **Llaves primarias**: toda PK en cualquier `schema.prisma` es
  `id String @id @default(uuid()) @db.Uuid`. Nunca `autoincrement()`, nunca
  `cuid()`. Las FK que la referencian llevan el mismo tipo (`String @db.Uuid`),
  el `:id` de las rutas es `string` (nada de `Number(req.params.id)`) y los
  validadores Zod de FK usan `z.string().uuid()`. Migrado en todo el bootcamp
  en 2026-08.
- **Prisma**: el generador fijado en `schema.prisma` de este repo es
  `prisma-client-js` (estilo Prisma 6), no el generador ESM por defecto de
  Prisma 7. Si algún día se sube la major de `prisma`/`@prisma/client`, hazlo en
  TODAS las semanas que lo usan a la vez y revisa `schema.prisma` + imports de
  `@prisma/client` en cada una — un bump aislado de versión sin tocar el código
  deja el `package.json` mintiendo sobre qué API se está usando realmente.
- Antes de comitear un cambio de dependencia: `pnpm install` + `tsc --noEmit`
  (y tests si el `starter/` los tiene) en al menos un proyecto representativo.
  No dejes `node_modules/`/`pnpm-lock.yaml` de verificación sin limpiar — no se
  commitean (no hay lockfiles en este repo por diseño, cada `starter/` resuelve
  su propio árbol).

## Enlaces

- [docs/](docs/README.md) — setup, política de versiones
- [Checklist de nueva semana](.github/copilot-instructions.md) (sección final)
