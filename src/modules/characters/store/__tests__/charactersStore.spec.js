// src/modules/characters/store/__tests__/charactersStore.spec.js

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCharactersStore } from '../charactersStore';
import { getCharacters, getCharacterById } from '../../services/charactersService';

// Mockear el charactersService
vi.mock('../../services/charactersService', () => ({
  getCharacters: vi.fn(),
  getCharacterById: vi.fn(),
}));

// Mockear el errorStore y espiar su acción showError
const mockShowErrorFromErrorStore = vi.fn();
vi.mock('@/core/store/errorStore', () => ({
  useErrorStore: () => ({
    showError: mockShowErrorFromErrorStore,
    // clearError: vi.fn(), // Mockea otras acciones/getters si charactersStore los usa
  }),
}));

describe('charactersStore', () => {
  let store;
  let consoleErrorSpy;
  let consoleWarnSpy;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useCharactersStore();
    vi.clearAllMocks(); // Limpia todos los mocks
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
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
    it('getListedCharacterById should return a character if found (comparing as strings)', () => {
      store.characters = [{ id: "1", name: 'Goku' }, { id: "2", name: 'Vegeta' }];
      expect(store.getListedCharacterById("1")).toEqual({ id: "1", name: 'Goku' });
      expect(store.getListedCharacterById("3")).toBeUndefined();
      expect(store.getListedCharacterById(2)).toEqual({ id: "2", name: 'Vegeta' }); // Test con número, el getter lo convierte
    });

    it('hasCharacters should return true if characters array is not empty', () => {
      expect(store.hasCharacters).toBe(false);
      store.characters = [{ id: "1", name: 'Goku' }];
      expect(store.hasCharacters).toBe(true);
    });
  });

  describe('actions', () => {
    describe('fetchCharacters', () => {
      it('should fetch characters, add 10 fakes, and update state on success', async () => {
        const mockRealCharacters = [{ id: "1", name: 'Goku', image: 'goku.webp', race: 'Saiyan', ki: '1000' }];
        getCharacters.mockResolvedValueOnce(mockRealCharacters);

        await store.fetchCharacters(1, 20); // Los parámetros page/limit son para el servicio

        expect(getCharacters).toHaveBeenCalledWith(1, 20);
        
       
        expect(store.characters.length).toBe(mockRealCharacters.length + 10);
        expect(store.characters[0]).toEqual(mockRealCharacters[0]); // El primer item es el real
        
        
        const firstFake = store.characters[mockRealCharacters.length];
        expect(firstFake.id).toBe("1001"); // Asumiendo que los IDs fake empiezan en "1001"
        expect(firstFake.name).toContain('Fake Character 1001');
        expect(firstFake.image).toBe('/user.png'); // O tu path de imagen genérica

        expect(store.errorList).toBeNull();
        expect(store.isLoadingList).toBe(false);
        expect(mockShowErrorFromErrorStore).not.toHaveBeenCalled();
      });

      it('should handle service error, update state, and call errorStore.showError', async () => {
        const errorMessage = 'Network Error Fetching List';
        getCharacters.mockRejectedValueOnce(new Error(errorMessage));

        await store.fetchCharacters();

        expect(store.characters).toEqual([]);
        expect(store.errorList).toBe(errorMessage);
        expect(store.isLoadingList).toBe(false);
        expect(mockShowErrorFromErrorStore).toHaveBeenCalledTimes(1);
        expect(mockShowErrorFromErrorStore).toHaveBeenCalledWith(errorMessage, 'Error al Cargar Personajes');
      });

      it('should handle unexpected (non-array) service response, set error, and call errorStore.showError', async () => {
        const unexpectedResponse = { message: "Esto no es un array de personajes" };
        getCharacters.mockResolvedValueOnce(unexpectedResponse);

        await store.fetchCharacters();
        
        expect(store.characters).toEqual([]); // Porque el store debe ponerlo a [] en el catch
        
        const expectedThrownErrorMessage = 'Formato de datos de personajes inesperado por el servicio.';
        expect(store.errorList).toBe(expectedThrownErrorMessage); // El error que se lanzó y se capturó
        
        expect(consoleWarnSpy).toHaveBeenCalledWith(
            '[charactersStore] fetchCharacters recibió datos inesperados del servicio (esperaba array):',
            unexpectedResponse
        );
        expect(mockShowErrorFromErrorStore).toHaveBeenCalledTimes(1);
        // El catch block en el store usará el mensaje del error que se lanzó (expectedThrownErrorMessage)
        expect(mockShowErrorFromErrorStore).toHaveBeenCalledWith(expectedThrownErrorMessage, 'Error al Cargar Personajes');
        expect(store.isLoadingList).toBe(false);
      });
    });

    describe('fetchCharacterById', () => {
      it('should fetch a character by ID, update state on success, and set loading states', async () => {
        const characterId = "1";
        const mockCharacterData = { id: "1", name: 'Goku' };
        getCharacterById.mockResolvedValueOnce(mockCharacterData);

        await store.fetchCharacterById(characterId);
        
        expect(getCharacterById).toHaveBeenCalledWith(characterId);
        expect(store.character).toEqual(mockCharacterData);
        expect(store.errorDetail).toBeNull();
        expect(store.isLoadingDetail).toBe(false);
        expect(mockShowErrorFromErrorStore).not.toHaveBeenCalled();
      });

      it('should handle error, update state, and call errorStore.showError on fetchCharacterById failure', async () => {
        const characterId = "2";
        const errorMessage = 'Character Not Found';
        getCharacterById.mockRejectedValueOnce(new Error(errorMessage));

        await store.fetchCharacterById(characterId);

        expect(store.character).toBeNull();
        expect(store.errorDetail).toBe(errorMessage);
        expect(store.isLoadingDetail).toBe(false);
        expect(mockShowErrorFromErrorStore).toHaveBeenCalledTimes(1);
        expect(mockShowErrorFromErrorStore).toHaveBeenCalledWith(errorMessage, `Error Personaje ID: ${characterId}`);
      });
    });

    describe('clearCharacterDetail', () => {
      it('should reset character detail, errorDetail, and isLoadingDetail', () => {
        store.character = { id: "1", name: 'Goku' };
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