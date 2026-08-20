# Prisma — Relaciones, `include` y `select`

## 🎯 Objetivos

- Modelar relaciones 1:N y N:M en `schema.prisma` con `@relation`
- Usar `include` para cargar datos relacionados en una sola query
- Comparar `include` vs `select` en consultas con relaciones
- Entender el problema N+1 y cómo Prisma lo evita

![Relaciones Prisma](../0-assets/03-prisma-relations.svg)

---

## 1. Relación uno-a-muchos (1:N)

El caso más común: **una categoría tiene muchos productos**.

```prisma
// prisma/schema.prisma

model Category {
  id        String    @id @default(uuid()) @db.Uuid
  name      String    @unique
  products  Product[]            // campo virtual (no es columna en la DB)
}

model Product {
  id          String    @id @default(uuid()) @db.Uuid
  name        String
  price       Float
  category    Category  @relation(fields: [categoryId], references: [id])
  categoryId  String    @db.Uuid // columna FK en la tabla products
}
```

Reglas de la relación 1:N:
- La FK (`categoryId`) va en la tabla **hijo** (`Product`)
- La FK debe tener **el mismo tipo que la PK a la que apunta** — si la PK es
  `String @db.Uuid`, la FK también (`String @db.Uuid`)
- El campo de lista (`products Product[]`) va en la tabla **padre** (`Category`) — es virtual
- `@relation(fields: [...], references: [...])` define qué columna apunta a qué

---

## 2. Relación muchos-a-muchos (N:M)

Un producto puede aparecer en muchos pedidos, y un pedido puede tener muchos productos:

```prisma
model Order {
  id        String        @id @default(uuid()) @db.Uuid
  createdAt DateTime      @default(now())
  items     OrderItem[]
}

model Product {
  id    String      @id @default(uuid()) @db.Uuid
  name  String
  items OrderItem[]
}

// Tabla intermedia explícita (permite campos extras como quantity)
model OrderItem {
  id        String  @id @default(uuid()) @db.Uuid
  quantity  Int     @default(1)
  order     Order   @relation(fields: [orderId],   references: [id])
  orderId   String  @db.Uuid
  product   Product @relation(fields: [productId], references: [id])
  productId String  @db.Uuid

  @@unique([orderId, productId])
}
```

---

## 3. `include` — cargar datos relacionados

```ts
// Los ids son UUID: siempre string
const productId  = '3f1a9c2e-5b7d-4e81-9a6f-2c8d0b4e7a15';
const categoryId = '8c4b1d90-6e23-4f57-b0a1-9d3e5f7c2b48';
const orderId    = 'd2e6f018-4a95-4c3b-8f7e-1b0a6c9d3e52';

// Producto con su categoría
const product = await prisma.product.findUnique({
  where: { id: productId },
  include: { category: true },
});
// Tipo: Product & { category: Category }

// Categoría con todos sus productos
const category = await prisma.category.findUnique({
  where: { id: categoryId },
  include: { products: true },
});
// Tipo: Category & { products: Product[] }

// include anidado — pedido con items y los productos de cada item
const order = await prisma.order.findUnique({
  where: { id: orderId },
  include: {
    items: {
      include: { product: true },
    },
  },
});
```

---

## 4. `select` con relaciones

```ts
// Seleccionar solo campos específicos incluyendo relación
const products = await prisma.product.findMany({
  select: {
    id: true,
    name: true,
    price: true,
    category: {
      select: { name: true }, // solo el nombre de la categoría
    },
  },
});
// Tipo: { id: number; name: string; price: number; category: { name: string } | null }[]
```

> No puedes usar `include` y `select` simultáneamente en la misma query.
> Elige uno: `include` devuelve el modelo completo relacionado; `select` permite proyección.

---

## 5. El problema N+1 y cómo Prisma lo evita

El **problema N+1** ocurre cuando cargamos una lista y luego hacemos una query por
cada elemento para obtener datos relacionados:

```ts
// ❌ MAL — N+1: 1 query para products + N queries para categories
const products = await prisma.product.findMany();
for (const p of products) {
  const cat = await prisma.category.findUnique({ where: { id: p.categoryId } });
  // ... N queries extra
}

// ✅ BIEN — 1 sola query con JOIN (Prisma lo genera automáticamente)
const products = await prisma.product.findMany({
  include: { category: true },
});
```

Prisma genera un `JOIN` SQL cuando usas `include`, evitando el problema N+1.

---

## 6. `onDelete` — comportamiento al eliminar el padre

```prisma
model Product {
  id         String    @id @default(uuid()) @db.Uuid
  category   Category? @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  categoryId String?   @db.Uuid
}
```

| `onDelete` | Comportamiento |
|------------|---------------|
| `Restrict` (default) | Error si el padre tiene hijos — protege integridad |
| `Cascade` | Elimina los hijos automáticamente al eliminar el padre |
| `SetNull` | Pone la FK en `null` — requiere que el campo sea opcional (`?`) |
| `NoAction` | Igual que `Restrict` pero con diferencia en timing |

---

## 7. Migración tras añadir relación

Al agregar una relación al `schema.prisma`, crea una nueva migración:

```bash
pnpm dlx prisma migrate dev --name add-category-relation
```

Prisma generará un `ALTER TABLE` que añade la columna FK y el constraint.

---

## ✅ Checklist de Verificación

- [ ] `schema.prisma` tiene al menos una relación 1:N definida correctamente
- [ ] La FK (`categoryId`) está en la tabla hijo, no en la padre
- [ ] Migración de la relación ejecutada sin errores
- [ ] `include` carga la relación en una sola query (no en loop)
- [ ] Manejo de `P2003` (FK constraint fail) en el repositorio si aplica
- [ ] Entiendes por qué `include` evita el problema N+1
