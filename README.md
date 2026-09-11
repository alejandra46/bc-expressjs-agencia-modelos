# 🚀 Proyecto Semana 03 — API REST Agencia de Modelos

## 🎯 Objetivo

Construir una API REST para gestionar modelos de una agencia, aplicando una arquitectura en capas:

`routes → controllers → services → repositories`

El proyecto está desarrollado con Node.js, Express y TypeScript.

---

## 📋 Dominio

**Agencia de modelos**

El recurso principal de la API es `models`.

Cada modelo contiene los siguientes campos:

| Campo       | Tipo    | Descripción               |
| ----------- | ------- | ------------------------- |
| `id`        | number  | Identificador único       |
| `name`      | string  | Nombre del modelo         |
| `age`       | number  | Edad                      |
| `height`    | number  | Altura en metros          |
| `city`      | string  | Ciudad                    |
| `available` | boolean | Disponibilidad del modelo |
| `createdAt` | string  | Fecha de creación         |

---

## 📁 Estructura del proyecto

```text
starter/
├── package.json
├── tsconfig.json
├── .env.example
└── src/
    ├── app.ts
    ├── server.ts
    ├── types.ts
    ├── routes/
    │   └── models.routes.ts
    ├── controllers/
    │   └── models.controller.ts
    ├── services/
    │   └── models.service.ts
    └── repositories/
        └── models.repository.ts
```

---

## 🔗 Endpoints

| Método | Ruta                 | Status | Descripción              |
| ------ | -------------------- | -----: | ------------------------ |
| GET    | `/api/v1/models`     |    200 | Listar modelos           |
| GET    | `/api/v1/models/:id` |    200 | Obtener un modelo por ID |
| POST   | `/api/v1/models`     |    201 | Crear un modelo          |
| PUT    | `/api/v1/models/:id` |    200 | Actualizar un modelo     |
| DELETE | `/api/v1/models/:id` |    204 | Eliminar un modelo       |

También se dispone del endpoint:

```text
GET /health
```

para comprobar que el servidor está funcionando.

---

## 📄 Paginación

El listado de modelos permite utilizar los parámetros `page` y `limit`.

Ejemplo:

```text
GET /api/v1/models?page=1&limit=2
```

Respuesta:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Laura Gómez",
      "age": 22,
      "height": 1.75,
      "city": "Bogotá",
      "available": true,
      "createdAt": "2026-08-31T19:04:41.991Z"
    }
  ],
  "total": 3,
  "page": 1,
  "limit": 2
}
```

---

## 📝 Ejemplo para crear un modelo

```http
POST /api/v1/models
Content-Type: application/json
```

```json
{
  "name": "Valentina Rojas",
  "age": 21,
  "height": 1.72,
  "city": "Medellín",
  "available": true
}
```

Respuesta:

```json
{
  "data": {
    "id": 4,
    "name": "Valentina Rojas",
    "age": 21,
    "height": 1.72,
    "city": "Medellín",
    "available": true,
    "createdAt": "2026-08-31T18:41:28.368Z"
  }
}
```

---

## ❌ Manejo de errores

Cuando un modelo no existe, la API responde con estado `404`.

Ejemplo:

```http
GET /api/v1/models/999
```

Respuesta:

```json
{
  "error": "Not Found",
  "message": "Model 999 not found"
}
```

---

## 🏗️ Arquitectura

El proyecto está organizado en cuatro capas:

* **Routes:** define las rutas y las relaciona con los controllers.
* **Controllers:** recibe las peticiones HTTP y devuelve las respuestas.
* **Services:** contiene la lógica de negocio y la paginación.
* **Repositories:** maneja los datos almacenados en memoria.

---

## 🛠️ Ejecución

Instalar dependencias:

```bash
pnpm install
```

Ejecutar en desarrollo:

```bash
pnpm dev
```

El servidor se ejecuta en:

```text
http://localhost:3001
```

Comprobar la compilación:

```bash
pnpm build
```

---

## ✅ Pruebas realizadas

Se probaron los principales endpoints de la API:

* `GET /health`
* `GET /api/v1/models`
* `GET /api/v1/models/:id`
* `POST /api/v1/models`
* `PUT /api/v1/models/:id`
* `DELETE /api/v1/models/:id`
* Paginación mediante `page` y `limit`
* Respuesta `404` para modelos inexistentes

La compilación TypeScript se realizó correctamente con `pnpm build`.
