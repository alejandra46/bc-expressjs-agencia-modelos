# 🤖 Instrucciones para GitHub Copilot

## 📋 Contexto del Bootcamp

Este es un **Bootcamp de ExpressJS Zero to Hero** estructurado para llevar a
desarrolladores con experiencia en JavaScript/TypeScript hasta el desarrollo de
APIs REST profesionales, seguras y listas para producción con Node.js y Express.

### 📊 Datos del Bootcamp

- **Duración**: 16 semanas (~4 meses)
- **Dedicación semanal**: 8 horas
- **Total de horas**: ~128 horas
- **Nivel de entrada**: Desarrollador con experiencia en JS/TS moderno
- **Nivel de salida**: Desarrollador Backend Junior (Node.js / Express)
- **Enfoque**: APIs REST modernas con Express, TypeScript, Prisma y PostgreSQL
- **Stack**: Node.js 22+, Express 5, TypeScript 5.x, Prisma, PostgreSQL, Redis, Jest

---

## 🎯 Objetivos de Aprendizaje

Al finalizar el bootcamp, los estudiantes serán capaces de:

- ✅ Dominar el runtime de Node.js y el modelo de I/O no bloqueante
- ✅ Construir servidores HTTP con Express 5 y TypeScript desde cero
- ✅ Diseñar APIs REST siguiendo buenas prácticas (versioning, status codes, contratos)
- ✅ Validar y sanitizar datos de entrada con Zod
- ✅ Implementar persistencia con Prisma ORM + PostgreSQL y con Mongoose + MongoDB
- ✅ Autenticar usuarios con bcrypt, JWT (access/refresh tokens) y cookies HttpOnly
- ✅ Controlar acceso con RBAC (Role-Based Access Control)
- ✅ Aplicar seguridad OWASP: Helmet, rate limiting, CORS, sanitización
- ✅ Escribir tests unitarios e integration con Jest + Supertest
- ✅ Gestionar archivos con Multer y almacenamiento en S3/Cloudinary
- ✅ Implementar comunicación en tiempo real con Socket.io
- ✅ Usar Redis para caché y gestión de sesiones
- ✅ Documentar APIs con OpenAPI/Swagger
- ✅ Dockerizar aplicaciones y desplegarlas con CI/CD en producción

---

## 📚 Estructura del Bootcamp

### Distribución por Fases

#### **Fundamentos (Semanas 1-2)** — 16 horas

- Runtime Node.js: event loop, módulos ESM, async/await, streams
- TypeScript para backend: tsconfig, tipos, interfaces, generics
- Express 5: servidor HTTP, routing, middleware chain, req/res lifecycle
- Manejo de errores global y logging básico

#### **Core API (Semanas 3-8)** — 48 horas

- Arquitectura en capas: routes → controllers → services → repositories
- Validación de schemas con Zod y manejo centralizado de errores
- Base de datos relacional: PostgreSQL + Prisma ORM, migraciones, relaciones
- Base de datos NoSQL: MongoDB + Mongoose, comparativa y casos de uso
- Autenticación: bcrypt, JWT access/refresh tokens, cookies HttpOnly
- Autorización & seguridad: RBAC, Helmet, rate limiting, CORS, sanitización

#### **Avanzado (Semanas 9-13)** — 40 horas

- Testing: Jest + Supertest, unit/integration, mocks, cobertura
- File uploads & emails: Multer, S3/Cloudinary, Nodemailer
- WebSockets: Socket.io, rooms, autenticación WS, patrones real-time
- Caching & performance: Redis, paginación eficiente, compresión
- Documentación: OpenAPI/Swagger, versionado, contratos de API

#### **Producción (Semanas 14-16)** — 24 horas

- Docker: Dockerfile multi-stage, docker-compose, secrets, variables de entorno
- CI/CD: GitHub Actions, Railway/Render, monitoring con Logtail
- Proyecto final integrador (semana 16)

### Contenido Semana a Semana

