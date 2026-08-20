# Prisma Client — CRUD, Filtros y Paginación

## 🎯 Objetivos

- Usar el Prisma Client tipado para operaciones CRUD
- Filtrar, ordenar y paginar resultados con `where`, `orderBy`, `skip` y `take`
- Manejar errores Prisma con `PrismaClientKnownRequestError`
- Integrar Prisma en la capa de repositorios

---

## 1. Operaciones CRUD básicas

```ts
import { prisma } from '../lib/prisma';

// CREATE
const product = await prisma.product.create({
  data: {
    name: 'Laptop Pro',
    price: 1299.99,
    stock: 5,
  },
});

// READ — todos los registros
const products = await prisma.product.findMany();

// READ — por ID (retorna null si no existe)
// El id es un UUID: siempre string, nunca number
const productId = '3f1a9c2e-5b7d-4e81-9a6f-2c8d0b4e7a15';

const product = await prisma.product.findUnique({
  where: { id: productId },
});

// UPDATE
const updated = await prisma.product.update({
  where: { id: productId },
  data: { stock: 3 },
});

// DELETE
await prisma.product.delete({
  where: { id: productId },
});
```

> `findUnique` y `findFirst` retornan `null` cuando no existe el registro.
> `update` y `delete` lanzan `PrismaClientKnownRequestError` con código `P2025`
> si el registro no existe.

---

## 2. Filtros con `where`

```ts
// Filtro por campo exacto
const activeProducts = await prisma.product.findMany({
  where: { available: true },
});

// Filtro parcial (LIKE)
const laptops = await prisma.product.findMany({
  where: {
    name: { contains: 'Laptop', mode: 'insensitive' },
  },
});

// Filtros combinados (AND implícito)
const affordable = await prisma.product.findMany({
  where: {
    price: { lte: 500 },        // price <= 500
    stock: { gt: 0 },           // stock > 0
  },
});

// Operadores disponibles
// { equals }, { not }, { in }, { notIn }
// { lt }, { lte }, { gt }, { gte }
// { contains }, { startsWith }, { endsWith } (para String)
```

---

## 3. Ordenamiento con `orderBy`

```ts
// Más baratos primero
const byPrice = await prisma.product.findMany({
  orderBy: { price: 'asc' },
});

// Más recientes primero + nombre alfebético como desempate
const recent = await prisma.product.findMany({
  orderBy: [{ createdAt: 'desc' }, { name: 'asc' }],
});
```

---

## 4. Paginación con `skip` y `take`

```ts
// Equivale a LIMIT 10 OFFSET 0 (página 1)
const page1 = await prisma.product.findMany({
  skip: 0,   // (page - 1) * limit
  take: 10,  // limit
  orderBy: { createdAt: 'desc' },
});

// Calcular skip dinámicamente
async function findAll(page: number, limit: number) {
  const [data, total] = await Promise.all([
    prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count(),
  ]);
  return { data, total, page, limit };
}
```

> `prisma.product.count()` retorna el total de registros. Ejecutar `findMany` y
> `count` juntos con `Promise.all` evita dos round-trips secuenciales a la DB.

---

## 5. Select — proyección de campos

```ts
// Seleccionar solo los campos necesarios (reduce el payload)
const names = await prisma.product.findMany({
  select: {
    id: true,
    name: true,
    price: true,
    // createdAt: false — omitido implícitamente
  },
});
// Tipo inferido: { id: number; name: string; price: number }[]
```

---

## 6. Manejo de errores Prisma

```ts
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AppError } from '../errors/AppError';

export async function findById(id: number) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new AppError(404, `Product ${id} not found`);
  return product;
}

export async function create(data: Prisma.ProductCreateInput) {
  try {
    return await prisma.product.create({ data });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      // P2002 — Unique constraint violated
      if (err.code === 'P2002') {
        throw new AppError(409, 'Ya existe un producto con ese nombre');
      }
    }
    throw err; // re-throw para el errorHandler genérico
  }
}

export async function update(id: number, data: Prisma.ProductUpdateInput) {
  try {
    return await prisma.product.update({ where: { id }, data });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, `Product ${id} not found`);
    }
    throw err;
  }
}
```

Códigos de error más comunes:

| Código | Significado | HTTP sugerido |
|--------|------------|:-------------:|
| `P2002` | Unique constraint violation | 409 Conflict |
| `P2025` | Record not found (update/delete) | 404 Not Found |
| `P2003` | Foreign key constraint failed | 400 Bad Request |
| `P2014` | Relación requerida viola constraints | 400 Bad Request |

---

## 7. Repositorio completo — patrón

```ts
// src/repositories/product.repository.ts
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prisma } from '../lib/prisma';
import { AppError } from '../errors/AppError';

export async function findAll(page: number, limit: number) {
  const [data, total] = await Promise.all([
    prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count(),
  ]);
  return { data, total, page, limit };
}

export async function findById(id: number) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new AppError(404, `Product ${id} not found`);
  return product;
}

export async function create(data: Prisma.ProductCreateInput) {
  try {
    return await prisma.product.create({ data });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new AppError(409, 'Ya existe un producto con ese nombre');
    }
    throw err;
  }
}

export async function update(id: number, data: Prisma.ProductUpdateInput) {
  try {
    return await prisma.product.update({ where: { id }, data });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, `Product ${id} not found`);
    }
    throw err;
  }
}

export async function remove(id: number) {
  try {
    await prisma.product.delete({ where: { id } });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, `Product ${id} not found`);
    }
    throw err;
  }
}
```

---

## 8. 🔒 Nota de seguridad — OWASP A03 (Injection)

Toda query de este archivo pasa por el Prisma Client tipado — nunca se
concatena SQL a mano. Esa es la mitigación real de A03 (SQL Injection):
Prisma genera queries parametrizadas por diseño, así que un `where: { name:
userInput }` es seguro incluso si `userInput` contiene `'; DROP TABLE --`. La
excepción peligrosa es `prisma.$queryRawUnsafe()` — evítalo; si necesitas SQL
crudo, usa `prisma.$queryRaw` con template literals (parametrizado).

> Tratamiento completo de OWASP Top 10 en la semana 08.

---

## ✅ Checklist de Verificación

- [ ] `findMany` con `skip`/`take` retorna datos paginados
- [ ] `findUnique` retorna AppError(404) cuando el registro no existe
- [ ] `create` captura P2002 y retorna AppError(409)
- [ ] `update` y `delete` capturan P2025 y retornan AppError(404)
- [ ] `Promise.all` se usa para `findMany` + `count` en paralelo
- [ ] No hay `new PrismaClient()` fuera del singleton
