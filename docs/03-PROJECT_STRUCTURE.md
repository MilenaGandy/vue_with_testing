# Estructura del Proyecto

La estructura de directorios de este proyecto ha sido diseñada para promover la modularidad, escalabilidad y mantenibilidad, incluso para una aplicación de tamaño moderado. Se sigue un enfoque híbrido, combinando una organización por tipo para elementos centrales (`core`) y una organización por característica (`modules`) para las funcionalidades principales de la aplicación.

## Directorios Principales en la Raíz del Proyecto

* **`/` (Raíz del Proyecto):**
    * `vite.config.mjs`: Configuración de Vite (servidor de desarrollo, build, Vitest).
    * `package.json`: Define los scripts del proyecto, dependencias y devDependencies.
    * `README.md`: Documentación principal y punto de entrada.
    * `.env` / `.env.example`: Archivos para variables de entorno.
    * `public/`: Contiene activos estáticos que se sirven directamente sin procesar por Vite (ej. `favicon.ico`).
    * `src/`: Contiene todo el código fuente de la aplicación Vue.
    * `tests/`: Configuración global para pruebas y tipos de pruebas que no se co-localizan (ej. E2E, o el `setup.js` para unitarias).
    * `docs/`: Esta carpeta, conteniendo toda la documentación detallada del proyecto.


## Estructura Detallada de `src/`

La carpeta `src/` es donde reside la lógica principal de la aplicación:

```plaintext
src/
├── App.vue
├── main.js
│
├── core/
│   ├── assets/
│   ├── components/
│   │   └── AppErrorDialog.vue
│   ├── layouts/
│   │   └── default.vue
│   ├── pages/
│   │   └── HomeView.vue
│   ├── plugins/
│   │   └── vuetify.js
│   │   └── index.js
│   ├── router/
│   │   └── index.js
│   ├── services/
│   │   └── apiClient.js
│   ├── store/
│   │   └── errorStore.js
│   └── styles/
│       └── styles.css
│       └── settings.scss
│
└── modules/
    └── characters/
        ├── __tests__/
        │   ├── pages/
        │   │   └── CharactersListView.spec.js
        │   │   └── CharacterDetailView.spec.js
        │   ├── services/
        │   │   └── charactersService.spec.js
        │   ├── store/
        │   │   └── charactersStore.spec.js
        │   └── router/
        │       └── index.spec.js
        ├── components/     # (Vacío por ahora)
        ├── pages/
        │   └── CharactersListView.vue
        │   └── CharacterDetailView.vue
        ├── router/
        │   └── index.js
        ├── services/
        │   └── charactersService.js
        └── store/
            └── charactersStore.js
```





**Justificación de la Estructura:**

* **Modularidad (`src/modules/`)**: Cada característica principal de la aplicación (como "Personajes") se encapsula en su propio directorio dentro de `modules/`. Esto incluye sus propias páginas, componentes específicos, servicios, stores y rutas. Facilita el desarrollo aislado de características y su mantenimiento.
* **Transversalidad (`src/core/`)**: Los elementos que son compartidos y utilizados por múltiples módulos o por la aplicación en general (como el cliente API, layouts, el store de errores, plugins) se centralizan en `core/`. Esto promueve la reutilización (DRY) y la consistencia.
* **Escalabilidad**: Esta organización permite que la aplicación crezca de manera ordenada. Añadir una nueva funcionalidad implicaría principalmente crear un nuevo directorio de módulo en `src/modules/` sin afectar significativamente los existentes.
* **Co-localización de Pruebas**: Las pruebas unitarias y de componentes específicas de un módulo se encuentran dentro de la carpeta `__tests__/` de ese mismo módulo, cerca del código que prueban, facilitando su mantenimiento.
* **Separación de Responsabilidades**: Se mantiene una clara distinción entre la lógica de presentación (componentes, páginas), la lógica de negocio/estado (stores Pinia), y la lógica de acceso a datos (servicios).

Esta estructura busca un equilibrio entre una organización clara y la flexibilidad para el crecimiento futuro del proyecto.
