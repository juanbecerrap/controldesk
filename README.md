# ControlDesk

**ControlDesk** es un dashboard administrativo web desarrollado con React y Firebase, diseñado para gestionar usuarios, roles y permisos de acceso desde una interfaz moderna y responsive.

El proyecto implementa autenticación, autorización basada en roles, protección de rutas y reglas de seguridad en Firestore.

## 🚀 Demo

**Aplicación en producción:**
https://controldesk-e3bde.web.app

**Repositorio:**
https://github.com/juanbecerrap/controldesk

---

## ✨ Características

* 🔐 Registro e inicio de sesión con Firebase Authentication.
* 👤 Gestión de usuarios desde un panel administrativo.
* 🛡️ Sistema de roles: administrador y usuario.
* 🚦 Control de estado de las cuentas: activo y desactivado.
* 🔒 Rutas protegidas según autenticación y permisos.
* 👥 Visualización de usuarios registrados.
* ✏️ Actualización de roles y estados desde el panel.
* 🔥 Persistencia de datos con Cloud Firestore.
* 🛡️ Reglas de seguridad para proteger la información.
* 📱 Interfaz responsive para diferentes tamaños de pantalla.
* 🚀 Despliegue en Firebase Hosting.

---

## 🛠️ Tecnologías

### Frontend

* React
* JavaScript
* React Router
* Vite
* CSS

### Backend y servicios

* Firebase Authentication
* Cloud Firestore
* Firebase Hosting
* Firebase Cloud Functions

### Herramientas

* Git
* GitHub
* ESLint
* Visual Studio Code

---

## 🏗️ Arquitectura

El proyecto está organizado siguiendo una separación de responsabilidades entre interfaz, autenticación, rutas, servicios y configuración de Firebase.

```text
src/
├── components/
│   ├── BrandMark.jsx
│   └── Sidebar.jsx
│
├── constants/
│   ├── roles.js
│   └── routes.js
│
├── context/
│   ├── AuthContext.js
│   └── AuthProvider.jsx
│
├── firebase/
│   └── firebase.js
│
├── layouts/
│   └── AppLayout.jsx
│
├── pages/
│   ├── DashboardPage.jsx
│   ├── LoginPage.jsx
│   ├── NotFoundPage.jsx
│   ├── RegisterPage.jsx
│   └── UsersPage.jsx
│
├── routes/
│   ├── AdminRoute.jsx
│   ├── ProtectedRoute.jsx
│   └── PublicOnlyRoute.jsx
│
└── services/
    ├── authService.js
    └── userService.js
```

---

## 🔐 Autenticación y autorización

ControlDesk utiliza **Firebase Authentication** para gestionar el acceso de los usuarios.

Cada usuario cuenta además con un documento asociado en Firestore:

```text
users/{uid}
```

con información como:

```text
email
displayName
role
status
createdAt
```

Los roles disponibles son:

* `admin` — acceso a las funcionalidades administrativas.
* `user` — acceso a las funcionalidades generales.

El acceso también depende del estado de la cuenta:

* `active` — usuario habilitado.
* `disabled` — usuario sin acceso al dashboard.

Las rutas administrativas están protegidas mediante componentes de autorización para impedir que usuarios sin permisos accedan directamente a ellas.

---

## 🛡️ Seguridad

El proyecto utiliza **Cloud Firestore Security Rules** para controlar el acceso a los datos.

Las reglas permiten:

* A los usuarios autenticados consultar su propio perfil.
* A los administradores gestionar los perfiles de usuarios.
* Restringir la creación de perfiles a través del flujo de registro.
* Impedir operaciones no autorizadas sobre otras colecciones.

Además, el cliente no debe considerarse la única capa de seguridad: las reglas de Firestore funcionan como una segunda barrera para proteger los datos.

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/juanbecerrap/controldesk.git
```

### 2. Entrar al proyecto

```bash
cd controldesk
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar las variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

> Las credenciales reales no deben incluirse en el repositorio.

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en la URL local mostrada por Vite.

---

## 🏗️ Build de producción

Para generar la versión optimizada:

```bash
npm run build
```

Para comprobar la calidad del código:

```bash
npm run lint
```

---

## 🚀 Despliegue

El proyecto está desplegado utilizando Firebase Hosting.

Para generar el build:

```bash
npm run build
```

Y posteriormente:

```bash
firebase deploy --only hosting
```

### Producción

https://controldesk-e3bde.web.app

---

## 📸 Capturas

Las capturas de pantalla del proyecto pueden incorporarse aquí para mostrar:

* Pantalla de inicio de sesión.
* Dashboard.
* Gestión de usuarios.
* Control de roles.
* Diseño responsive.

---

## 🎯 Objetivo del proyecto

ControlDesk fue desarrollado como un proyecto práctico para aplicar conceptos de desarrollo frontend moderno, autenticación, autorización, gestión de usuarios, persistencia de datos y seguridad en aplicaciones web.

El proyecto también busca demostrar la capacidad de construir y desplegar una aplicación completa utilizando servicios modernos de frontend y backend administrado.

---

## 👨‍💻 Autor

**Juan Angel Becerra**

Desarrollador Web Junior enfocado en el desarrollo de aplicaciones web modernas, responsivas y funcionales.

### Tecnologías

React · JavaScript · HTML · CSS · Firebase · Git · GitHub

