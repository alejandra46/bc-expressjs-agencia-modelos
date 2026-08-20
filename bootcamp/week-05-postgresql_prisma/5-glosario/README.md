# Glosario — Semana 05: PostgreSQL y Prisma ORM

Términos clave ordenados alfabéticamente.

---

## A

**`@db.Uuid`**
Atributo de Prisma que guarda un campo `String` con el tipo nativo `UUID` de PostgreSQL (16 bytes) en vez de `TEXT`. Se usa junto a `@default(uuid())` en las PK y en las FK que las referencian.

**`@default(autoincrement())`**
Modificador que genera un entero autoincremental (`SERIAL` en PostgreSQL). **No se usa en este bootcamp**: todas las llaves primarias son UUID. Aparece aquí solo para que lo reconozcas en código ajeno.

**`@default(uuid())`**
Modificador que genera un UUID v4 al crear el registro. Es la convención de llave primaria del bootcamp: `id String @id @default(uuid()) @db.Uuid`. Prisma lo genera en la aplicación, sin consultar la base de datos.

**`@id`**
Modificador que marca un campo como clave primaria del modelo. Cada modelo debe tener exactamente un `@id`.

**`@relation`**
Anotación Prisma que define cómo se conectan dos modelos. Especifica qué campo local (`fields`) referencia a qué campo del modelo externo (`references`). Solo aparece en el modelo hijo (el que tiene la FK real).

**`@unique`**
Modificador de campo que crea un índice único en la base de datos. Prisma lanza `P2002` cuando se intenta insertar un valor duplicado en ese campo.

**`@updatedAt`**
Modificador que indica a Prisma que actualice automáticamente este campo con el timestamp actual en cada operación `update`. Equivale a un trigger `ON UPDATE` en SQL.

**`@@unique`**
Restricción de unicidad compuesta que aplica a una combinación de campos. Ejemplo: `@@unique([orderId, productId])` impide insertar dos veces la misma combinación en una tabla intermedia N:M.

---

## C

**Connection Pool**
Grupo de conexiones a la base de datos que se reutilizan en lugar de crear/cerrar una nueva conexión por cada query. Prisma administra el pool internamente a través del Query Engine en Rust.

---

## D

**Datasource**
Sección de `schema.prisma` que configura la conexión a la base de datos. Define el `provider` (postgresql, mysql, sqlite) y la `url` de conexión, que debe leerse desde variables de entorno con `env("DATABASE_URL")`.

**`DATABASE_URL`**
Variable de entorno con la cadena de conexión a PostgreSQL. Formato: `postgresql://usuario:contraseña@host:puerto/nombre_bd`. Nunca debe hardcodearse en el código.

---

## F

**`findFirst`**
Método Prisma que retorna el primer registro que cumple los criterios de `where`. A diferencia de `findUnique`, no exige que el campo sea único. Retorna `null` si no hay coincidencias.

**`findMany`**
Método Prisma que retorna un array de registros. Soporta `where`, `orderBy`, `skip`, `take`, `include` y `select`. Retorna array vacío `[]` si no hay coincidencias.

**`findUnique`**
Método Prisma que busca un registro por clave primaria o campo `@unique`. Retorna `null` si no existe (no lanza error). Ligeramente más eficiente que `findFirst` por usar índices únicos.

**Foreign Key (FK)**
Columna en una tabla que referencia la clave primaria de otra tabla, estableciendo una relación entre ambas. En Prisma, la FK vive en el modelo hijo y se declara junto a `@relation`.

---

## G

**Generator**
Sección de `schema.prisma` que configura qué código genera Prisma a partir del schema. El generador estándar es `prisma-client-js`, que produce el cliente TypeScript con tipos.

---

## I

**`include`**
Opción de Prisma para cargar modelos relacionados en la misma query usando JOIN. Alternativa a `select` cuando se quiere el modelo completo. No se puede combinar `include` y `select` en la misma llamada.

---

## M

**Migración**
Archivo SQL versionado que describe los cambios aplicados al schema de la base de datos. Generado automáticamente por `prisma migrate dev`. Debe versionarse con Git para garantizar reproducibilidad.

**Modelo**
Representación de una tabla de base de datos en `schema.prisma`. Define los campos, tipos, modificadores y relaciones. Prisma genera un tipo TypeScript y métodos de acceso para cada modelo.

