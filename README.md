# InnovaGO

Plataforma unificada para emprendedores y usuarios en Bolivia.

## Estructura

```
InnovaGO/
├── backend/          # API Node.js + MySQL (autenticación)
└── frontend/         # Aplicación React unificada
```

## Módulos integrados

| Módulo | Origen | Rutas |
|--------|--------|-------|
| Autenticación | `login` | `/login`, `/register`, `/verify-email` |
| Público | `InnovaGo-ayelen` + `Yubidsa` | `/`, `/buscar`, `/mapa`, `/emprendimiento/:id`, etc. |
| Panel Admin | `panel-admin` | `/admin/*` |
| Panel Emprendedor | `vista-emprendedor` | `/emprendedor/*` |

## Inicio rápido

### Backend (opcional — requiere MySQL)

```bash
cd backend
cp .env.example .env
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

La app estará en http://localhost:3000

## Diseño

El sistema visual está basado en la carpeta `login` (Tailwind, paleta azul primary, componentes `.btn-primary`, `.card`, `.input-field`).

## Carpetas originales

Las carpetas originales del proyecto (`login`, `InnovaGo-ayelen`, etc.) se conservan como referencia. El proyecto activo es `InnovaGO/`.
