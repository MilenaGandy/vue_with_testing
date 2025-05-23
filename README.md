# Explorador de Personajes de Dragon Ball

Aplicación realizada en Vue.js 3 que permite a los usuarios explorar una lista de personajes del universo Dragon Ball y ver sus detalles a través del servicio [My JSON Server](https://my-json-server.typicode.com/) de [Typicode](https://github.com/typicode) (Fake Online REST server for teams), el cual, a su vez toma la data del archivo `db.json` ubicado en la raíz de este proyecto.

## Tech Stack Principal

* **Frontend**: Vue.js 3 (Options API)
* **UI Framework**: Vuetify 3
* **Gestión de Estados**: Pinia
* **Routing**: Vue Router
* **Build Tool**: Vite
* **Testing**: Vitest, Vue Test Utils, `@pinia/testing`
* **API Externa**: [Dragon Ball API with My JSON Server by Typicode](https://my-json-server.typicode.com/milenagandy/vue_with_testing/)
* **Lenguaje**: JavaScript
* **Node**: lts / jod -> v22.15.1

## Documentación Detallada

Para una comprensión completa del proyecto, por favor consulte los siguientes documentos:

* **1. Visión General y Características**: [docs/01-PROJECT_OVERVIEW.md](docs/01-PROJECT_OVERVIEW.md)
* **2. Guía de Configuración y Ejecución**: [docs/02-SETUP_AND_RUN.md](docs/02-SETUP_AND_RUN.md)
* **3. Estructura del Proyecto**: [docs/03-PROJECT_STRUCTURE.md](docs/03-PROJECT_STRUCTURE.md)
* **4. Diagrama de Componentes**: [docs/04-COMPONENT_DIAGRAM.md](docs/04-COMPONENT_DIAGRAM.md)
* **5. Decisiones Técnicas**: [docs/05-TECHNICAL_DECISIONS.md](docs/05-TECHNICAL_DECISIONS.md)
* **6. Mejoras Futuras**: [docs/06-FUTURE_IMPROVEMENTS.md](docs/06-FUTURE_IMPROVEMENTS.md)

## Comandos Rápidos

* **Instalar dependencias:**
    ```bash
    npm install
    ```
* **Ejecutar en modo desarrollo (usualmente en `http://localhost:3000`):**
    ```bash
    npm run dev
    ```
* **Ejecutar pruebas unitarias:**
    ```bash
    npm run test:unit
    ```
* **Ejecutar pruebas unitarias con reporte de cobertura:**
    ```bash
    npm run test:unit -- --coverage
    ```
    (El reporte HTML se encontrará en la carpeta `./coverage/`)

## API Externa Utilizada

* **API Externa**: [Dragon Ball API with My JSON Server by Typicode](https://my-json-server.typicode.com/milenagandy/vue_with_testing/)

Se usó el servicio [My JSON Server](https://my-json-server.typicode.com/) de [Typicode](https://github.com/typicode) (Fake Online REST server for teams), el cual, a su vez toma la data del archivo `db.json` ubicado en la raíz de este proyecto.

Los datos contenidos dentro del archivo `db.json` y las imágenes de los personajes fueron tomados parcialmente del proyecto [The Dragon Ball API](https://web.dragonball-api.com/).

Todos los personajes de Dragon Ball, así como sus imágenes y contenido relacionado, son de propiedad intelectual de sus respectivos creadores (Akira Toriyama y Toei Animation) y el uso de dicho contenido se presenta aquí sin fines comerciales. Todos los derechos de Dragon Ball pertenecen a sus respectivos propietarios.

---
