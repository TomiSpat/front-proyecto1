# Calculadora de IMC

Una aplicación web moderna y elegante para calcular el Índice de Masa Corporal (IMC) con historial completo y filtros avanzados.

## Características

- **Cálculo de IMC**: Calcula automáticamente el IMC basado en peso y altura
- **Clasificación automática**: Muestra la categoría correspondiente (Bajo peso, Normal, Sobrepeso, Obeso)
- **Historial completo**: Guarda todos los cálculos realizados
- **Filtros avanzados**: Filtra por fecha, categoría, orden y cantidad de registros
- **Paginación**: Carga más registros bajo demanda
- **Diseño responsive**: Optimizado para móviles y desktop
- **Interfaz moderna**: Diseño limpio con animaciones suaves

## Instalación

### Prerrequisitos

- Node.js 18+ 
- Yarn (requerido)

### Pasos de instalación

1. **Clona el repositorio**
   \`\`\`bash
   git clone <url-del-repositorio>
   cd calculadora-imc
   \`\`\`

2. **Instala las dependencias**
   \`\`\`bash
   yarn install
   \`\`\`

3. **Inicia el servidor de desarrollo**
   \`\`\`bash
   yarn dev
   \`\`\`

4. **Abre tu navegador**
   \`\`\`
   http://localhost:3000
   \`\`\`

## Scripts disponibles

\`\`\`bash
# Desarrollo
yarn dev          # Inicia el servidor de desarrollo

# Producción
yarn build        # Construye la aplicación para producción
yarn start        # Inicia el servidor de producción

# Calidad de código
yarn lint         # Ejecuta el linter
\`\`\`


## Tecnologías utilizadas

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 19, TypeScript
- **Estilos**: Tailwind CSS, shadcn/ui
- **Formularios**: React Hook Form + Zod
- **Iconos**: Lucide React
- **Temas**: Next Themes

