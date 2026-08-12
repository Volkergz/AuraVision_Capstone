# 🛠️ Auravision – Proyecto Expo de Programación Móvil

¡Bienvenido al repositorio de **Auravision**!

Aplicación móvil desarrollada con **Expo / React Native**, orientada a funcionar para gafas inteligentes. Este proyecto integra tecnologías modernas enfocadas en accesibilidad e interacción.

---

## 📦 Acerca del Proyecto

**Auravision** es una aplicación móvil creada con `create-expo-app`, diseñada como base para el desarrollo de soluciones enfocadas en asistencia para personas no videntes.

El proyecto contempla la integración de:

- 🔵 Conectividad **Bluetooth**
- 🗣️ **Text-to-Speech (TTS)**
- ♿ **Accesibilidad** (TalkBack)
- 🤖 Integración con **LLM**
- 📱 Compatibilidad con Android e iOS mediante Expo

---

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (versión LTS recomendada)
- npm o yarn
- 📱 **Expo Go** en tu dispositivo:
  - Android (Google Play)
  - iOS (App Store)
- (Opcional) Android Studio + SDK (para emulador)

---

## ⚙️ Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en tu entorno local.

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/xtron3r/AuraVision_2.0.git
cd AuraVision_2.0
```

### 2️⃣ Instalar dependencias

Con npm:

```bash
npm install
```

Con yarn:

```bash
yarn
```

### 3️⃣ Iniciar servidor de desarrollo

```bash
npx expo start
```

Esto abrirá el panel de Expo (Metro Bundler) con código QR para ejecutar la app en un dispositivo físico usando Expo Go.

---

## 📱 Ejecutar en dispositivo o emulador

### Android

```bash
npx expo start --android
```

### iOS (solo macOS o Expo Go)

```bash
npx expo start --ios
```

### Web (opcional)

```bash
npx expo start --web
```

---

## 🧪 Comandos útiles durante desarrollo

```bash
# Instalar una librería compatible con Expo
npx expo install nombre-paquete

# Limpiar cache de Metro en caso de errores
npx expo start -c
```

---

## 🗂️ Flujo de trabajo sugerido

1. Edita pantallas y rutas dentro de `app/`.
2. Usa Expo Router para navegación basada en archivos.
3. Prueba en Android/iOS con Expo Go y valida accesibilidad (TalkBack).
4. Mantén dependencias compatibles usando `expo install`.

---

## 📌 Estado del Proyecto

🚧 En desarrollo - Proyecto académico / Capstone.

---

## 📫 Contacto

Si deseas colaborar, reportar un bug o proponer mejoras para Auravision, puedes escribirme en:

- GitHub: [xtron3r](https://github.com/xtron3r)
- LinkedIn: [Aron Exequiel](https://www.linkedin.com/in/arone)

<p align="left">
	<a href="https://github.com/xtron3r">
		<img src="https://img.shields.io/badge/GitHub-Perfil-181717?logo=github&logoColor=white" alt="GitHub" />
	</a>
	<a href="https://www.linkedin.com/in/arone">
		<img src="https://img.shields.io/badge/LinkedIn-Perfil-0A66C2?logo=linkedin&logoColor=white" alt="LinkedIn" />
	</a>
</p>
