# Posibles Mejoras Futuras

Esta aplicación sienta una base sólida para explorar el universo de Dragon Ball. A continuación, se listan algunas posibles mejoras y funcionalidades que podrían implementarse en futuras iteraciones:

## Funcionalidad Principal

1.  **Módulo de Transformaciones Completo:**
    * Implementar la funcionalidad para listar y ver detalles de las transformaciones de los personajes, similar a lo realizado para el módulo de "Personajes". Esto incluiría su propio store, servicio, páginas y pruebas.

2.  **Explorar Otros Endpoints de la API:**
    * Integrar otros datos disponibles en la API, como Planetas o Sagas, creando módulos dedicados para cada uno.

3.  **Búsqueda y Filtrado Avanzado:**
    * Implementar una funcionalidad de búsqueda en la lista de personajes (por nombre, raza, etc.).
    * Añadir opciones de filtrado (ej. por afiliación, por raza) para refinar los resultados de la lista.

4.  **Paginación Completa en el Listado:**
    * Añadir controles de interfaz de usuario (botones "Siguiente", "Anterior", números de página) en `CharactersListView.vue` para permitir al usuario navegar a través de todas las páginas de resultados que ofrece la API. Esto implicaría usar la información `meta` que podría devolver la API.

## Mejoras de UI/UX

1.  **Skeleton Loaders (Pantallas de Carga Esqueleto):**
    * Reemplazar los `v-progress-circular` genéricos con componentes "esqueleto" que imiten la estructura del contenido que se está cargando (ej. tarjetas esqueleto para la lista, un layout esqueleto para la vista de detalle). Esto mejora la percepción de carga.

2.  **Mensajes de Estado Vacío/Error más Específicos:**
    * Mejorar los mensajes cuando no se encuentran datos o cuando ocurren errores, proporcionando más contexto al usuario.

3.  **Optimización de Imágenes y Lazy Loading:**
    * Implementar "lazy loading" para las imágenes de los personajes en la lista para mejorar el rendimiento de carga inicial.
    * Considerar el uso de formatos de imagen más optimizados o tamaños responsivos.

4.  **Accesibilidad (a11y):**
    * Realizar una auditoría de accesibilidad completa y aplicar las mejoras necesarias para asegurar que la aplicación sea usable por el mayor número de personas posible (ej. atributos ARIA, contraste de colores, navegación por teclado).

5.  **Internacionalización (i18n):**
    * Añadir soporte para múltiples idiomas en la interfaz de usuario.

## Mejoras Técnicas y de Arquitectura

1.  **Migración a TypeScript:**
    * Convertir la base de código a TypeScript para añadir tipado estático, lo que puede mejorar la robustez, facilitar la refactorización y la detección temprana de errores a medida que la aplicación escala.

2.  **Manejo de Errores Más Granular en `apiClient`:**
    * Diferenciar entre tipos de errores HTTP (401, 403, 404, 500, etc.) en `apiClient.js` y `errorStore.js` para poder mostrar mensajes más específicos o incluso tomar acciones diferentes en la UI.
    * Implementar reintentos automáticos para ciertos errores de red en `apiClient.js`.

3.  **Solución de CORS para Producción:**
    * Si la aplicación se fuera a desplegar, el proxy de Vite (que es solo para desarrollo) no funcionaría. Se necesitaría un backend simple que actúe como proxy para las llamadas a la API de Dragon Ball.

4.  **Optimización del Estado en Vista de Detalle:**
    * Considerar si, para `CharacterDetailView`, se puede evitar una llamada a la API si los detalles completos del personaje ya se obtuvieron en la lista (actualmente, la lista y el detalle son llamadas separadas). Esto requeriría que el endpoint de lista devuelva todos los datos necesarios o una estrategia de caché más sofisticada.

5.  **CI/CD (Integración Continua / Despliegue Continuo):**
    * Configurar un pipeline de CI/CD (ej. con GitHub Actions) para automatizar las pruebas, el build y el despliegue de la aplicación.

## Mejoras en Pruebas

1.  **Aumentar Cobertura de Pruebas:**
    * Continuar mejorando la cobertura de los archivos existentes, especialmente las líneas y ramas no cubiertas en `apiClient.js`, `charactersStore.js`, y completar las pruebas para `CharacterDetailView.vue`.
    * Abordar las pruebas saltadas (skipped) y analizar si se pueden implementar de forma robusta.
    * **Prueba del Watcher en `CharacterDetailView`**: Implementar un mock de router más completo o una estrategia de prueba de integración para verificar de forma fiable el watcher que reacciona a los cambios en los parámetros de la ruta.

2.  **Pruebas End-to-End (E2E):**
    * Añadir pruebas E2E utilizando herramientas como Cypress o Playwright para verificar los flujos completos del usuario a través de la aplicación.

3.  **Pruebas de Componentes más Detalladas:**
    * Para los componentes Vue, en lugar de "stubbear" todos los componentes hijos de Vuetify, se podrían realizar pruebas de renderizado más completas con una instancia global de Vuetify configurada para el entorno de pruebas, si se desea verificar la integración visual más a fondo (aunque esto puede hacer las pruebas más lentas y frágiles).

Estas son solo algunas ideas, y la priorización dependería de los objetivos a largo plazo del proyecto.

---