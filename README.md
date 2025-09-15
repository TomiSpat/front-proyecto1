# 🏥 Calculadora de IMC (BMI Calculator)

Una aplicación web moderna y elegante para calcular el Índice de Masa Corporal (IMC) con historial completo y filtros avanzados.

## ✨ Características

- **Cálculo de IMC**: Calcula automáticamente el IMC basado en peso y altura
- **Clasificación automática**: Muestra la categoría correspondiente (Bajo peso, Normal, Sobrepeso, Obesidad)
- **Historial completo**: Guarda todos los cálculos realizados
- **Filtros avanzados**: Filtra por fecha, categoría, orden y cantidad de registros
- **Paginación**: Carga más registros bajo demanda
- **Diseño responsive**: Optimizado para móviles y desktop
- **Interfaz moderna**: Diseño limpio con animaciones suaves
- **Modo oscuro**: Soporte completo para tema oscuro/claro

## 🚀 Instalación

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

## 📝 Scripts disponibles

\`\`\`bash
# Desarrollo
yarn dev          # Inicia el servidor de desarrollo

# Producción
yarn build        # Construye la aplicación para producción
yarn start        # Inicia el servidor de producción

# Calidad de código
yarn lint         # Ejecuta el linter
\`\`\`

## 🏗️ Estructura del proyecto

\`\`\`
├── app/
│   ├── api/
│   │   └── imc/
│   │       ├── calcular/route.ts    # Endpoint para calcular IMC
│   │       └── historial/route.ts   # Endpoint para obtener historial
│   ├── globals.css                  # Estilos globales
│   ├── layout.tsx                   # Layout principal
│   └── page.tsx                     # Página principal
├── components/
│   ├── ui/                          # Componentes base de shadcn/ui
│   ├── error-message.tsx            # Componente de mensajes de error
│   ├── history-filter.tsx           # Filtros del historial
│   ├── history-section.tsx          # Sección principal del historial
│   ├── history-table.tsx            # Tabla de registros
│   ├── imc-form.tsx                 # Formulario de cálculo
│   ├── imc-result.tsx               # Resultado del cálculo
│   └── number-input.tsx             # Input numérico personalizado
├── services/
│   ├── api.ts                       # Cliente HTTP
│   └── imc-service.ts               # Servicios de IMC
├── types/
│   └── imc.ts                       # Tipos TypeScript
└── lib/
    └── utils.ts                     # Utilidades
\`\`\`

## 🔌 API Endpoints

### POST `/api/imc/calcular`
Calcula el IMC basado en peso y altura.

**Body:**
\`\`\`json
{
  "peso": 70,
  "altura": 175
}
\`\`\`

**Response:**
\`\`\`json
{
  "imc": 22.86,
  "categoria": "Normal",
  "fecha": "2024-01-15T10:30:00Z"
}
\`\`\`

### GET `/api/imc/historial`
Obtiene el historial de cálculos con filtros opcionales.

**Query Parameters:**
- `skip` (number): Registros a omitir para paginación
- `take` (number): Cantidad de registros a obtener
- `order` ('ASC' | 'DESC'): Orden de los resultados
- `categoria` (string): Filtrar por categoría de IMC
- `from` (date): Fecha de inicio
- `to` (date): Fecha de fin

**Response:**
\`\`\`json
[
  {
    "id": 1,
    "peso": 70,
    "altura": 175,
    "imc": 22.86,
    "categoria": "Normal",
    "fecha": "2024-01-15T10:30:00Z"
  }
]
\`\`\`

## 🎨 Tecnologías utilizadas

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 19, TypeScript
- **Estilos**: Tailwind CSS, shadcn/ui
- **Formularios**: React Hook Form + Zod
- **Iconos**: Lucide React
- **Animaciones**: Framer Motion (via Tailwind)
- **Notificaciones**: Sonner
- **Temas**: Next Themes

## 🎯 Categorías de IMC

| Categoría | Rango IMC | Color |
|-----------|-----------|-------|
| Bajo peso | < 18.5 | Azul |
| Normal | 18.5 - 24.9 | Verde |
| Sobrepeso | 25.0 - 29.9 | Amarillo |
| Obesidad | ≥ 30.0 | Rojo |

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🐛 Reportar problemas

Si encuentras algún problema o tienes sugerencias, por favor abre un [issue](../../issues) en GitHub.

---

Desarrollado con ❤️ usando Next.js y Tailwind CSS
