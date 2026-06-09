# miAgua - Sistema de Gestión de Agua (ADESCO)

Este proyecto es una plataforma integral para la gestión de servicios de agua potable en comunidades (ADESCO). Permite la gestión de usuarios, propiedades, lecturas de medidores, generación de recibos y procesamiento de pagos.

##  Tecnologías Utilizadas

### Backend
- **Java 17** & **Spring Boot 3.4.3**
- **Spring Data JPA**: Para el acceso y persistencia de datos.
- **Spring Security & JWT**: Autenticación y autorización basada en tokens.
- **PostgreSQL**: Base de datos relacional para producción.
- **H2 Database**: Base de datos en memoria para pruebas.
- **Lombok**: Para reducir el código boilerplate.
- **Maven**: Gestor de dependencias y construcción.

### Frontend
- **Angular 21**: Framework principal.
- **PrimeNG & PrimeFlex**: Componentes de UI y sistema de diseño responsive.
- **PrimeIcons**: Set de iconos oficial de Prime.
- **RxJS**: Programación reactiva para el manejo de flujos de datos.
- **TypeScript**: Lenguaje de programación.
- **Vitest**: Framework de pruebas unitarias.

### Infraestructura y Despliegue
- **Docker & Docker Compose**: Contenedorización de servicios.
- **Nginx**: Servidor web para el frontend en producción.

---

##  Compilación y Ejecución Local

### Requisitos Previos
- JDK 17 o superior.
- Node.js (versión 20+ recomendada) y npm.
- Maven (opcional, se incluye `mvnw`).

### Backend (Local)
Para compilar y ejecutar el backend localmente, navega a la carpeta `backend` y ejecuta:

```bash
cd backend
# Compilar saltando los tests
./mvnw clean package -DskipTests

# Ejecutar la aplicación
./mvnw spring-boot:run
```
La API estará disponible en `http://localhost:8080`.

### Frontend (Local)
Para ejecutar el frontend en modo desarrollo, navega a la carpeta `frontend` y ejecuta:

```bash
cd frontend
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```
La aplicación estará disponible en `http://localhost:4200`.

---

##  Uso con Docker Compose

El proyecto está configurado para ejecutarse fácilmente mediante contenedores, incluyendo la base de datos, el backend y el frontend.

### Configuración de Entorno
Asegúrate de tener un archivo `.env` en la raíz del proyecto (basado en `load_env.sh` o las variables requeridas en `docker-compose.yml`) con las credenciales necesarias.

### Levantar los servicios
Ejecuta el siguiente comando en la raíz del proyecto:

```bash
docker-compose up --build
```

Esto realizará lo siguiente:
1. Levantará una instancia de **PostgreSQL**.
2. Construirá la imagen del **Backend** y esperará a que la DB esté lista.
3. Construirá la imagen del **Frontend** (Angular) y la servirá mediante Nginx.

Para detener los servicios:
```bash
docker-compose down
```

---

## 📄 Notas Adicionales
- Para la compilación en local del backend, se recomienda el uso del flag `-DskipTests` para agilizar el proceso de empaquetado inicial.
- Los logs del sistema en contenedores pueden visualizarse con `docker-compose logs -f`.
