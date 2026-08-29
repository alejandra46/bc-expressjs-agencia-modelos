# Proyecto Semana 02 — Agencia de Modelos

## 🎯 Objetivo

Construir una API REST con Express 5 y TypeScript para gestionar modelos de una agencia, aplicando operaciones CRUD, middlewares y códigos de respuesta HTTP.

---

## 📋 Mi Dominio

**Dominio:** Agencia de modelos

**Recurso principal:** Models

Los modelos representan las personas registradas en la agencia.

### Campos del recurso

| Campo | Tipo   | Descripción              |
| ----- | ------ | ------------------------ |
| id    | number | Identificador del modelo |
| name  | string | Nombre del modelo        |
| age   | number | Edad                     |
| city  | string | Ciudad                   |
| phone | string | Número de teléfono       |

---

## 🗂️ Estructura del proyecto

```text
starter/
├── package.json
├── tsconfig.json
├── .env.example
├── pnpm-lock.yaml
└── src/
    ├── app.ts
    ├── server.ts
    ├── types.ts
    ├── store.ts
    └── routes/
        └── items.routes.ts
```

---

## ✅ Endpoints

| Método | Ruta                 | Descripción              | Status    |
| ------ | -------------------- | ------------------------ | --------- |
| GET    | `/api/v1/models`     | Listar todos los modelos | 200       |
| GET    | `/api/v1/models/:id` | Obtener un modelo por ID | 200 / 404 |
| POST   | `/api/v1/models`     | Crear un modelo          | 201       |
| PUT    | `/api/v1/models/:id` | Actualizar un modelo     | 200 / 404 |
| DELETE | `/api/v1/models/:id` | Eliminar un modelo       | 204 / 404 |

También se agregó:

```text
GET /health
```

que permite comprobar que el servidor está funcionando.

---

## 🔧 Middlewares

Se implementaron los middlewares solicitados:

* `express.json()` para recibir datos en formato JSON.
* Logger personalizado para mostrar método, URL, código de respuesta y tiempo.
* Handler 404 para rutas que no existen.
* Error handler global para manejar errores del servidor.

---

## 💾 Store en memoria

Los modelos se almacenan en un array dentro de `store.ts`.

Se implementaron las siguientes funciones:

* `getAll()` — obtiene todos los modelos.
* `getById(id)` — busca un modelo por su ID.
* `create(data)` — crea un modelo y genera su ID.
* `update(id, data)` — actualiza un modelo.
* `remove(id)` — elimina un modelo.

Los datos no son permanentes y se pierden cuando se reinicia el servidor.

---

## 🧪 Pruebas realizadas

Se probaron las operaciones CRUD y las respuestas esperadas:

* GET todos los modelos → `200`
* POST crear modelo → `201`
* GET modelo por ID → `200`
* PUT actualizar modelo → `200`
* DELETE modelo → `204`
* GET de un modelo inexistente → `404`
* Acceso a una ruta inexistente → `404`

También se comprobó el endpoint `/health`.

El servidor se ejecutó localmente en:

```text
http://localhost:3001
```

---

## 📦 Entrega

El proyecto contiene:

* Código fuente de la API.
* CRUD completo para el recurso `models`.
* Middlewares requeridos.
* Store en memoria.
* Configuración de Express y TypeScript.
* Pruebas de los endpoints.
