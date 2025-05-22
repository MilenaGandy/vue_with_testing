// src/modules/characters/store/__tests__/charactersStore.spec.js

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCharactersStore } from '../charactersStore'; // Tu store
import { getCharacters, getCharacterById } from '../../services/charactersService'; // El servicio a mockear

// Mockear el charactersService
vi.mock('../../services/charactersService', () => ({
  getCharacters: vi.fn(),
  getCharacterById: vi.fn(),
}));

describe('charactersStore', () => {
  let store;
  let consoleErrorSpy;

  beforeEach(() => {
    // Crea una nueva instancia de Pinia y la activa antes de cada prueba
    setActivePinia(createPinia());
    // Obtiene una instancia fresca del store para cada prueba
    store = useCharactersStore();
    // Limpia todos los mocks
    vi.clearAllMocks();
    // Espiamos console.error para verificar que se llama y para suprimir su salida en tests de error
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });


  it('should have correct initial state', () => {
    expect(store.characters).toEqual([]);
    expect(store.character).toBeNull();
    expect(store.isLoadingList).toBe(false);
    expect(store.isLoadingDetail).toBe(false);
    expect(store.errorList).toBeNull();
    expect(store.errorDetail).toBeNull();
  });

  describe('getters', () => {
    it('getListedCharacterById should return a character if found', () => {
      store.characters = [{ id: 1, name: 'Goku' }, { id: 2, name: 'Vegeta' }];
      expect(store.getListedCharacterById(1)).toEqual({ id: 1, name: 'Goku' });
      expect(store.getListedCharacterById(3)).toBeUndefined();
    });

    it('hasCharacters should return true if characters array is not empty', () => {
      expect(store.hasCharacters).toBe(false);
      store.characters = [{ id: 1, name: 'Goku' }];
      expect(store.hasCharacters).toBe(true);
    });
  });

  describe('actions', () => {
    describe('fetchCharacters', () => {
      it('should fetch characters, update state on success, and set loading states', async () => {
        const mockCharactersData = [{ id: 1, name: 'Goku' }];
        getCharacters.mockResolvedValueOnce(mockCharactersData);

        const promise = store.fetchCharacters();

        expect(store.isLoadingList).toBe(true);
        await promise;

        expect(getCharacters).toHaveBeenCalledTimes(1);
        expect(getCharacters).toHaveBeenCalledWith(1, 20); // Default params
        expect(store.characters).toEqual(mockCharactersData);
        expect(store.errorList).toBeNull();
        expect(store.isLoadingList).toBe(false);
      });

      it('should handle error and update state on fetchCharacters failure', async () => {
        const errorMessage = 'Network Error Fetching List';
        getCharacters.mockRejectedValueOnce(new Error(errorMessage));

        await store.fetchCharacters();

        expect(getCharacters).toHaveBeenCalledTimes(1);
        expect(store.characters).toEqual([]);
        expect(store.errorList).toBe(errorMessage);
        expect(store.isLoadingList).toBe(false);
      });
    });

    describe('fetchCharacterById', () => {
      it('should fetch a character by ID, update state on success, and set loading states', async () => {
        const characterId = 1;
        const mockCharacterData = { id: 1, name: 'Goku' };
        getCharacterById.mockResolvedValueOnce(mockCharacterData);

        const promise = store.fetchCharacterById(characterId);
        
        expect(store.isLoadingDetail).toBe(true);
        expect(store.character).toBeNull(); // ensure it's cleared initially
        await promise;

        expect(getCharacterById).toHaveBeenCalledTimes(1);
        expect(getCharacterById).toHaveBeenCalledWith(characterId);
        expect(store.character).toEqual(mockCharacterData);
        expect(store.errorDetail).toBeNull();
        expect(store.isLoadingDetail).toBe(false);
      });

      it('should handle error and update state on fetchCharacterById failure', async () => {
        const characterId = 2;
        const errorMessage = 'Character Not Found';
        getCharacterById.mockRejectedValueOnce(new Error(errorMessage));

        await store.fetchCharacterById(characterId);

        expect(getCharacterById).toHaveBeenCalledTimes(1);
        expect(store.character).toBeNull();
        expect(store.errorDetail).toBe(errorMessage);
        expect(store.isLoadingDetail).toBe(false);
      });
    });

    describe('clearCharacterDetail', () => {
      it('should reset character detail, errorDetail, and isLoadingDetail', () => {
        store.character = { id: 1, name: 'Goku' };
        store.errorDetail = 'Some error';
        store.isLoadingDetail = true;

        store.clearCharacterDetail();

        expect(store.character).toBeNull();
        expect(store.errorDetail).toBeNull();
        expect(store.isLoadingDetail).toBe(false);
      });
    });
  });
});