# Ejercicio 02 — Relaciones: Category → Products

## 🎯 Objetivo

Añadir una entidad `Category` con relación 1:N hacia `Product`. Aprenderás a definir relaciones en `schema.prisma`, crear y ejecutar la migración correspondiente, y usar `include` para cargar datos relacionados en una sola query.

## 📋 Requisitos Previos

- Ejercicio 01 completado y funcional
- PostgreSQL corriendo (`docker compose up -d`)
- `prisma migrate dev` ejecutado al menos una vez

## 🗂️ Estructura del Starter

El starter de este ejercicio es una extensión del ejercicio 01. Los archivos nuevos o modificados están marcados con `← PASOS`.

```
starter/
├── package.json               ← igual al ejercicio 01
├── tsconfig.json              ← igual
├── .env.example               ← igual
├── docker-compose.yml         ← igual
├── prisma/
│   ├── schema.prisma          ← PASO 1 y 2 (nueva entidad + FK)
│   └── seed.ts                ← PASO 3 (seed con categorías primero)
└── src/
    ├── lib/prisma.ts           ← dado (singleton)
    ├── errors/AppError.ts      ← dado
    ├── middlewares/            ← dado
    ├── schemas/
    │   ├── product.schema.ts   ← dado
    │   └── category.schema.ts  ← dado (Zod para Category)
    ├── repositories/
    │   ├── products.repository.ts  ← PASO 4 (include category)
    │   └── categories.repository.ts ← dado (CRUD básico)
    ├── services/
    │   ├── products.service.ts     ← dado
    │   └── categories.service.ts   ← dado
    ├── controllers/
    │   ├── products.controller.ts  ← dado
    │   └── categories.controller.ts ← dado
    ├── routes/
    │   ├── products.routes.ts      ← dado
    │   └── categories.routes.ts    ← dado
    ├── app.ts              ← PASO 5 (registrar ruta de categorías)
    └── server.ts           ← dado
```

---

## Paso 1: Añadir el modelo Category en schema.prisma

**Abre `prisma/schema.prisma`** y descomenta el modelo `Category` y los campos de relación en `Product`:

```prisma
model Category {
  id        String    @id @default(uuid()) @db.Uuid
  name      String    @unique
  products  Product[] // Campo virtual — Prisma no genera columna
  createdAt DateTime  @default(now())
}

model Product {
  // ... campos existentes ...
  category   Category? @relation(fields: [categoryId], references: [id])
  categoryId String?   @db.Uuid // FK real en BD — nullable (opcional)
}
```

> La FK `categoryId` es nullable (`String?`) para no romper los productos ya
> existentes, y es `String @db.Uuid` porque debe tener **el mismo tipo que la PK
> a la que apunta** (`Category.id`).

## Paso 2: Migrar la base de datos

Con el schema actualizado, ejecuta la migración:

```bash
pnpm dlx prisma migrate dev --name add-category
```

Prisma generará un archivo `migration.sql` similar a:

```sql
-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "categoryId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey"
    FOREIGN KEY ("categoryId") REFERENCES "Category"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
```

Verifica en Prisma Studio que la tabla `Category` existe y `Product` tiene la columna `categoryId`:

```bash
pnpm dlx prisma studio
```

## Paso 3: Actualizar el seed

**Abre `prisma/seed.ts`** y descomenta el bloque de categorías y la asignación de `categoryId` a los productos:

```ts
// Primero las categorías (para obtener sus IDs)
const perifericos = await prisma.category.create({ data: { name: 'Periféricos' } });
const audio = await prisma.category.create({ data: { name: 'Audio' } });

// Luego los productos con FK a categorías
const products = [
  { name: 'Teclado Mecánico', ..., categoryId: perifericos.id },
  { name: 'Mouse Inalámbrico', ..., categoryId: perifericos.id },
  { name: 'Audífonos USB', ..., categoryId: audio.id },
  // ...
];
```

```bash
pnpm dlx prisma db seed
```

## Paso 4: Incluir la categoría en las consultas

**Abre `src/repositories/products.repository.ts`** y descomenta la opción `include` en `findAll` y `findById`:

```ts
// findAll — incluye la categoría de cada producto (JOIN, no N+1)
const [products, total] = await Promise.all([
  prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: { category: true },  // ← descomenta esta línea
  }),
  prisma.product.count(),
]);

// findById — también incluye la categoría
const product = await prisma.product.findUnique({
  where: { id },
  include: { category: true },  // ← descomenta esta línea
});
```

Prueba que la respuesta incluye la categoría:

```bash
# Copia un id real del listado — es un UUID
curl http://localhost:3000/api/v1/products/3f1a9c2e-5b7d-4e81-9a6f-2c8d0b4e7a15
# Resultado esperado:
# {
#   "id": "3f1a9c2e-5b7d-4e81-9a6f-2c8d0b4e7a15",
#   "name": "Teclado Mecánico",
#   "category": { "id": "8c4b1d90-6e23-4f57-b0a1-9d3e5f7c2b48", "name": "Periféricos", ... },
#   ...
# }
```

## Paso 5: Registrar las rutas de Category

**Abre `src/app.ts`** y descomenta la línea de registro de categorías:

```ts
// import categoriesRouter from './routes/categories.routes'; // ← descomenta
// app.use('/api/v1/categories', categoriesRouter);           // ← descomenta
```

Prueba los nuevos endpoints:

```bash
# Listar categorías
curl http://localhost:3000/api/v1/categories

# Ver categoría con sus productos
curl http://localhost:3000/api/v1/categories/8c4b1d90-6e23-4f57-b0a1-9d3e5f7c2b48
```

---

## ✅ Checklist de Verificación

- [ ] `prisma/migrations/` contiene dos directorios (init + add-category)
- [ ] La tabla `Category` existe en PostgreSQL
- [ ] `Product` tiene columna `categoryId` nullable
- [ ] El seed crea categorías antes de productos
- [ ] `GET /api/v1/products` retorna cada producto con su objeto `category`
- [ ] `GET /api/v1/categories/<UUID>` retorna la categoría con su array `products`
- [ ] `GET /api/v1/products/00000000-0000-4000-8000-000000000000` (UUID válido inexistente) retorna `404`
- [ ] No hay bucles `.map()` para cargar categorías (usa `include`)
- [ ] El diagrama en tu README describe la relación Category → Products

## 💡 ¿Qué pasaría sin include?

```ts
// ❌ N+1 — 1 query para los productos + N queries para las categorías
const products = await prisma.product.findMany();
const withCategory = await Promise.all(
  products.map(p => prisma.category.findUnique({ where: { id: p.categoryId } }))
);

// ✅ 1 sola query con JOIN
const products = await prisma.product.findMany({ include: { category: true } });
```

Con `include`, Prisma genera una sola query SQL con `LEFT JOIN`, sin importar cuántos productos haya.