| Semana | Slug                        | Tema                                                         |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 01     | `nodejs_fundamentals`       | Node.js runtime, módulos ESM, async/await, TypeScript config |
| 02     | `express_intro`             | Servidor HTTP, routing, middleware, req/res lifecycle        |
| 03     | `rest_api_arquitectura`     | Capas routes/controllers/services, HTTP status codes, REST   |
| 04     | `validacion_error_handling` | Zod, middleware global de errores, logging con Winston       |
| 05     | `postgresql_prisma`         | PostgreSQL + Prisma ORM, migraciones, relaciones             |
| 06     | `mongodb_mongoose`          | MongoDB + Mongoose, comparativa, casos de uso                |
| 07     | `autenticacion_jwt`         | bcrypt, JWT access/refresh tokens, cookies HttpOnly          |
| 08     | `autorizacion_seguridad`    | RBAC, Helmet, rate limiting, CORS, sanitización              |
| 09     | `testing`                   | Jest + Supertest, unit/integration, mocks, cobertura         |
| 10     | `uploads_emails`            | Multer, S3/Cloudinary, Nodemailer                            |
| 11     | `websockets`                | Socket.io, rooms, autenticación WS, patrones real-time       |
| 12     | `caching_performance`       | Redis, paginación eficiente, compresión                      |
| 13     | `openapi_swagger`           | OpenAPI/Swagger, versionado, contratos de API                |
| 14     | `docker`                    | Dockerfile multi-stage, docker-compose, secrets              |
| 15     | `cicd_deployment`           | GitHub Actions, Railway/Render, monitoring                   |
| 16     | `proyecto_final`            | Arquitectura completa, code review, presentación             |

---

## 🗂️ Estructura de Carpetas

Cada semana sigue esta estructura estándar:

```
bootcamp/week-XX-tema_principal/
├── README.md                 # Descripción y objetivos de la semana
├── rubrica-evaluacion.md     # Criterios de evaluación detallados
├── 0-assets/                 # Imágenes, diagramas y recursos visuales
├── 1-teoria/                 # Material teórico (archivos .md)
├── 2-practicas/              # Ejercicios guiados paso a paso
├── 3-proyecto/               # Proyecto semanal integrador
│   ├── README.md             # Instrucciones del proyecto
│   ├── starter/              # Código inicial para el estudiante
│   └── solution/             # ⚠️ OCULTA - Solo para instructores (.gitignore)
├── 4-recursos/               # Recursos adicionales
│   ├── ebooks-free/          # Libros electrónicos gratuitos
│   ├── videografia/          # Videos y tutoriales recomendados
│   └── webgrafia/            # Enlaces y documentación
└── 5-glosario/               # Términos clave de la semana (A-Z)
    └── README.md
```

### 📁 Carpetas Raíz

- **`assets/`**: Recursos visuales globales (logos, headers, etc.)
- **`docs/`**: Documentación general que aplica a todo el bootcamp
- **`scripts/`**: Scripts de automatización y utilidades
- **`bootcamp/`**: Contenido semanal del bootcamp

---

## 🎓 Componentes de Cada Semana

### 1. **Teoría** (1-teoria/)

- Archivos markdown con explicaciones conceptuales
- Ejemplos de código con comentarios educativos en español
- Diagramas SVG cuando sea necesario (nunca ASCII art)
- Referencias a documentación oficial de Node.js, Express y librerías del stack
- **Extensión objetivo: ~150 líneas por archivo** (no superar 200 líneas — dividir en archivos temáticos si es necesario)

### 2. **Prácticas** (2-practicas/)

- Ejercicios guiados paso a paso
- Incremento progresivo de dificultad
- Código comentado y explicado
- Casos de uso del mundo real en contexto de APIs REST

#### 📋 Formato de Ejercicios

Los ejercicios son **tutoriales guiados**, NO tareas con TODOs. El estudiante aprende descomentando código:

**README.md del ejercicio:**

```markdown
### Paso 1: Crear un router básico en Express

Explicación del concepto con ejemplo:

\`\`\`ts
// Ejemplo explicativo
const router = Router();
router.get('/items', async (req, res) => {
const items = await itemService.findAll();
res.json(items);
});
\`\`\`

**Abre `starter/src/routes/items.ts`** y descomenta la sección correspondiente.
```

