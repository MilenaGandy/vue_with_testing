# Prueba Técnica: Explorador de Personajes de Dragon Ball

Aplicación Vue.js 3 que permite a los usuarios explorar una lista de personajes del universo Dragon Ball y ver sus detalles, consumiendo la API pública `dragonball-api.com`.

## Tech Stack Principal

* **Frontend**: Vue.js 3 (Options API)
* **UI Framework**: Vuetify 3
* **Gestión de Estado**: Pinia
* **Routing**: Vue Router
* **Build Tool**: Vite
* **Testing**: Vitest, Vue Test Utils, `@pinia/testing`
* **API Externa**: [Dragon Ball API](https://web.dragonball-api.com/api-docs/)
* **Lenguaje**: JavaScript

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

* **Dragon Ball API Documentation**: [https://web.dragonball-api.com/api-docs/](https://web.dragonball-api.com/api-docs/)

---
