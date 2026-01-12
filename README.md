# 📱 Ionic To-Do App con Categorías y Firebase

Aplicación híbrida desarrollada con **Ionic + Angular** que permite gestionar tareas con categorías, filtros, y control de funcionalidades mediante **Firebase Remote Config**.

Esta aplicación fue desarrollada como prueba técnica para evaluar:
- Arquitectura
- Rendimiento
- Uso de Firebase
- Control de versiones
- Despliegue móvil (Android e iOS)

---

## 🚀 Funcionalidades

- Crear, editar y eliminar tareas
- Marcar tareas como completadas
- Organización automática (las completadas se mueven al final)
- Crear, editar y eliminar categorías
- Asignar categorías a tareas
- Filtrar tareas por categoría
- Feature flag con Firebase Remote Config (activar/desactivar categorías)
- Persistencia local optimizada
- Virtual scroll para grandes volúmenes de datos

---

## 🧩 Tecnologías

- Ionic 7
- Angular
- Firebase (Remote Config)
- RxJS
- Capacitor / Cordova
- Android Studio
- Xcode

---

## 🛠️ Instalación

```bash
git clone https://github.com/brandonvidal93/todoApp
cd todoApp
npm install
ionic serve
```

---

## 🔥 Configurar Firebase

1. Crear un proyecto en Firebase
2. Activar Remote Config
3. Crear el parámetro: ```enable_categories``` con valor ```true```.
4. Copiar las credenciales de Firebase a: ```src/environments/environment.ts```

Si está en false:

- No se muestra el selector de categorías
- No se muestran los filtros
- Las tareas siguen funcionando

Esto permite hacer rollouts y pruebas A/B sin publicar nueva versión.

--- 
## 📱 Ejecutar en Android

```bash
ionic build
ionic cap add android
ionic cap open android
```

Desde Android Studio:

- Run ▶

Para generar APK:

```bash
cd android
./gradlew assembleRelease

```

--- 

## 🍏 Ejecutar en iOS (Mac)
```bash
ionic build
ionic cap add ios
ionic cap open ios
```

Desde Xcode:

- Run ▶
- Product → Archive → Export IPA

---
## ⚡ Optimización de Rendimiento

Se aplicaron:
- cdk-virtual-scroll para listas grandes
- Observables con combineLatest
- Filtros reactivos sin recalcular toda la UI
- Sin subscripciones manuales
- Ordenamiento sin mutar arrays
- Persistencia optimizada

---
## 🧠 Arquitectura

- TaskService → CRUD + persistencia
- CategoryService → CRUD categorías
- FilterService → estado reactivo del filtro
- RemoteConfigService → feature flags
- Componentes desacoplados por responsabilidad
- Todo el estado fluye por Observables.

---

## 📸 Evidencias

En el repositorio se incluyen:
- Capturas de pantalla
- Video corto de funcionamiento del FireBase Remote Config
- APK y IPA exportados