**starter/src/routes/items.ts:**

```ts
// ============================================
// PASO 1: Router básico de Express
// ============================================

// Este router maneja las rutas del recurso items
// Descomenta las siguientes líneas:
// const router = Router();
// router.get('/items', async (req, res) => {
//   const items = await itemService.findAll();
//   res.json(items);
// });
```

> ⚠️ **IMPORTANTE**: Los ejercicios NO tienen carpeta `solution/`. El estudiante aprende descomentando el código y verificando que funcione correctamente.

#### ❌ NO usar este formato en ejercicios:

```ts
// ❌ INCORRECTO - Este formato es para PROYECTOS, no ejercicios
router.get("/items", async (req, res) => {
  // TODO: Implementar listado de items
  res.json([]);
});
```

#### ✅ Usar este formato en ejercicios:

```ts
// ✅ CORRECTO - Código comentado para descomentar
// Descomenta las siguientes líneas:
// router.get('/items', async (req, res) => {
//   const items = await itemService.findAll();
//   res.json(items);
// });
```

### 3. **Proyecto** (3-proyecto/)

- Proyecto integrador que consolida lo aprendido en la semana
- README.md con instrucciones claras
- Código inicial en `starter/`
- Carpeta `solution/` oculta (en `.gitignore`) solo para instructores
- Criterios de evaluación específicos
- **Política de Dominios Únicos**: Cada aprendiz trabaja sobre un dominio diferente

#### 🏛️ Política de Dominios Únicos (Anticopia)

**Cada aprendiz recibe un dominio único asignado por el instructor:**

- 📖 Biblioteca
- 💊 Farmacia
- 🏋️ Gimnasio
- 🏫 Escuela
- 🏬 Tienda de mascotas
- 🍽️ Restaurante
- 🏦 Banco
- 🚕 Agencia de taxis
- 🏥 Hospital
- 🎥 Cine
- 🏞️ Hotel
- ✈️ Agencia de viajes
- 🏎️ Concesionario de autos
- 👗 Tienda de ropa
- 🛠️ Taller mecánico
- Y otros dominios únicos según cantidad de aprendices

**Objetivo:**

- Prevenir copia entre estudiantes
- Fomentar implementaciones originales
- Aplicar conceptos generales a contextos específicos
- Desarrollar capacidad de abstracción y adaptación

**El instructor debe:**

1. Asignar un dominio único a cada aprendiz al inicio del bootcamp
2. Mantener un registro de dominios asignados
3. No repetir dominios en el mismo grupo
4. Validar que las implementaciones sean coherentes con el dominio

#### 📋 Formato de Proyecto (con TODOs)

A diferencia de los ejercicios, el proyecto SÍ usa TODOs para que el estudiante implemente desde cero. **Las instrucciones del proyecto deben ser genéricas y adaptables a cualquier dominio.**

**starter/src/controllers/items.controller.ts:**

```ts
// ============================================
// CONTROLLER: ItemsController
// CRUD del recurso principal del dominio
// ============================================

// NOTA PARA EL APRENDIZ:
// Adapta este controlador a tu dominio asignado.
// Ejemplos:
// - Biblioteca: controlador de libros
// - Farmacia: controlador de medicamentos
// - Gimnasio: controlador de miembros

import { Request, Response, NextFunction } from "express";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  // TODO: Implementar listado con paginación
  // Debe retornar { data: Item[], total: number, page: number }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  // TODO: Implementar búsqueda por ID
  // Manejar 404 si no existe
}

export async function create(req: Request, res: Response, next: NextFunction) {
  // TODO: Implementar creación validando con Zod
  // Retornar 201 con el recurso creado
}
```

**El README.md del proyecto debe incluir:**

