
# Sistema de Gestión de Bodegas

Este es un sistema de gestión de bodegas diseñado para ayudar a dueños de bodegas pequeñas a gestionar productos, clientes y facturas de manera eficiente.

## Características principales

- **Gestión de productos**: Crear, leer, actualizar y eliminar productos.
- **Gestión de clientes**: Crear, leer, actualizar y eliminar clientes.
- **Generación de facturas**: Crear facturas automáticamente con totales calculados.
- **Interfaz amigable**: Diseño moderno y fácil de usar.

## Tecnologías utilizadas

- **Frontend**: React, TypeScript, Vite.
- **Backend**: Node.js, Express, TypeScript.
- **Base de datos**: PostgreSQL.
- **Despliegue**: Docker, Docker Compose.

## Requisitos

- Docker
- Docker Compose

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jaimeirazabal1/Node.js-Production-Mastery-Lab
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd tu-repositorio
   ```

3. Levanta los contenedores:
   ```bash
   docker-compose up --build
   ```

4. Accede a la aplicación:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:4000](http://localhost:4000)

## Estructura del proyecto

```
proyecto/
├── backend/
│   ├── src/
│   │   ├── db/
│   │   ├── routes/
│   │   └── server.ts
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── init-db.sql
└── README.md
```

## Contribución

Si deseas contribuir, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama con tu nueva funcionalidad (`git checkout -b nueva-funcionalidad`).
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`).
4. Haz push a la rama (`git push origin nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Para más detalles, consulta el archivo [LICENSE](LICENSE).
