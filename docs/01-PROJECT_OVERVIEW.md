# Visión General y Características del Proyecto

## Descripción Detallada

Esta aplicación ha sido desarrollada como una prueba técnica para demostrar habilidades en la construcción de interfaces de usuario interactivas y bien estructuradas con Vue.js 3 y su ecosistema. El proyecto consume la API pública de Dragon Ball (`https://web.dragonball-api.com/api`) para mostrar información sobre los personajes del universo Dragon Ball.

Se ha puesto énfasis en una arquitectura modular, la separación de responsabilidades, la gestión de estado centralizada con Pinia, y la implementación de pruebas unitarias para asegurar la calidad y mantenibilidad del código. La interfaz de usuario se ha construido utilizando la librería de componentes Vuetify 3, siguiendo los principios de Material Design.

La aplicación presenta una página de inicio que sirve como portal a las diferentes secciones (actualmente, solo la sección de Personajes está implementada). Desde allí, el usuario puede navegar a una lista de personajes y, posteriormente, ver los detalles individuales de cada uno.

## Características Principales Implementadas

La funcionalidad desarrollada se centra en el módulo de "Personajes":

1.  **Página de Inicio (Home):**
    * Presenta una bienvenida y un menú de navegación simple que dirige a la sección de listado de personajes.

2.  **Listado de Personajes (`CharactersListView`):**
    * Consume el endpoint `/characters` de la API para obtener y mostrar una lista de personajes.
    * **Inyección de Datos "Fake"**: Para propósitos de demostración y para probar ciertos escenarios (como la paginación o la búsqueda de IDs no existentes en la API real), la lista de personajes obtenida de la API se complementa con 5 personajes "fake" generados localmente. Estos personajes tienen IDs en un rango >1000 para diferenciarlos de los IDs reales de la API (que son < 100).
    * Muestra indicadores de estado de carga mientras se obtienen los datos.
    * Cada personaje en la lista es clickeable y navega a su vista de detalle.

3.  **Vista de Detalle del Personaje (`CharacterDetailView`):**
    * Muestra información detallada de un personaje específico, obtenida del endpoint `/characters/:id` de la API.
    * El ID del personaje se obtiene de los parámetros de la ruta.
    * Muestra un estado de carga mientras se obtienen los detalles.
    * Si se intenta acceder al detalle de un personaje "fake" (cuyo ID no existe en la API real), la llamada a la API fallará (resultando en un error 404), y este error se gestionará y mostrará al usuario.
    * Permite al usuario regresar a la lista de personajes.

4.  **Gestión de Estado Centralizada (Pinia):**
    * Se utiliza un store de Pinia (`charactersStore.js`) para manejar el estado relacionado con los personajes (lista, detalle, estados de carga, errores locales).
    * Las acciones del store son responsables de interactuar con el `charactersService.js` para obtener los datos.

5.  **Manejo Global de Errores:**
    * Se ha implementado un store global de errores (`errorStore.js`) y un componente de diálogo (`AppErrorDialog.vue`).
    * Cuando ocurren errores durante las llamadas a la API (ej. un 404 al buscar un personaje "fake", o errores de red), estos son capturados y mostrados al usuario en una ventana de diálogo modal, proporcionando una experiencia de usuario consistente para los errores críticos.

6.  **Servicios y Abstracción de API:**
    * Se utiliza un `apiClient.js` genérico para manejar las configuraciones base de `Workspace` y el parseo de respuestas.
    * Un `charactersService.js` específico del módulo utiliza `apiClient` para realizar las llamadas a los endpoints de personajes.

7.  **Enrutamiento (Vue Router):**
    * Configuración de rutas para la navegación entre la página de inicio, la lista de personajes y la vista de detalle.

8.  **Pruebas Unitarias (Vitest):**
    * Se han implementado pruebas unitarias para los servicios (`apiClient.js`, `charactersService.js`), stores (`charactersStore.js`), y la configuración del router del módulo de personajes.
    * Se han creado pruebas de componentes para `CharactersListView.vue` y `CharacterDetailView.vue`, mockeando dependencias y verificando el renderizado y comportamiento básico.
    * Configuración para medir la cobertura de pruebas.

9.  **Manejo de CORS en Desarrollo:**
    * Se ha configurado un proxy en Vite (`vite.config.mjs`) para evitar problemas de CORS al realizar llamadas a la API externa desde el entorno de desarrollo local (`localhost`).

---