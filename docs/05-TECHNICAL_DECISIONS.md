# Decisiones Técnicas

Este documento detalla las decisiones técnicas clave tomadas durante el desarrollo de la aplicación "Explorador de Personajes de Dragon Ball".

## 1. Framework Principal: Vue.js 3 (Options API)

* **Decisión**: Se utilizó Vue.js 3 como el framework frontend principal, empleando la Options API para la estructura de los componentes.
* **Razón**:
    * **Reactividad y Componentización**: Vue.js ofrece un sistema de reactividad robusto y un modelo de componentes que facilita la construcción de interfaces de usuario interactivas y modulares.
    * **Curva de Aprendizaje y Ecosistema**: Vue.js es conocido por su curva de aprendizaje amigable y cuenta con un ecosistema maduro (Vue Router, Pinia).
    * **Options API**: Se optó por la Options API por preferencia y por la claridad que ofrece en la organización de la lógica, estado y métodos del componente para este proyecto.

## 2. Librería de UI: Vuetify 3

* **Decisión**: Se integró Vuetify 3 para los componentes de la interfaz de usuario.
* **Razón**:
    * **Material Design**: Proporciona un conjunto extenso de componentes pre-diseñados que siguen las directrices de Material Design, acelerando el desarrollo de una UI atractiva y consistente.
    * **Productividad**: Reduce la necesidad de escribir CSS personalizado para muchos elementos comunes de la interfaz.
    * **Responsividad**: Los componentes de Vuetify están diseñados para ser responsivos.

## 3. Gestión de Estado: Pinia

* **Decisión**: Se eligió Pinia para la gestión del estado global y por módulo.
* **Razón**:
    * **Store Oficial para Vue 3**: Es la solución de gestión de estado recomendada oficialmente para Vue 3.
    * **Simplicidad y Modularidad**: Pinia es ligero, fácil de entender y promueve la creación de stores modulares (ej. `charactersStore.js`, `errorStore.js`), lo que encaja bien con la arquitectura general del proyecto.
    * **Devtools**: Excelente integración con las Vue Devtools para depuración.

## 4. Estructura del Proyecto: Modular (`core` y `modules`)

* **Decisión**: Se implementó una estructura de directorios que separa un módulo `core` (para lógica y componentes transversales) de los módulos de características (ej. `modules/characters/`).
* **Razón**:
    * **Escalabilidad y Mantenibilidad**: Facilita el crecimiento ordenado de la aplicación. Nuevas funcionalidades se pueden añadir como módulos independientes.
    * **Separación de Responsabilidades (SoC)**: Clara distinción entre la lógica compartida y la lógica específica de cada característica.
    * **Cohesión y Bajo Acoplamiento**: Agrupa el código relacionado (alta cohesión dentro de los módulos) y reduce las dependencias entre diferentes características (bajo acoplamiento).

## 5. Abstracción de API: `apiClient.js` y Capa de Servicios

* **Decisión**:
    * Se creó un `apiClient.js` genérico en `src/core/services/` para manejar las llamadas HTTP base (usando `Workspace`).
    * Se crearon servicios específicos por módulo (ej. `charactersService.js` en `src/modules/characters/services/`) que utilizan el `apiClient`.
