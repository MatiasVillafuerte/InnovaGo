# InnovaGO conectado a Firebase Realtime Database

Este proyecto ya está conectado a la base de datos de Firebase:

```txt
https://mapache-5def3-default-rtdb.firebaseio.com/
```

Los datos se guardan dentro de esta ruta para no mezclar con otras apps:

```txt
innovago
├─ emprendimientos
├─ categorias
├─ usuarios
├─ resenas
└─ meta
```

## Cómo ejecutar

Para esta versión con Firebase NO necesitas ejecutar el backend ni MySQL.

```bash
cd frontend
npm install
npm run dev
```

Abre el enlace que muestra Vite, normalmente:

```txt
http://localhost:5173/
```

## Reglas de Firebase para prueba

En Firebase entra a Realtime Database > Rules y para probar puedes poner:

```json
{
  "rules": {
    "innovago": {
      ".read": true,
      ".write": true
    }
  }
}
```

Estas reglas son solo para exposición/prueba académica. Para producción se deben proteger con autenticación real.

## Qué se conectó

- Registro de usuarios en Firebase.
- Inicio de sesión usando usuarios guardados en Firebase.
- Catálogo de emprendimientos desde Firebase.
- Mapa de emprendimientos desde Firebase.
- Detalle de emprendimiento desde Firebase.
- Crear emprendimiento y guardarlo como pendiente en Firebase.
- Panel admin: aprobar, rechazar y eliminar emprendimientos en Firebase.
- Panel admin: ver, bloquear, desbloquear y eliminar usuarios en Firebase.

## Usuarios rápidos para probar

Puedes iniciar sesión con estos correos. La primera vez que los uses, se guardan en Firebase con la contraseña que escribas:

```txt
admin@example.com
emprendedor@example.com
usuario@test.com
```

La contraseña debe tener al menos 6 caracteres en login y una contraseña fuerte en registro.
