// src/modules/characters/services/__tests__/charactersService.spec.js

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getCharacters, getCharacterById } from '../charactersService';
import { apiClient } from '@/core/services/apiClient';

vi.mock('@/core/services/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
  }
}));

describe('charactersService', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    vi.clearAllMocks();
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  // --- Pruebas para getCharacters ---
  describe('getCharacters', () => {
    it('should call apiClient.get with correct params and return character array on success', async () => {
      const mockCharactersArray = [{ id: "1", name: 'Goku' }];
      apiClient.get.mockResolvedValueOnce(mockCharactersArray);

      const result = await getCharacters(2, 10);

      expect(apiClient.get).toHaveBeenCalledTimes(1);
      expect(apiClient.get).toHaveBeenCalledWith('/characters', { page: 2, limit: 10 });
      expect(result).toEqual(mockCharactersArray);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should throw error and log if apiClient.get returns a non-array structure', async () => {
      const unexpectedResponse = { message: "Not an array" };
      apiClient.get.mockResolvedValueOnce(unexpectedResponse);
      const expectedErrorMsg = 'Respuesta de API inesperada al obtener personajes.';

      await expect(getCharacters()).rejects.toThrow(expectedErrorMsg);

      expect(apiClient.get).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[charactersService] Estructura de respuesta inesperada para getCharacters (se esperaba un array):',
        unexpectedResponse
      );
      // El error lanzado es capturado por el catch, que también loguea
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('[charactersService] Error al obtener la lista de personajes'),
        expectedErrorMsg
      );
    });

    it('should throw error and log if apiClient.get is rejected', async () => {
      const apiErrorMessage = 'Network Failure';
      apiClient.get.mockRejectedValueOnce(new Error(apiErrorMessage));
      
      await expect(getCharacters()).rejects.toThrow(apiErrorMessage);

      expect(apiClient.get).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('[charactersService] Error al obtener la lista de personajes'),
        apiErrorMessage
      );
    });
  });

  // --- Pruebas para getCharacterById ---
  describe('getCharacterById', () => {
    it('should throw error and log if no ID is provided', async () => {
      const expectedErrorMsg = "[charactersService] Se requiere un ID para obtener un personaje.";
      
      await expect(getCharacterById(null)).rejects.toThrow(expectedErrorMsg);
      
      expect(apiClient.get).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(expectedErrorMsg);
    });

    it('should call apiClient.get with correct ID and return character data on success', async () => {
      const characterId = "123";
      const mockCharacterData = { id: "123", name: 'Piccolo' };
      apiClient.get.mockResolvedValueOnce(mockCharacterData);

      const result = await getCharacterById(characterId);

      expect(apiClient.get).toHaveBeenCalledTimes(1);
      expect(apiClient.get).toHaveBeenCalledWith(`/characters/${characterId}`);
      expect(result).toEqual(mockCharacterData);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should throw error and log if apiClient.get is rejected for an ID', async () => {
      const characterId = "unknown";
      const apiErrorMessage = 'Character Not Found';
      apiClient.get.mockRejectedValueOnce(new Error(apiErrorMessage));

      await expect(getCharacterById(characterId)).rejects.toThrow(apiErrorMessage);

      expect(apiClient.get).toHaveBeenCalledTimes(1);
      expect(apiClient.get).toHaveBeenCalledWith(`/characters/${characterId}`);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(`[charactersService] Error al obtener el personaje con ID ${characterId}`),
        apiErrorMessage
      );
    });
  });
});