* **Razón**:
    * **DRY (Don't Repeat Yourself)**: `apiClient.js` centraliza la configuración de la URL base (desde variables de entorno), cabeceras por defecto, y el manejo básico de respuestas/errores HTTP.
    * **Abstracción**: Los servicios de módulo (como `charactersService.js`) se enfocan en los endpoints específicos de su dominio y la transformación de datos si es necesario, sin preocuparse por los detalles de la implementación de `Workspace`.
    * **Mantenibilidad y Testabilidad**: Cambiar la librería HTTP (ej. de `Workspace` a `axios`) solo requeriría modificar `apiClient.js`. Los servicios son más fáciles de probar mockeando `apiClient`.

## 6. Lógica de API en Stores (Pinia Actions)

* **Decisión**: Las acciones de los stores de Pinia (ej. `WorkspaceCharacters` en `charactersStore.js`) son responsables de orquestar las llamadas a los servicios y actualizar el estado.
* **Razón**:
    * **Centralización de Lógica de Negocio**: Mantiene la lógica de obtención y transformación de datos y la gestión de estados de carga/error en un solo lugar (el store).
    * **Componentes "Presentacionales"**: Los componentes Vue se vuelven más simples, enfocándose en mostrar datos y emitir eventos/llamar acciones, en lugar de manejar directamente la lógica de fetching.

## 7. Manejo de Errores: Global (`errorStore.js` y `AppErrorDialog.vue`)

* **Decisión**: Implementar un store global (`errorStore.js`) y un componente de diálogo (`AppErrorDialog.vue`) para mostrar errores críticos de la aplicación (especialmente fallos de API) de manera consistente.
* **Razón**:
    * **Experiencia de Usuario (UX) Consistente**: Los errores importantes se notifican al usuario de una forma unificada.
    * **Desacoplamiento**: Los stores de características (como `charactersStore`) simplemente notifican al `errorStore` cuando ocurre un error relevante, sin preocuparse por cómo se muestra ese error.

## 8. Inyección de Datos "Fake" en `charactersStore.js`

* **Decisión**: La acción `WorkspaceCharacters` en `charactersStore.js` añade 6 personajes "fake" a los datos recibidos de la API.
* **Razón**:
    * **Pruebas de UI**: Permite probar la interfaz de usuario con una cantidad mayor y más variada de datos.
    * **Escenarios de Prueba**: Facilita la prueba de escenarios donde se intenta acceder a detalles de un personaje "fake" (cuyo ID no existe en la API real), permitiendo verificar el flujo de manejo de errores (ej. 404 de la API).

## 9. Estrategia de Pruebas: Vitest

* **Decisión**: Se utilizó Vitest como corredor de pruebas.
* **Razón**:
    * **Integración con Vite**: Rendimiento rápido y configuración sencilla al estar construido sobre Vite.
    * **API Familiar**: Sintaxis similar a Jest, lo que facilita su adopción.
    * **Mocking y Spying**: Buenas capacidades para simular módulos (`vi.mock`) y espiar funciones (`vi.spyOn`).
    * **Cobertura**: Integración con `v8` (o `istanbul`) para reportes de cobertura.
* **Enfoque**:
    * **Pruebas Unitarias**: Para servicios y stores, mockeando sus dependencias externas.
    * **Pruebas de Componentes**: Para componentes Vue, usando `@vue/test-utils` y `@pinia/testing`, y "stubbeando" (simulando superficialmente) componentes hijos de UI (como los de Vuetify) para mantener las pruebas enfocadas y rápidas.

## 10. Manejo de CORS en Desarrollo (Proxy de Vite)

* **Decisión**: Configurar un proxy en `vite.config.mjs` para las llamadas a la API de Dragon Ball.
* **Razón**: La API externa no tiene cabeceras CORS que permitan el acceso directo desde `localhost:3000`. El proxy de Vite redirige las solicitudes desde el frontend (ej. `/api-db/*`) al servidor de Vite, el cual luego hace la llamada real a la API externa. Como las llamadas de servidor a servidor no están sujetas a las mismas restricciones CORS del navegador, esto soluciona el problema para el entorno de desarrollo local.

## 11. Enrutamiento (Definiciones Manuales de Rutas por Módulo)

* **Decisión**: Aunque se exploró brevemente el enrutamiento basado en sistema de archivos, se optó por definir las rutas manualmente dentro de cada módulo de característica (`src/modules/characters/router/index.js`) y luego agregarlas en un router principal (`src/core/router/index.js`).
* **Razón**: Proporciona un control más explícito sobre las definiciones de ruta, nombres, y metadatos, lo cual puede ser beneficioso para la claridad y el manejo de configuraciones de ruta más complejas a medida que la aplicación crece, y encaja bien con la filosofía de encapsulamiento de los módulos de características.

---