```markdown
## 🚀 Proyecto Semanal: [Título Genérico]

### 🎯 Objetivo

Implementar [concepto aprendido] aplicado a tu dominio asignado.

### 📋 Tu Dominio Asignado

**Dominio**: [El instructor te asignará tu dominio]

### ✅ Requisitos Funcionales (Adaptables a tu dominio)

1. Crear endpoint para listar recursos con paginación
2. Implementar búsqueda/filtrado por campos del dominio
3. Agregar endpoints de creación, edición y eliminación

### 💡 Ejemplos de Adaptación por Dominio

- **Biblioteca**: Gestionar libros, autores, préstamos
- **Farmacia**: Gestionar medicamentos, ventas, inventario
- **Gimnasio**: Gestionar miembros, rutinas, asistencias
- **Restaurante**: Gestionar platillos, mesas, pedidos

### 🛠️ Entregables

1. API funcional con Postman/Thunder Client screenshots
2. Código adaptado a tu dominio
3. README con descripción de tu implementación
```

### 4. **Recursos** (4-recursos/)

- **ebooks-free/**: Libros gratuitos relevantes
- **videografia/**: Videos tutoriales complementarios
- **webgrafia/**: Enlaces a documentación oficial y artículos

### 5. **Glosario** (5-glosario/)

- Términos técnicos ordenados alfabéticamente
- Definiciones claras y concisas en español
- Ejemplos de código cuando aplique

---

## 📝 Convenciones de Código

### TypeScript Moderno

```ts
// ✅ BIEN - interfaces para tipos de dominio
interface CreateUserDto {
  email: string;
  password: string;
  name: string;
}

// ✅ BIEN - funciones async tipadas explícitamente
export async function createUser(dto: CreateUserDto): Promise<User> {
  const hashed = await bcrypt.hash(dto.password, 10);
  return prisma.user.create({ data: { ...dto, password: hashed } });
}

// ✅ BIEN - manejo de errores tipado
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

// ❌ MAL - sin tipos
export async function createUser(dto) {
  return prisma.user.create({ data: dto });
}
```

### Nomenclatura

- **Clases y tipos**: PascalCase (`UserService`, `CreateUserDto`)
- **Funciones y variables**: camelCase (`getUserById`, `accessToken`)
- **Constantes globales**: UPPER_SNAKE_CASE (`JWT_SECRET`, `MAX_RETRIES`)
- **Archivos de rutas**: kebab-case (`user.routes.ts`, `auth.routes.ts`)
- **Archivos de servicios**: camelCase + sufijo (`user.service.ts`)
- **Archivos de controladores**: camelCase + sufijo (`user.controller.ts`)
- **Idioma**: inglés para código, español para documentación

### Llaves primarias en Prisma

- **Toda PK es UUID.** En cualquier `schema.prisma`, sin excepción:
  ```prisma
  id String @id @default(uuid()) @db.Uuid
  ```
- **Nunca** `Int @id @default(autoincrement())` ni `@default(cuid())`.
- Las FK que apuntan a una PK deben tener el mismo tipo: `String @db.Uuid`
  (o `String? @db.Uuid` si la relación es opcional).
- En SQL crudo el equivalente es `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
  (nativo desde PostgreSQL 13; el bootcamp usa `postgres:16-alpine`).
- Consecuencias en el código: el `:id` de las rutas es un `string` — nunca
  `Number(req.params.id)` — y los validadores Zod de FK usan
  `z.string().uuid()`, no `z.number().int()`.

### Arquitectura en Capas

```
src/
├── app.ts               # Configuración Express (middlewares, rutas)
├── server.ts            # Entry point (listen, signals)
├── config/              # Variables de entorno y configuración
│   └── env.ts
├── routes/              # Definición de rutas (thin layer)
│   └── user.routes.ts
├── controllers/         # Manejo de req/res, llama servicios
│   └── user.controller.ts
├── services/            # Lógica de negocio
│   └── user.service.ts
├── repositories/        # Acceso a datos (Prisma/Mongoose)
│   └── user.repository.ts
├── middlewares/         # Middlewares reutilizables
│   ├── auth.middleware.ts
│   └── error.middleware.ts
├── validators/          # Schemas Zod
│   └── user.schema.ts
├── types/               # Tipos e interfaces globales
│   └── index.ts
└── utils/               # Funciones utilitarias
    └── jwt.ts
```

---

## 🧪 Testing

El bootcamp enseña testing con **Jest** y **Supertest**.

### Estructura de Tests

```ts
// __tests__/user.service.test.ts
import { UserService } from "../src/services/user.service";
import { prismaMock } from "./mocks/prisma.mock";

describe("UserService", () => {
  it("crea un usuario con contraseña hasheada", async () => {
    const dto = { email: "test@test.com", password: "123456", name: "Test" };
    prismaMock.user.create.mockResolvedValue({ id: "1", ...dto });

    const user = await UserService.create(dto);

    expect(user.id).toBe("1");
    expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Tests con Supertest

```ts
// __tests__/auth.integration.test.ts
import request from "supertest";
import { app } from "../src/app";

describe("POST /api/v1/auth/login", () => {
  it("retorna 200 y token con credenciales válidas", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test@test.com", password: "123456" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
  });

  it("retorna 401 con credenciales inválidas", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test@test.com", password: "wrong" });

    expect(res.status).toBe(401);
  });
});
```

---

## 📖 Documentación

### README.md de Semana

Debe incluir:

1. **Título y descripción**
2. **🎯 Objetivos de aprendizaje**
3. **📚 Requisitos previos**
4. **🗂️ Estructura de la semana**
5. **📝 Contenidos** (con enlaces a teoría/prácticas)
6. **⏱️ Distribución del tiempo** (8 horas)
7. **📌 Entregables**
8. **🔗 Navegación** (anterior/siguiente semana)

### Archivos de Teoría

```markdown
# Título del Tema

## 🎯 Objetivos

- Objetivo 1
- Objetivo 2

## 📋 Contenido

### 1. Introducción

### 2. Conceptos Clave

### 3. Ejemplos Prácticos

### 4. Casos de Uso en APIs REST

## 📚 Recursos Adicionales

## ✅ Checklist de Verificación
```

---

## 🎨 Recursos Visuales y Estándares de Diseño

### Formato de Assets

- ✅ **Preferir SVG** para todos los diagramas, iconos y gráficos
- ❌ **NO usar ASCII art** para diagramas o visualizaciones
- ✅ Usar PNG/JPG solo para screenshots de Postman/Thunder Client
- ✅ Optimizar imágenes antes de incluirlas

### Criterio para Assets SVG por Semana

Los assets SVG en `0-assets/` tienen un propósito educativo específico:

- ✅ Diagramas de arquitectura en capas (routes → controllers → services)
- ✅ Flujos de autenticación JWT (access/refresh tokens)
- ✅ Diagramas entidad-relación simplificados
- ✅ Headers de semana para identificación visual

**Reglas de vinculación:**

1. Todo SVG debe estar **vinculado en al menos un archivo** de teoría o práctica
2. Usar sintaxis markdown: `![Descripción](../0-assets/nombre.svg)`
3. Incluir texto alternativo descriptivo para accesibilidad
4. Nombrar descriptivamente y en orden lógico de lectura: `01-jwt-flow.svg`, `02-layered-architecture.svg`

### Tema Visual

- 🌙 **Tema dark** para todos los assets visuales
- ❌ **Sin degradés** (gradients) en diseños
- ✅ Colores sólidos y contrastes claros
- ✅ Paleta basada en verde Node.js (#68A063) y negro (#222222)

### Tipografía

- ✅ **Fuentes sans-serif** exclusivamente (Inter, Roboto, System UI)
- ❌ **NO usar fuentes serif**
- ✅ Mantener jerarquía visual clara

---

## 🌐 Idioma y Nomenclatura

### Código y Comentarios Técnicos

- ✅ **Nomenclatura en inglés** (variables, funciones, clases, tipos)
- ✅ **Comentarios de código en inglés**
- ✅ Usar términos técnicos estándar de la industria

```ts
// ✅ CORRECTO - inglés
async function getUserById(userId: string): Promise<User | null> {
  // Fetch user from database by primary key
  return prisma.user.findUnique({ where: { id: userId } });
}

// ❌ INCORRECTO - español en código
async function obtenerUsuarioPorId(idUsuario: string): Promise<Usuario | null> {
  // Buscar usuario en base de datos por llave primaria
  return prisma.usuario.findUnique({ where: { id: idUsuario } });
}
```

### Documentación

- ✅ **Documentación en español** (READMEs, teoría, guías)
- ✅ Comentarios educativos en español cuando expliquen conceptos

```ts
// ✅ CORRECTO - código en inglés, explicación educativa en español
function generateAccessToken(payload: TokenPayload): string {
  // El access token tiene vida corta (15 min) para limitar el daño
  // si es interceptado. El refresh token renueva el ciclo.
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "15m" });
}
```

---

## 🔐 Mejores Prácticas

### Código Limpio

- Nombres descriptivos y significativos
- Funciones con una sola responsabilidad
- Evitar anidamiento profundo (early returns)
- Controladores delgados — lógica de negocio en services

### Seguridad

- Nunca almacenar contraseñas en texto plano (siempre bcrypt)
- Validar todos los inputs de entrada con Zod en la capa de controllers
- No exponer stack traces en respuestas de producción
- Usar variables de entorno para secretos (nunca hardcodear)
- Aplicar Helmet en todas las apps Express
- Rate limiting en endpoints de autenticación y endpoints públicos
- Sanitizar inputs para prevenir NoSQL injection y XSS
- Cookies HttpOnly + Secure + SameSite para tokens de sesión

### Rendimiento

- Paginación en todos los endpoints de listado (cursor o offset)
- Índices en columnas frecuentemente consultadas (Prisma migrations)
- Usar Redis para caché de respuestas costosas
- Compresión gzip con `compression` middleware
- Evitar N+1 queries (usar `include` en Prisma con criterio)

---

## 📊 Evaluación

Cada semana incluye **tres tipos de evidencias**:

1. **Conocimiento 🧠** (30%): Evaluaciones teóricas, cuestionarios
2. **Desempeño 💪** (40%): Ejercicios prácticos en clase
3. **Producto 📦** (30%): Proyecto entregable funcional

### Criterios de Aprobación

- Mínimo **70%** en cada tipo de evidencia
- Entrega puntual de proyectos
- API funcional y probada con Postman/Thunder Client
- Tests pasando (cuando aplique)
- **Implementación coherente con el dominio asignado**
- **Originalidad**: Sin copia de implementaciones de otros aprendices

---

## 🚀 Metodología de Aprendizaje

### Estrategias Didácticas

- **Aprendizaje Basado en Proyectos (ABP)**: Proyectos semanales integradores
- **Dominios Únicos**: Cada aprendiz aplica conceptos a su dominio asignado (anticopia)
- **Práctica Deliberada**: Ejercicios incrementales con feedback inmediato
- **API-First Thinking**: Siempre pensar en contratos, status codes y consumidores
- **Code Review**: Revisión de código entre estudiantes
- **Live Coding**: Sesiones en vivo de programación

### Distribución del Tiempo (8h/semana)

- **Teoría**: 2 horas
- **Prácticas**: 3-4 horas
- **Proyecto**: 2-3 horas

---

## 🤖 Instrucciones para Copilot

Cuando trabajes en este proyecto:

### Límites de Respuesta

1. **Divide respuestas largas**
   - ❌ **NUNCA generar respuestas que superen los límites de tokens**
   - ✅ **SIEMPRE dividir contenido extenso en múltiples entregas**
   - ✅ Crear contenido por secciones, esperar confirmación del usuario
   - ✅ Priorizar calidad sobre cantidad en cada entrega

2. **Estrategia de División**
   - Para semanas completas: dividir por carpetas (teoria → practicas → proyecto)
   - Para archivos grandes: dividir por secciones lógicas
   - Siempre indicar claramente qué parte se entrega y qué falta

### Generación de Código

1. **Usa siempre TypeScript moderno (5.x)**
   - Tipos explícitos obligatorios en funciones y retornos
   - `interface` para DTOs y tipos de dominio
   - Genéricos nativos (`Array<string>` o `string[]`)

2. **Entorno de Desarrollo**
   - ✅ Node.js 22+ con módulos ESM o CommonJS según contexto
   - ✅ `tsconfig.json` con `strict: true`
   - ✅ Variables de entorno con validación Zod en `config/env.ts`

3. **Gestión de Paquetes**
   - ✅ **SOLO usar `pnpm`** como gestor de paquetes
   - ✅ Versiones exactas siempre (sin `^`, `~`, `*`)
   - ❌ **NUNCA usar `npm` ni `yarn`**
   - Comandos: `pnpm add express@5.1.0`, `pnpm add -D @types/node@22.0.0`

4. **Seguridad**
   - Aplicar principios OWASP Top 10 en todos los ejemplos
   - Nunca generar código con secretos hardcodeados
   - Siempre validar inputs antes de procesarlos

### Creación de Contenido

1. **Estructura clara y progresiva**
   - De lo simple a lo complejo
   - Conceptos construidos sobre conocimientos previos
   - Siempre contextualizar en el mundo de las APIs REST

2. **Ejemplos del mundo real**
   - APIs que los estudiantes reconocen (e-commerce, auth, CRUD)
   - Casos de uso prácticos en contexto backend
   - Proyectos que los estudiantes puedan mostrar en portafolios

3. **Enfoque moderno**
   - No mencionar características obsoletas (no callbacks legacy, no `var`)
   - Enfocarse en Express 5, ESM, async/await nativo
   - Usar Prisma como ORM principal (Mongoose como alternativa NoSQL)

4. **Comenta el código de manera educativa**
   - Explica el por qué, no solo el qué
   - Señala diferencias con frontend cuando aplique
   - Usa comentarios que enseñen, no solo describan

### Respuestas y Ayuda

1. **Explicaciones claras**
   - Lenguaje simple y directo
   - Proporcionar analogías con conceptos conocidos cuando sea útil

2. **Código comentado**
   - Explicar cada paso importante
   - Señalar posibles errores comunes en backend

3. **Recursos adicionales**
   - Referencias a documentación oficial de Node.js y Express
   - Artículos relevantes de calidad

---

## 📚 Referencias Oficiales

- **Node.js**: https://nodejs.org/docs/latest/api/
- **Express 5**: https://expressjs.com/
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Prisma**: https://www.prisma.io/docs/
- **Zod**: https://zod.dev/
- **Jest**: https://jestjs.io/docs/getting-started
- **Socket.io**: https://socket.io/docs/v4/
- **Redis (ioredis)**: https://github.com/redis/ioredis
- **Swagger / OpenAPI**: https://swagger.io/docs/

---

## 🔗 Enlaces Importantes

- **Repositorio**: https://github.com/ergrato-dev/bc-expressjs
- **Documentación general**: [docs/README.md](docs/README.md)
- **Primera semana**: [bootcamp/week-01-nodejs_fundamentals/README.md](bootcamp/week-01-nodejs_fundamentals/README.md)

---

## ✅ Checklist para Nuevas Semanas

Cuando crees contenido para una nueva semana:

- [ ] Crear estructura de carpetas completa
- [ ] README.md con objetivos y estructura
- [ ] Material teórico en 1-teoria/
- [ ] Ejercicios prácticos en 2-practicas/
- [ ] Proyecto integrador en 3-proyecto/
- [ ] Recursos adicionales en 4-recursos/
- [ ] Glosario de términos en 5-glosario/
- [ ] Rúbrica de evaluación
- [ ] Verificar coherencia con semanas anteriores
- [ ] Revisar progresión de dificultad
- [ ] Probar código de ejemplos (compilación TypeScript sin errores)

---

## 💡 Notas Finales

- **Prioridad**: Claridad sobre brevedad
- **Enfoque**: Aprendizaje práctico sobre teoría abstracta
- **Objetivo**: Preparar desarrolladores backend listos para trabajar
- **Filosofía**: Express moderno con TypeScript y buenas prácticas desde el día 1

---

_Última actualización: Abril 2026_
_Versión: 1.0_
