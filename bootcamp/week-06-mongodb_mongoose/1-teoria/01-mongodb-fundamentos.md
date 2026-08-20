# MongoDB — Fundamentos NoSQL

## 🎯 Objetivos

- Entender el modelo de datos de documentos vs el modelo relacional
- Conocer los tipos BSON y la estructura de colecciones
- Levantar MongoDB con Docker y conectarse localmente

## ¿Por qué NoSQL?

Las bases de datos relacionales (SQL) son excelentes para datos estructurados con relaciones complejas. MongoDB y otras bases NoSQL surgen para cubrir casos donde SQL tiene fricción:

| Ventaja NoSQL | Detalle |
|--------------|---------|
| **Schema flexible** | Cada documento puede tener campos distintos. Útil en catálogos, logs, configuraciones |
| **Escalabilidad horizontal** | Sharding nativo: distribuir datos en múltiples nodos sin rediseñar el schema |
| **Documentos anidados** | Evita JOINs almacenando datos relacionados en el mismo documento |
| **Velocidad de lectura** | Leer un documento completo es una sola operación de disco (sin JOINs) |

### ¿Cuándo elegir MongoDB sobre PostgreSQL?

```
✅ Elige MongoDB cuando:          ✅ Elige PostgreSQL cuando:
  - Catálogos de productos           - Transacciones financieras
  - Logs y eventos                   - Datos con relaciones complejas
  - Configuraciones dinámicas        - Necesitas JOINs frecuentes
  - Real-time con datos variables    - Integridad referencial estricta
  - Prototipado rápido               - Reportes y analytics complejos
```

![Comparativa SQL vs MongoDB](../0-assets/01-mongodb-vs-sql.svg)

## Modelo de Datos

### Jerarquía en MongoDB

```
MongoDB Server
└── base de datos (bootcamp_dev)
    ├── colección  (products)   ←→ tabla SQL
    │   ├── documento           ←→ fila SQL
    │   ├── documento
    │   └── ...
    └── colección  (categories)
```

### Documento vs Fila SQL

```json
// Fila SQL — estructura fija, todos los campos siempre presentes
{ "id": 1, "name": "Teclado", "price": 89.99, "category_id": 2 }

// Documento MongoDB — estructura flexible, campos anidados permitidos
{
  "_id": "ObjectId('664a1f...')",
  "name": "Teclado Mecánico",
  "price": 89.99,
  "specs": {
    "switches": "Blue",
    "layout": "TKL",
    "backlit": true
  },
  "tags": ["periférico", "gaming"],
  "createdAt": "2026-04-11T10:00:00Z"
}
```

### Tipos BSON

BSON (Binary JSON) es el formato de serialización interno de MongoDB. Soporta más tipos que JSON estándar:

| Tipo BSON | Equivalente JS | Ejemplo |
|-----------|---------------|---------|
| `String` | `string` | `"hola"` |
| `Int32/Int64` | `number` | `42` |
| `Double` | `number` | `3.14` |
| `Boolean` | `boolean` | `true` |
| `Date` | `Date` | `ISODate("2026-04-11")` |
| `ObjectId` | objeto especial | `ObjectId("664a1f...")` — 12 bytes |
| `Array` | `Array` | `[1, 2, 3]` |
| `Object/Document` | objeto anidado | `{ key: value }` |
| `null` | `null` | `null` |

#### ObjectId — La clave primaria de MongoDB

```
ObjectId = 4 bytes timestamp + 5 bytes random + 3 bytes counter
Longitud = 24 caracteres hexadecimales
Ejemplo  = "664a1f2b3c4d5e6f7a8b9c0d"
```

Igual que el `uuid()` que usamos en Prisma (semana 05), el `ObjectId` se genera **en el cliente** antes de insertar el documento, sin necesidad de consultar la BD. La diferencia es el formato: 24 caracteres hexadecimales con timestamp incrustado (ordenable por creación) frente a los 36 caracteres aleatorios de un UUID v4.

## Setup con Docker

```yaml
# docker-compose.yml
services:
  mongo:
    image: mongo:7
    container_name: bootcamp-mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: bootcamp
      MONGO_INITDB_ROOT_PASSWORD: bootcamp123
      MONGO_INITDB_DATABASE: bootcamp_dev
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped

volumes:
  mongo_data:
```

```bash
docker compose up -d
docker compose ps   # debe mostrar bootcamp-mongo healthy
```

### URI de Conexión

```bash
# .env
MONGODB_URI="mongodb://bootcamp:bootcamp123@localhost:27017/bootcamp_dev?authSource=admin"
```

El parámetro `?authSource=admin` indica que las credenciales están en la base de datos `admin` (donde `MONGO_INITDB_ROOT_USERNAME` las almacena).

## Comparativa Rápida: SQL vs MongoDB

| Concepto SQL | Concepto MongoDB | Diferencia clave |
|-------------|-----------------|-----------------|
| Base de datos | Base de datos | Igual |
| Tabla | Colección | Sin columnas fijas |
| Fila | Documento | JSON/BSON flexible |
| Columna | Campo | Tipo no obligatorio |
| `PRIMARY KEY` | `_id` (ObjectId) | Generado en cliente |
| `FOREIGN KEY` | `ref` + ObjectId | Sin integridad automática |
| `JOIN` | `populate()` | Query separada |
| `ALTER TABLE` | No aplica | Schema evoluciona sin migración |
| `UNIQUE INDEX` | `{ unique: true }` | Error code 11000 |

## ✅ Checklist de Verificación

- [ ] Conozco la diferencia entre documento y fila
- [ ] Puedo describir 3 casos de uso donde MongoDB es mejor que SQL
- [ ] Tengo `docker compose up -d` funcionando con MongoDB 7
- [ ] Puedo conectarme con Mongo Compass o `mongosh` a `localhost:27017`
