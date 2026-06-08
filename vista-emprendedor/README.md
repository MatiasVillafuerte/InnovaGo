# InnovaGo — Vista Emprendedor

Dashboard moderno y responsive para emprendedores de la plataforma **InnovaGo**. Permite registrar, administrar y promocionar emprendimientos con una interfaz tipo SaaS profesional.

## Stack

- **React 19** + **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **React Router**
- **Recharts** (gráficos)
- **Lucide React** (iconos)

## Inicio rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

## Estructura del proyecto

```
src/
├── components/
│   ├── layout/       # Sidebar, Navbar, DashboardLayout
│   └── ui/           # Button, Card, Input, Modal, etc.
├── context/          # ThemeContext (modo claro/oscuro)
├── data/             # Datos de ejemplo (mockData)
├── lib/              # Utilidades (cn, formatCurrency)
├── pages/            # Páginas del dashboard
└── types/            # Tipos TypeScript
```

## Secciones incluidas

| Ruta | Descripción |
|------|-------------|
| `/` | Dashboard con estadísticas y gráfico de visitas |
| `/emprendimiento` | Formulario completo del negocio |
| `/productos` | CRUD de productos/servicios |
| `/promociones` | Descuentos, cupones y ofertas |
| `/mensajes` | Bandeja de entrada y respuestas |
| `/estadisticas` | Análisis y gráficos detallados |
| `/resenas` | Reseñas y calificaciones |
| `/configuracion` | Perfil, seguridad y notificaciones |

## Características de diseño

- Sidebar lateral colapsable
- Navbar superior con búsqueda y notificaciones
- Modo claro y oscuro (persistente en localStorage)
- Diseño responsive (móvil, tablet, escritorio)
- Componentes reutilizables

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Vista previa del build |
