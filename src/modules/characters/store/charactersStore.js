// src/modules/characters/store/charactersStore.js
import { defineStore } from 'pinia';
import { getCharacters, getCharacterById } from '../services/charactersService';
import { useErrorStore } from '@/core/store/errorStore';

// --- Funciones de Ayuda para Datos Fake (sin cambios respecto a la última versión) ---
function generateRandomAlphanumeric(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
  let result = '';
  if (length === 0) return 'Data';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result.trim() || 'FakeData';
}

function createFakeCharacter(id, genericImagePath) {
  const randomLength = (multiplier = 1) => Math.max(5, Math.floor(Math.random() * (15 * multiplier)) + (5 * multiplier));
  const races = ['Saiyan', 'Human', 'Namekian', 'Frieza Race', 'Android', 'Majin', 'Unknown'];
  const affiliations = ['Z Fighter', 'Army of Frieza', 'Freelancer', 'Earthling', 'Capsule Corp'];

  return {
    id: String(id),
    name: `Fake Character ${id}`,
    ki: String(Math.floor(Math.random() * 100000) + 1000),
    maxKi: String(Math.floor(Math.random() * 100000000) + 100000),
    race: races[Math.floor(Math.random() * races.length)],
    gender: Math.random() > 0.4 ? 'Male' : 'Female',
    description: `Descripción fake para el personaje ${id}: ${generateRandomAlphanumeric(randomLength(5))}. ${generateRandomAlphanumeric(randomLength(4))}.`,
    image: genericImagePath,
    affiliation: affiliations[Math.floor(Math.random() * affiliations.length)],
    deletedAt: null,
  };
}
// --- Fin Funciones de Ayuda ---

export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: [],
    character: null,
    isLoadingList: false,
    isLoadingDetail: false,
    errorList: null,
    errorDetail: null,
  }),

  getters: {
    getListedCharacterById: (state) => (id) => {
      const idAsString = String(id);
      return state.characters.find(char => String(char.id) === idAsString);
    },
    hasCharacters: (state) => Array.isArray(state.characters) && state.characters.length > 0,
  },

  actions: {
    async fetchCharacters(page = 1, limit = 20) {
      const errorStore = useErrorStore();
      this.isLoadingList = true;
      this.errorList = null;
      const genericImagePath = '/img/placeholder-character.webp'; // Ajusta esta ruta

      try {
        const realItemsFromService = await getCharacters(page, limit);
        
        // CORRECCIÓN IMPORTANTE: Lanzar error si la respuesta del servicio no es un array
        if (!Array.isArray(realItemsFromService)) {
          console.warn('[charactersStore] fetchCharacters recibió datos inesperados del servicio (esperaba array):', realItemsFromService);
          // Esto forzará la ejecución del bloque catch
          throw new Error('Formato de datos de personajes inesperado por el servicio.');
        }
        
        // Si es un array (puede ser vacío), procede normalmente.
        const processedRealItems = realItemsFromService;

        const fakeCharacters = [];
        // ASEGÚRATE QUE ESTE BUCLE Y createFakeCharacter FUNCIONEN BIEN PARA GENERAR 10 ITEMS
        for (let i = 0; i < 6; i++) {
          const fakeChar = createFakeCharacter(1001 + i, genericImagePath);
          // Podrías añadir un log aquí si sigues teniendo problemas con la cantidad de fakes:
          // console.log(`Generado fake ${i}: ID ${fakeChar.id}`);
          fakeCharacters.push(fakeChar);
        }
        // Descomenta este log si el número de fakes sigue siendo incorrecto en las pruebas:
        // console.log('[charactersStore] Número REAL de fakes generados:', fakeCharacters.length);

        this.characters = [...processedRealItems, ...fakeCharacters];

      } catch (error) {
        const errorMessage = error.message || 'Error al cargar la lista de personajes.';
        this.errorList = errorMessage;
        this.characters = []; // ESTO ES CLAVE: se limpia la lista en CUALQUIER error del try
        errorStore.showError(errorMessage, 'Error al Cargar Personajes');
      } finally {
        this.isLoadingList = false;
      }
    },

    async fetchCharacterById(id) {
      const errorStore = useErrorStore();
      this.isLoadingDetail = true;
      this.errorDetail = null;
      this.character = null;

      try {
        const data = await getCharacterById(id);
        this.character = data;
      } catch (error) {
        const errorMessage = error.message || `Error al cargar el personaje con ID ${id}.`;
        this.errorDetail = errorMessage;
        errorStore.showError(errorMessage, `Error Personaje ID: ${id}`);
      } finally {
        this.isLoadingDetail = false;
      }
    },

    clearCharacterDetail() {
      this.character = null;
      this.errorDetail = null;
      this.isLoadingDetail = false;
    },
  },
});