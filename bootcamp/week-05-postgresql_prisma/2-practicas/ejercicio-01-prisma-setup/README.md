# Ejercicio 01 — Prisma Setup: Primera API con PostgreSQL

## 🎯 Objetivo

Conectar tu API Express con PostgreSQL usando Prisma ORM. Al final del ejercicio tendrás un servidor con una base de datos real, migraciones versionadas y endpoints CRUD completamente funcionales.

## 📋 Requisitos Previos

- Docker instalado y funcionando (`docker --version`)
- Semana 04 completada (arquitectura en capas, AppError, Zod)
- Node.js 22+

## 🗂️ Estructura del Starter

```
starter/
├── package.json
├── tsconfig.json
├── .env.example
├── docker-compose.yml
├── prisma/
│   ├── schema.prisma          ← PASO 1 y 2
│   └── seed.ts                ← PASO 3
└── src/
    ├── lib/prisma.ts           ← dado (singleton)
    ├── errors/AppError.ts      ← dado (week-04)
    ├── middlewares/
    │   ├── errorHandler.ts     ← dado
    │   └── notFound.ts         ← dado
    ├── schemas/product.schema.ts ← dado (Zod)
    ├── repositories/products.repository.ts  ← PASO 4 y 5
    ├── services/products.service.ts  ← dado
    ├── controllers/products.controller.ts   ← dado
    ├── routes/products.routes.ts            ← dado
    ├── app.ts                               ← dado
    └── server.ts                            ← dado
```

---

## Paso 1: Levantar PostgreSQL con Docker

Abre `docker-compose.yml` — ya está listo. Ejecuta:

```bash
docker compose up -d
```

Verifica que el contenedor esté corriendo:

```bash
docker compose ps
```

Deberías ver `bootcamp-db` con estado `running`.

## Paso 2: Definir el modelo en schema.prisma

El modelo `Product` ya tiene su estructura base. **Abre `prisma/schema.prisma`** y descomenta las líneas del modelo:

```prisma
model Product {
  id          String   @id @default(uuid()) @db.Uuid
  name        String
  description String?
  price       Float
  stock       Int      @default(0)
  sku         String   @unique
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

Luego ejecuta la primera migración:

```bash
pnpm dlx prisma migrate dev --name init
```

Este comando:
1. Genera el SQL en `prisma/migrations/`
2. Ejecuta el SQL en PostgreSQL
3. Regenera `@prisma/client` con los tipos de `Product`

Abre Prisma Studio para verificar que la tabla existe:

```bash
pnpm dlx prisma studio
```

Visita `http://localhost:5555` — deberías ver la tabla `Product` vacía.

## Paso 3: Seed — Datos iniciales

**Abre `prisma/seed.ts`** y descomenta las líneas del array `products` y la llamada a `prisma.product.createMany()`:

```ts
const products = [
  { name: 'Producto A', price: 19.99, sku: 'PROD-001', stock: 100 },
  // ...
];

await prisma.product.createMany({ data: products });
```

Ejecuta el seed:

```bash
pnpm dlx prisma db seed
```

Vuelve a Prisma Studio y verifica que aparezcan los 5 productos.

## Paso 4: Implementar el repositorio (CRUD básico)

**Abre `src/repositories/products.repository.ts`** y descomenta las funciones `findAll` y `findById`:

```ts
// findAll con paginación
const [products, total] = await Promise.all([
  prisma.product.findMany({ skip: (page - 1) * limit, take: limit }),
  prisma.product.count(),
]);
return { data: products, total, page, limit };

// findById retorna null si no existe
const product = await prisma.product.findUnique({ where: { id } });
```

Prueba con cURL o Thunder Client:

```bash
curl "http://localhost:3000/api/v1/products?page=1&limit=3"

# Copia un id del listado anterior — es un UUID, no un número
curl http://localhost:3000/api/v1/products/<UUID-DEL-LISTADO>
```

> **Ojo con el tipo del id.** Como la PK es `UUID`, el `:id` de la ruta es un
> string y no se convierte con `Number(...)`. Si envías un id que no es un UUID
> válido (`/products/999`), Prisma lanza `P2023` en vez de `P2025` — no es un
> 404, es un id mal formado.

## Paso 5: Operaciones de escritura y manejo de errores

**Sigue en `src/repositories/products.repository.ts`** y descomenta las funciones `create`, `update` y `remove`:

```ts
// create — captura P2002 (sku duplicado)
try {
  return await prisma.product.create({ data });
} catch (err) {
  if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
    throw new AppError(409, 'El SKU ya existe');
  }
  throw err;
}

// update / remove — captura P2025 (no existe)
try {
  return await prisma.product.update({ where: { id }, data });
} catch (err) {
  if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
    throw new AppError(404, 'Producto no encontrado');
  }
  throw err;
}
```

Prueba los edge cases:

```bash
# POST con SKU duplicado → 409
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Dup","price":9.99,"sku":"PROD-001","stock":5}'

# PUT con ID inexistente → 404
curl -X PUT http://localhost:3000/api/v1/products/00000000-0000-4000-8000-000000000000 \
  -H "Content-Type: application/json" \
  -d '{"price":1.99}'

# DELETE con ID inexistente → 404
curl -X DELETE http://localhost:3000/api/v1/products/00000000-0000-4000-8000-000000000000
```

---

## ✅ Checklist de Verificación

- [ ] `docker compose up -d` levanta PostgreSQL sin errores
- [ ] `prisma/migrations/` contiene al menos un directorio con timestamp
- [ ] `pnpm dlx prisma db seed` inserta 5 productos
- [ ] `GET /api/v1/products?page=1&limit=2` retorna `{ data: [...], total: 5, page: 1, limit: 2 }`
- [ ] `GET /api/v1/products/00000000-0000-4000-8000-000000000000` (UUID válido inexistente) retorna `404`
- [ ] `POST` con SKU duplicado retorna `409`
- [ ] `PUT` con ID inexistente retorna `404`
- [ ] `DELETE` con ID inexistente retorna `404`
- [ ] No hay `new PrismaClient()` fuera de `src/lib/prisma.ts`
- [ ] `DATABASE_URL` está en `.env` (no hardcodeada en el código)

## 🚀 Iniciar el Servidor

```bash
# 1. Levantar base de datos
docker compose up -d

# 2. Instalar dependencias
pnpm install

# 3. Copiar variables de entorno
cp .env.example .env

# 4. Ejecutar migraciones
pnpm dlx prisma migrate dev --name init

# 5. Seed
pnpm dlx prisma db seed

# 6. Iniciar servidor
pnpm dev
```
