// src/modules/characters/store/charactersStore.js
import { defineStore } from 'pinia';
import { getCharacters, getCharacterById } from '../services/charactersService';

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
      const numericId = Number(id); // Asegura comparación numérica si los IDs son números
      return state.characters.find(char => char.id === numericId);
    },
    hasCharacters: (state) => Array.isArray(state.characters) && state.characters.length > 0,
  },

  actions: {
    async fetchCharacters(page = 1, limit = 20) {
      this.isLoadingList = true;
      this.errorList = null;
      try {
        // Se asume que charactersService.getCharacters devuelve el array de personajes directamente
        const items = await getCharacters(page, limit);
        // Asegurarse de que this.characters siempre sea un array
        this.characters = Array.isArray(items) ? items : [];
        if (!Array.isArray(items) && items !== null) { // Si items no es un array pero tampoco es null (respuesta inesperada)
             console.warn('[charactersStore] fetchCharacters recibió datos inesperados del servicio:', items);
        }
      } catch (error) {
        this.errorList = error.message || 'Error al cargar la lista de personajes.';
        this.characters = []; // Limpiar en caso de error
      } finally {
        this.isLoadingList = false;
      }
    },

    async fetchCharacterById(id) {
      this.isLoadingDetail = true;
      this.errorDetail = null;
      this.character = null; // Limpiar detalle anterior
      try {
        // Se asume que charactersService.getCharacterById devuelve el objeto del personaje directamente
        const data = await getCharacterById(id);
        this.character = data;
      } catch (error) {
        this.errorDetail = error.message || `Error al cargar el personaje con ID ${id}.`;
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