# Calculadora de IMC - Frontend

Aplicación web desarrollada con React, TypeScript y Vite para calcular el Índice de Masa Corporal (IMC).

## Despliegue en Vercel

Esta aplicación está configurada para ser desplegada fácilmente en Vercel. Sigue estos pasos para realizar el despliegue:

### Requisitos Previos

- Tener una cuenta en [Vercel](https://vercel.com/)
- Tener instalado [Git](https://git-scm.com/)
- Tener instalado [Node.js](https://nodejs.org/) (versión 16 o superior)

### Pasos para el Despliegue

1. **Clona el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd front-proyecto1
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configura las variables de entorno**
   Crea un archivo `.env` en la raíz del proyecto con las variables necesarias:
   ```
   VITE_API_URL=URL_DE_TU_API
   ```

4. **Despliega en Vercel**
   - Haz push de tu código a un repositorio en GitHub, GitLab o Bitbucket
   - Inicia sesión en tu cuenta de Vercel
   - Haz clic en "New Project"
   - Importa el repositorio donde está tu proyecto
   - Vercel detectará automáticamente que es un proyecto Vite y configurará todo por ti
   - Asegúrate de que el directorio de salida sea `dist`
   - Configura las variables de entorno en la sección de configuración del proyecto en Vercel
   - Haz clic en "Deploy"

### Configuración Recomendada en Vercel

- **Framework Preset:** Vite
- **Build Command:** `npm run build` o `yarn build`
- **Output Directory:** `dist`
- **Install Command:** `npm install` o `yarn install`
- **Node.js Version:** 18.x

### Variables de Entorno

Asegúrate de configurar las siguientes variables de entorno en la configuración de tu proyecto en Vercel:

- `VITE_API_URL`: URL base de tu API

## Desarrollo Local

1. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

2. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

3. **Abre tu navegador**
   La aplicación estará disponible en [http://localhost:5173](http://localhost:5173)

## Scripts Disponibles

- `dev`: Inicia el servidor de desarrollo
- `build`: Construye la aplicación para producción
- `preview`: Previsualiza la versión de producción localmente
- `lint`: Ejecuta el linter

## Tecnologías Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)

## Licencia

Este proyecto está bajo la Licencia MIT.
