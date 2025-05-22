// src/modules/characters/services/__tests__/charactersService.spec.js

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getCharacters, getCharacterById } from '../charactersService'; // Las funciones a probar

// ¡IMPORTANTE! Importa apiClient aquí para que puedas manipular el mock en tus pruebas
import { apiClient } from '@/core/services/apiClient';

// Mockea el módulo apiClient. Esta llamada es "hoisted" (elevada) por Vitest,
// por lo que se aplica ANTES de que la importación de arriba ocurra,
// asegurando que el 'apiClient' importado ya sea la versión mockeada.
vi.mock('@/core/services/apiClient', () => ({
  apiClient: {
    get: vi.fn(), // Mockeamos el método 'get' que usa charactersService
    // post: vi.fn(), // Añadir otros métodos si charactersService los usara
    // put: vi.fn(),
    // delete: vi.fn(),
  }
}));

describe('charactersService', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    vi.clearAllMocks(); // Limpia todos los mocks, incluyendo apiClient.get
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  // Tus bloques describe('getCharacters', ...) e it(...) van aquí.
  // Dentro de ellos, ahora puedes usar apiClient.get.mockResolvedValueOnce(...)
  // porque 'apiClient' está definido y es el objeto mockeado.

  // Ejemplo de cómo se usaría dentro de un 'it':
  describe('getCharacters', () => {
    it('should call apiClient.get and return "items" from the response on success', async () => {
      const mockCharacterArray = [{ id: 1, name: 'Goku' }];
      // ... (resto de tu mock de respuesta completa si es necesario) ...
      // Ahora 'apiClient' se refiere al objeto mockeado con el método 'get' mockeado
      apiClient.get.mockResolvedValueOnce(mockCharacterArray); // O la estructura completa que devuelve la API

      const result = await getCharacters();

      expect(apiClient.get).toHaveBeenCalledTimes(1);
      expect(apiClient.get).toHaveBeenCalledWith('/characters', { page: 1, limit: 20 });
      expect(result).toEqual(mockCharacterArray); // Ajusta esto según lo que devuelva getCharacters
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    // ... resto de tus pruebas para charactersService ...
  });
});