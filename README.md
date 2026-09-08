# 🚀 Proyecto Semanal — Procesador de Datos con Node.js

## 🎯 Objetivo

Construir una herramienta de línea de comandos que lea datos de modelos desde un archivo JSON, los procese y genere un reporte con los resultados usando **Node.js + TypeScript + async/await**.

---

## 📋 Dominio: Agencia de Modelos

El proyecto fue adaptado al dominio de una **Agencia de Modelos**.

El recurso principal es `Model`.

Cada modelo contiene los siguientes datos:

| Campo      | Descripción                     |
| ---------- | ------------------------------- |
| `id`       | Identificador del modelo        |
| `name`     | Nombre del modelo               |
| `category` | Categoría del modelo            |
| `price`    | Precio del servicio             |
| `age`      | Edad del modelo                 |
| `city`     | Ciudad                          |
| `active`   | Indica si el modelo está activo |

Las categorías utilizadas son:

* `fashion`
* `commercial`
* `editorial`

Los datos se encuentran en:

```text
starter/data/items.json
```

El archivo contiene 10 modelos.

---

## ✅ Funcionalidades

### 1. Leer datos

El programa lee los modelos desde `data/items.json` utilizando `fs/promises` y `async/await`.

### 2. Mostrar resumen

El programa muestra:

* Total de modelos
* Modelos activos
* Modelos inactivos
* Precio promedio
* Categorías disponibles

También calcula el modelo más caro y el más barato para el reporte.

### 3. Filtrar por categoría

Se puede filtrar los modelos utilizando `--category`.

Ejemplo:

```bash
pnpm dev -- --category fashion
```

También se pueden utilizar:

```bash
pnpm dev -- --category commercial
```

```bash
pnpm dev -- --category editorial
```

### 4. Generar reporte

El resultado del procesamiento se guarda en:

```text
starter/output/report.json
```

El reporte contiene la fecha de generación, el filtro aplicado, el resumen y los modelos procesados.

### 5. Manejo de errores

El programa utiliza `try/catch` para manejar errores.

Si se busca una categoría que no existe, muestra un mensaje indicando las categorías disponibles.

Ejemplo:

```bash
pnpm dev -- --category test
```

---

## 🛠️ Tecnologías utilizadas

* Node.js
* TypeScript
* pnpm
* fs/promises
* async/await
* ES Modules

---

## 🧪 Cómo ejecutar el proyecto

Desde la carpeta `starter`:

```bash
pnpm install
```

Para ejecutar el programa:

```bash
pnpm dev
```

Para utilizar un filtro:

```bash
pnpm dev -- --category fashion
```

Para comprobar que el proyecto compila correctamente:

```bash
pnpm build
```

---

## 📁 Estructura principal

```text
starter/
├── data/
│   └── items.json
├── output/
│   └── report.json
├── src/
│   ├── index.ts
│   ├── processor.ts
│   ├── reader.ts
│   ├── types.ts
│   └── writer.ts
├── package.json
└── tsconfig.json
```

---

## 📊 Pruebas realizadas

Se probó el programa sin filtro y utilizando las categorías del dominio.

### Sin filtro

```text
Total de modelos: 10
Modelos activos: 8
Modelos inactivos: 2
Precio promedio: $445000
Categorías: fashion, commercial, editorial
```

### Filtro fashion

```text
Total de modelos: 4
Modelos activos: 3
Modelos inactivos: 1
Precio promedio: $587500
```

### Filtro commercial

```text
Total de modelos: 4
Modelos activos: 3
Modelos inactivos: 1
Precio promedio: $312500
```

### Filtro editorial

```text
Total de modelos: 2
Modelos activos: 2
Modelos inactivos: 0
Precio promedio: $425000
```

El reporte se genera correctamente en `output/report.json`.

---

## 📌 Resultado

El proyecto cumple con la lectura y procesamiento de datos, filtrado por categoría, generación del reporte, manejo de errores y configuración de TypeScript en modo estricto.
