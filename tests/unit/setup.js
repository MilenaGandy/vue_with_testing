// tests/unit/setup.js

import { vi, afterEach } from 'vitest';

// 1. Configurar Variables de Entorno para Pruebas
vi.stubEnv('VITE_API_BASE_URL', 'https://web.dragonball-api.com/api');

// 2. Extender `expect` con Matchers Adicionales (opcional, si lo necesitas)
// import '@testing-library/jest-dom/vitest';


// 3. Limpieza Global después de cada prueba
afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
  // Considera vi.restoreAllMocks(); si usas vi.spyOn con implementaciones originales
});

// Si necesitas limpieza global después de todas las pruebas en una suite/archivo:
// import { afterAll } from 'vitest';
// afterAll(() => {
//   vi.unstubAllEnvs();
// });