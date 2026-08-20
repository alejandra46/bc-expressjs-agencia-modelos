# PostgreSQL — Fundamentos del Modelo Relacional

## 🎯 Objetivos

- Entender qué es una base de datos relacional y por qué usarla en APIs REST
- Conocer los conceptos clave: tablas, columnas, tipos de datos, PKs y FKs
- Leer y escribir SQL básico para validar lo que Prisma genera
- Distinguir cuándo elegir SQL vs NoSQL

![Arquitectura Prisma](../0-assets/01-prisma-architecture.svg)

---

## 1. ¿Por qué base de datos relacional?

En las semanas anteriores usamos arrays en memoria para almacenar datos. El problema:
los datos desaparecen al reiniciar el servidor. En producción necesitamos **persistencia**.

PostgreSQL es la opción SQL más popular en el ecosistema Node.js por cuatro razones:

| Ventaja | Detalle |
|---------|---------|
| ACID | Transacciones garantizadas: Atomicidad, Consistencia, Aislamiento, Durabilidad |
| Tipos ricos | JSON, arrays, UUID, enums, timestamps con timezone |
| Relaciones | Foreign keys con integridad referencial nativa |
| Ecosistema | Compatible con Prisma, Drizzle, Sequelize, TypeORM y más |

---

## 2. Modelo relacional: tablas y columnas

Una **tabla** es como un array de objetos estructurado, pero con schema fijo:

```sql
-- Tabla products
CREATE TABLE products (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       VARCHAR(255) NOT NULL,
  price      DECIMAL(10, 2) NOT NULL,
  stock      INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

Conceptos clave:

| Concepto | Definición |
|----------|-----------|
| **Fila (row)** | Un registro individual — equivale a un objeto en el array |
| **Columna (column)** | Un campo del registro — equivale a una propiedad del objeto |
| **Primary Key (PK)** | Identificador único de cada fila (`id`) — en este bootcamp siempre `UUID` |
| **NOT NULL** | La columna es obligatoria |
| **DEFAULT** | Valor por defecto si no se proporciona |

---

## 3. Tipos de datos más usados en PostgreSQL

| Tipo PostgreSQL | Equivalente TypeScript | Caso de uso |
|-----------------|----------------------|-------------|
| `UUID` | `string` | **Llaves primarias y foráneas** (convención del bootcamp) |
| `INTEGER` | `number` | Contadores, cantidades |
| `SERIAL` | `number` | PK autoincremental — legado, no lo usamos aquí |
| `VARCHAR(n)` / `TEXT` | `string` | Nombres, descripciones |
| `DECIMAL(p,s)` / `FLOAT` | `number` | Precios, coordenadas |
| `BOOLEAN` | `boolean` | Flags activo/inactivo |
| `TIMESTAMP` | `Date` | Fechas de creación/actualización |

> **Por qué UUID y no `SERIAL`:** un `SERIAL` expone cuántos registros tiene la
> tabla y es adivinable (`/products/1`, `/products/2`…). Un `UUID` se genera en la
> aplicación antes de insertar — sin round-trip a la BD — y no filtra información.

---

## 4. Relaciones y llaves foráneas

Las **relaciones** conectan tablas entre sí mediante **foreign keys (FK)**:

```sql
-- Tabla categories (padre)
CREATE TABLE categories (
  id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla products (hijo) — FK hacia categories
CREATE TABLE products (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  price       DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES categories(id)  -- mismo tipo que la PK a la que apunta
);
```

Tipos de relaciones:

| Tipo | Ejemplo | Implementación SQL |
|------|---------|-------------------|
| **1:N** (uno a muchos) | Una categoría tiene muchos productos | FK en la tabla hijo |
| **N:M** (muchos a muchos) | Un producto en muchos pedidos | Tabla intermedia (join table) |
| **1:1** (uno a uno) | Un usuario tiene un perfil | FK única en la tabla dependiente |

---

## 5. SQL básico — operaciones CRUD

Prisma genera SQL automáticamente, pero conviene entender lo que ocurre:

```sql
-- CREATE
INSERT INTO products (name, price, stock)
VALUES ('Laptop Pro', 1299.99, 5);

-- READ (con filtro y ordenamiento)
SELECT id, name, price FROM products
WHERE price > 100
ORDER BY created_at DESC
LIMIT 10 OFFSET 0;

-- UPDATE
UPDATE products SET stock = stock - 1
WHERE id = '3f1a9c2e-5b7d-4e81-9a6f-2c8d0b4e7a15';

-- DELETE
DELETE FROM products
WHERE id = '3f1a9c2e-5b7d-4e81-9a6f-2c8d0b4e7a15';
```

---

## 6. PostgreSQL en desarrollo con Docker

No necesitas instalar PostgreSQL directamente. Usa Docker:

```yaml
# docker-compose.yml (en la raíz del proyecto)
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: bootcamp
      POSTGRES_PASSWORD: bootcamp123
      POSTGRES_DB: bootcamp_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

```bash
# Levantar PostgreSQL
docker compose up -d

# Detener (sin borrar datos)
docker compose stop

# Borrar todo (incluye datos)
docker compose down -v
```

`.env`:
```env
DATABASE_URL="postgresql://bootcamp:bootcamp123@localhost:5432/bootcamp_dev"
```

---

## ✅ Checklist de Verificación

- [ ] Entiendes la diferencia entre tabla, fila y columna
- [ ] Sabes qué es una Primary Key y para qué sirve
- [ ] Entiendes qué es una Foreign Key y qué tipo de relación modela
- [ ] Levantaste PostgreSQL local con Docker
- [ ] Conectaste con `psql` o Prisma Studio y validaste que la DB existe
