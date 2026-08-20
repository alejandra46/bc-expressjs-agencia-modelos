# 🚀 Proyecto Semana 05 — API con PostgreSQL y Prisma ORM

## 🎯 Objetivo

Migrar la API de tu dominio asignado del almacenamiento en memoria a **PostgreSQL** usando **Prisma ORM**. La API debe tener migraciones versionadas, seed de datos iniciales y manejo correcto de errores de base de datos.

## 📋 Tu Dominio Asignado

> **El instructor te asignará tu dominio**. Consulta la lista al inicio del bootcamp.

Ejemplos de dominios:

| Dominio | Recurso principal | Recurso secundario (relación) |
|---------|-------------------|-------------------------------|
| Biblioteca | Book | Author |
| Farmacia | Medication | Category |
| Gimnasio | Member | Plan |
| Restaurante | MenuItem | Category |
| Hospital | Patient | Doctor |
| Cine | Movie | Genre |
| Hotel | Room | RoomType |
| Tienda de mascotas | Product | Species |

---

## ✅ Requisitos Funcionales

### 1. Schema y Migraciones

- Definir al menos **2 modelos** en `prisma/schema.prisma`:
  - Recurso principal (items de tu dominio) con mínimo 6 campos tipados
  - Recurso secundario con relación 1:N al principal
- Ejecutar migraciones con `prisma migrate dev`
- Carpeta `prisma/migrations/` versionada (no ignorada por `.gitignore`)

### 2. Seed

- `prisma/seed.ts` que carga datos demo en ambas entidades
- Debe ser idempotente (ejecutable múltiples veces sin duplicar datos)
- Mínimo 5 registros en el recurso principal

### 3. API CRUD con Prisma

Implementar los siguientes endpoints para el recurso principal:

| Método | Ruta | Descripción | Status |
|--------|------|-------------|--------|
| GET | `/api/v1/items` | Listado paginado | 200 |
| GET | `/api/v1/items/:id` | Detalle con relación | 200 / 404 |
| POST | `/api/v1/items` | Crear (validar con Zod) | 201 / 400 / 409 |
| PUT | `/api/v1/items/:id` | Actualizar | 200 / 404 |
| DELETE | `/api/v1/items/:id` | Eliminar | 204 / 404 |

> Reemplaza `items` con el nombre del recurso de tu dominio (ej. `books`, `medications`, `members`).

### 4. Manejo de Errores Prisma

- `P2025` (record not found) → `AppError(404, 'Recurso no encontrado')`
- `P2002` (unique constraint) → `AppError(409, 'Ya existe un registro con ese valor')`
- Todos los errores deben pasar por el middleware `errorHandler`

### 5. Paginación

- `GET /api/v1/items?page=1&limit=10` debe retornar:
  ```json
  {
    "data": [...],
    "total": 25,
    "page": 1,
    "limit": 10
  }
  ```

---

## 🗂️ Estructura del Starter

```
starter/
├── package.json
├── tsconfig.json
├── .env.example
├── docker-compose.yml
├── prisma/
│   ├── schema.prisma      ← TODO: define tus modelos
│   └── seed.ts            ← TODO: inserta datos demo
└── src/
    ├── lib/prisma.ts       ← TODO: implementar singleton
    ├── config/logger.ts    ← dado (Winston)
    ├── errors/AppError.ts  ← dado
    ├── middlewares/
    │   ├── errorHandler.ts ← dado
    │   └── notFound.ts     ← dado
    ├── schemas/items.schema.ts  ← TODO: Zod schema tu dominio
    ├── repositories/items.repository.ts  ← TODO: Prisma CRUD + errores
    ├── services/items.service.ts         ← TODO: lógica de negocio
    ├── controllers/items.controller.ts   ← TODO: capa HTTP
    ├── routes/items.routes.ts            ← TODO: definición de rutas
    ├── app.ts             ← TODO: registrar router
    └── server.ts          ← TODO: logger.info al iniciar
```

---

## 💡 Ejemplos de Adaptación por Dominio

> **Regla del bootcamp:** toda PK es `id String @id @default(uuid()) @db.Uuid`,
> y toda FK que la referencia es `String @db.Uuid`. Nunca `Int @default(autoincrement())`.

**Biblioteca:**
```prisma
model Author { id String @id @default(uuid()) @db.Uuid; books Book[] }
model Book { id String @id @default(uuid()) @db.Uuid; title String; isbn String @unique; author Author; authorId String @db.Uuid }
```

**Farmacia:**
```prisma
model Category { id String @id @default(uuid()) @db.Uuid; medications Medication[] }
model Medication { id String @id @default(uuid()) @db.Uuid; name String; sku String @unique; category Category?; categoryId String? @db.Uuid }
```

**Gimnasio:**
```prisma
model Plan { id String @id @default(uuid()) @db.Uuid; members Member[] }
model Member { id String @id @default(uuid()) @db.Uuid; email String @unique; plan Plan?; planId String? @db.Uuid }
```

---

## 🛠️ Iniciar el Proyecto

```bash
# 1. Levantar PostgreSQL
docker compose up -d

# 2. Instalar dependencias
pnpm install

# 3. Copiar variables de entorno y ajustar
cp .env.example .env

# 4. Definir tus modelos en prisma/schema.prisma

# 5. Ejecutar primera migración
pnpm dlx prisma migrate dev --name init

# 6. Ejecutar seed
pnpm dlx prisma db seed

# 7. Iniciar servidor en modo desarrollo
pnpm dev
```

## 📌 Entregables

1. **Repositorio** con `prisma/migrations/` incluida
2. **README.md** del proyecto con:
   - Descripción del dominio
   - Diagrama de entidades (texto o imagen)
   - Endpoints documentados con ejemplos de request/response
3. **Screenshots** de Postman/Thunder Client mostrando los 5 endpoints
4. **Logs del seed** (`pnpm dlx prisma db seed`) adjuntos en README
