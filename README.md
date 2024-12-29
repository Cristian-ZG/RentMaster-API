# RentMaster-API

**RentMaster-API** es una API RESTful desarrollada con Node.js y TypeScript, diseñada para gestionar sistemas de alquiler inmobiliarios. Este proyecto incluye funcionalidades para administrar apartamentos, arrendatarios, pagos, contratos y tickets de soporte, adaptándose a las necesidades tanto del administrador como del arrendatario.


## Requisitos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [MySQL](https://www.mysql.com/) (versión 5.7 o superior)
## Instalación y ejecución (localmente)

### 1. Clonar el repositorio:

```bash
  git clone https://github.com/Cristian-ZG/RentMaster-API.git
  cd RentMaster-API
```

### 2. Instalar dependencias:

```bash
  npm install
```

### 3. Configurar variables de entorno:

Nota: El archivo **.env** no está incluido en el repositorio por motivos de seguridad. Asegúrate de crearlo y configurarlo correctamente antes de ejecutar el proyecto.

### 4. Iniciar el servidor:

```bash
  npm run dev
```
## Variables de entorno

Para ejecutar este proyecto, deberá agregar las siguientes variables de entorno a su archivo **.env**

`PORT=3001`

`SECRET_KEY=tu_clave_secreta`

`DB_NAME=nombre_de_la_bd`

`DB_USER=usuario`

`DB_PASSWORD=contraseña`

`DB_HOST=host_base_datos`

`DB_DIALECT=mysql`