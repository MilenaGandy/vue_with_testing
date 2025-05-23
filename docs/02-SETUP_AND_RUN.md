# Guía de Configuración y Ejecución

Esta guía describe los pasos necesarios para configurar y ejecutar la aplicación "Explorador de Personajes de Dragon Ball" en un entorno de desarrollo local.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

* **Node.js**: Se recomienda la versión LTS (actualmente v20.x o superior, aunque podría funcionar con v18+). Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
* **npm**: Usualmente viene incluido con Node.js. Puedes verificar tu versión con `npm -v`.
* **Git**: Necesario para clonar el repositorio. Puedes descargarlo desde [git-scm.com](https://git-scm.com/).

## Configuración e Instalación

Sigue estos pasos para poner en marcha el proyecto:

1.  **Clonar el Repositorio desde GitHub:**
    El código fuente está alojado en un repositorio de GitHub. Puede clonarlo usando HTTPS o SSH.

    * **Usando HTTPS:**
        ```bash
        git clone https://github.com/MilenaGandy/vue_with_testing.git
        ```
    * **Usando SSH (requiere tener configurada una clave SSH con tu cuenta de GitHub):**
        ```bash
        git clone git@github.com:MilenaGandy/vue_with_testing.git
        ```
    Después de clonar, navega a la carpeta del proyecto:
    ```bash
    cd vue_with_testing
    ```
    

2.  **Instalar Dependencias:**
    Una vez dentro de la carpeta raíz del proyecto, instala todas las dependencias necesarias usando npm:
    ```bash
    npm install
    ```
    Este comando leerá el archivo `package.json` y descargará todos los paquetes listados en `dependencies` y `devDependencies`.

3.  **Configurar Variables de Entorno:**
    La aplicación necesita una variable de entorno para definir la URL base de la API que consume.
    * Crea un archivo llamado `.env` en la raíz del proyecto (al mismo nivel que `package.json`).
    * Añade la siguiente variable a tu archivo `.env`:

        ```env
        VITE_API_BASE_URL=https://my-json-server.typicode.com/milenagandy/vue_with_testing
        ```
        

    * Puedes encontrar un ejemplo de las variables necesarias en el archivo `.env.example` (si se proporciona uno en el proyecto).

## Ejecutar la Aplicación en Modo Desarrollo

Una vez que las dependencias estén instaladas y las variables de entorno configuradas:

1.  Ejecuta el siguiente comando para iniciar el servidor de desarrollo de Vite:
    ```bash
    npm run dev
    ```
2.  El servidor de desarrollo se iniciará y la aplicación estará usualmente accesible en:
    `http://localhost:3000` (o el puerto que se indique en la consola si el 3000 está ocupado).
3.  Abre esta URL en tu navegador web para ver la aplicación en funcionamiento. El servidor se recargará automáticamente (Hot Module Replacement - HMR) cuando realices cambios en el código fuente.

## Ejecutar Pruebas Unitarias

El proyecto utiliza Vitest para las pruebas unitarias.

1.  **Ejecutar todas las pruebas una vez:**
    ```bash
    npm run test:unit
    ```
    Esto ejecutará todas las suites de pruebas y mostrará los resultados en la consola.

2.  **Ejecutar pruebas con reporte de cobertura:**
    Para generar un reporte de cobertura que muestre qué partes de tu código están cubiertas por las pruebas:
    ```bash
    npm run test:unit -- --coverage
    ```
    * Después de la ejecución, se generará una carpeta `coverage/` en la raíz del proyecto.
    * Puedes abrir el archivo `coverage/index.html` en un navegador para ver un reporte detallado e interactivo de la cobertura.
    * **Nota:** El primer `--` en el comando es necesario para que `npm` pase el flag `--coverage` correctamente al script de `vitest`.

## (Opcional) Build para Producción

Si necesitaras generar una versión optimizada de la aplicación para despliegue:

1.  Ejecuta el comando de build:
    ```bash
    npm run build
    ```
2.  Esto creará una carpeta `dist/` en la raíz del proyecto con los archivos estáticos listos para ser desplegados en un servidor web.

---