---

## N

**N+1 Problem**
Antipatrón donde se ejecutan N queries adicionales para cargar los datos relacionados de N registros principales (1 query para los padres + N queries para los hijos). Solución: usar `include` en Prisma, que genera un JOIN.

---

## O

**`onDelete`**
Comportamiento de Prisma cuando se elimina un registro referenciado por una FK. Opciones: `Restrict` (error, por defecto), `Cascade` (elimina hijos), `SetNull` (FK = null), `NoAction` (depende del motor SQL).

---

## P

**P2002**
Código de error `PrismaClientKnownRequestError` que indica violación de restricción `UNIQUE`. Ocurre al intentar insertar un valor duplicado en un campo con `@unique`. Mapear a `AppError(409)`.

**P2003**
Código de error que indica violación de FK (Foreign Key Constraint). Ocurre al eliminar un registro padre que tiene hijos relacionados y `onDelete: Restrict`. Mapear a `AppError(400)`.

**P2025**
Código de error `PrismaClientKnownRequestError` que indica que el registro no fue encontrado. Lanzado por `update` y `delete` cuando el `where` no encuentra coincidencias. Mapear a `AppError(404)`.

**Paginación (skip/take)**
Técnica para retornar subconjuntos de datos. `skip: (page-1)*limit` salta los registros anteriores, `take: limit` limita los resultados. Siempre acompañar con `count()` para retornar el total.

**Primary Key (PK)**
Campo que identifica de forma única cada fila en una tabla. En Prisma se declara con `@id`. En este bootcamp **siempre** es un UUID: `id String @id @default(uuid()) @db.Uuid`.

**Prisma Client**
Biblioteca TypeScript generada automáticamente por Prisma a partir del `schema.prisma`. Provee métodos tipados (`findMany`, `create`, `update`, etc.) para cada modelo definido.

**Prisma Studio**
Interfaz web visual para explorar y modificar datos de la base de datos. Se inicia con `pnpm dlx prisma studio` y se accede en `localhost:5555`.

**`prisma db seed`**
Comando que ejecuta el archivo de seed configurado en `package.json › prisma.seed`. Útil para cargar datos de desarrollo o demo en la base de datos.

**`prisma migrate dev`**
Comando principal para gestionar migraciones en desarrollo. Detecta cambios en `schema.prisma`, genera el SQL correspondiente, lo ejecuta y regenera el Prisma Client.

---

## Q

**Query Engine**
Componente interno de Prisma escrito en Rust que transforma las llamadas de la API de Prisma Client en SQL optimizado. Gestiona el pool de conexiones y ejecuta las queries contra la base de datos.

---

## R

**Relación 1:N (uno a muchos)**
Tipo de relación donde un registro padre puede tener múltiples registros hijo, pero cada hijo tiene exactamente un padre. Ejemplo: una `Category` tiene muchos `Product`s. La FK vive en el hijo.

**Relación N:M (muchos a muchos)**
Tipo de relación donde registros de ambas tablas pueden relacionarse con múltiples de la otra. Requiere una tabla intermedia (ej. `OrderItem`) que contiene las FKs de ambas entidades. En Prisma se recomienda la tabla intermedia explícita cuando hay campos adicionales en la relación.

---

## S

**`schema.prisma`**
Archivo central de configuración de Prisma. Contiene el `generator`, el `datasource` y todos los `model`s. Es la fuente de verdad del schema de la base de datos.

**`select`**
Opción de Prisma para proyectar solo campos específicos en el resultado, reduciendo el payload transferido. No se puede combinar con `include`.

**Seed**
Script que inserta datos iniciales en la base de datos. Útil en desarrollo para tener datos de prueba reproducibles. Debe ser idempotente (ejecutable múltiples veces sin errores).

**Singleton**
Patrón de diseño que garantiza que solo exista una instancia de un objeto en toda la aplicación. En Prisma, se usa el objeto `global` de Node.js para persistir el `PrismaClient` entre recargas de `tsx watch`.

---

## T

**Tabla Intermedia / Join Table**
Tabla de base de datos que implementa una relación N:M almacenando pares de FKs de ambas entidades relacionadas. Puede tener campos adicionales (ej. `quantity` en `OrderItem`).
