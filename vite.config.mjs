// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts-next'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    VueRouter({
      pagesDir: [],
    }),
    Layouts({
      layoutsDir: 'src/core/layouts',
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/core/styles/settings.scss',
      },
    }),
    Components({
      dirs: [
        'src/core/components',
        'src/modules',
      ],
      deep: true,
      dts: 'src/components.d.ts',
    }),
    Fonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        {
          'pinia': ['defineStore', 'storeToRefs'],
        },
      ],
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
  ],
  // Configuración de Vitest
  test: {
    globals: true, // Para usar describe, it, expect, vi, etc., sin importarlos explícitamente
    environment: 'jsdom', // Simula un entorno de navegador
    setupFiles: ['./tests/unit/setup.js'], // Ruta a tu archivo de configuración global de pruebas
    include: ['src/**/*.{test,spec}.{js,mjs,ts,mts}'], // Patrón para encontrar archivos de prueba
    // Si usas @vitest/ui, puedes configurar el puerto aquí también
    // ui: {
    //   port: 51204, // Puerto por defecto para la UI de Vitest
    // },
    // --- Sección de Configuración de Cobertura ---
    coverage: {
      // Habilitar la recolección de cobertura (o usa el flag --coverage en la CLI)
      enabled: true, // Ponlo en false si prefieres activarlo solo con el flag --coverage

      // Proveedor a usar ('v8' o 'istanbul')
      provider: 'v8',

      // Directorio donde se guardarán los reportes
      reportsDirectory: './coverage',

      // Formatos de reporte a generar
      reporter: ['text', 'html', 'json', 'lcov'], // 'text' para la consola, 'html' para un reporte navegable

      // Incluir todos los archivos que coincidan con 'include', incluso si no tienen pruebas
      // Esto da una imagen más real de la cobertura total.
      all: true,

      // Patrones glob para los archivos a incluir en el reporte de cobertura
      // ¡Importante! Deben ser tus archivos de código fuente, no los de prueba.
      include: [
        'src/core/services/**/*.{js,mjs,ts,mts}',
        'src/modules/**/*.{js,mjs,ts,mts,vue}',
        // No incluyas archivos de configuración, main.js, App.vue a menos que tengan lógica testable importante
      ],

      // Patrones glob para los archivos a excluir del reporte
      exclude: [
        'node_modules/',
        'src/core/plugins/', // Ejemplo: si no pruebas tus configuraciones de plugins
        'src/main.js',
        'src/App.vue',
        'src/router/index.js', // Si es el agregador y se prueba indirectamente
        'src/core/router/index.js', // Si es el agregador
        'src/core/store/index.js', // Si es solo la inicialización de Pinia
        'src/pages/', // Si solo son proxies como src/pages/index.vue
        '**/*.d.ts', // Archivos de definición de TypeScript
        '**/*{.,-}{spec,test}.{js,mjs,ts,mts}', // Excluir archivos de prueba
        'tests/', // Excluir la carpeta de setup de tests
        'src/vite-env.d.ts',
        'src/components.d.ts', // Auto-generado por unplugin-vue-components
        'typed-router.d.ts',   // Auto-generado por unplugin-vue-router
      ],

      // Opcional: Definir umbrales de cobertura. Si no se alcanzan, la prueba fallará.
      // thresholds: {
      //   lines: 80,
      //   functions: 80,
      //   branches: 80,
      //   statements: 80,
      // },

      // Limpiar los contadores de cobertura antes de cada ejecución
      clean: true,
      cleanOnRerun: true,
    },
    css: true, // Habilitar la cobertura de CSS
    moduleNameMapper: {
      // Mapea cualquier importación que termine en .css (o .scss, .sass, etc.)
      // a 'identity-obj-proxy'.
      // Esto hace que, por ejemplo, import styles from './styles.css'
      // devuelva algo como { miClase: 'miClase' } si usas CSS Modules,
      // o un objeto vacío si no, pero lo importante es que no da error.
      '^.+\\.(css|scss|sass|less|styl|stylus)$': 'identity-obj-proxy',
    },
    deps: {
      inline: ['vuetify'],
    }
  },
  optimizeDeps: {
    exclude: [
      'vuetify',
      'vue-router',
      'unplugin-vue-router/runtime',
      'unplugin-vue-router/data-loaders',
      'unplugin-vue-router/data-loaders/basic',
    ],
  },
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      sass: {
        api: 'modern-compiler',
      },
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})