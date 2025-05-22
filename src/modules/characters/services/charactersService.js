// src/modules/characters/services/charactersService.js
import { apiClient } from '@/core/services/apiClient';

export const getCharacters = async (page = 1, limit = 20) => {
  try {
    // apiClient.get ahora devolverá el array de personajes directamente
    const charactersArray = await apiClient.get('/characters', { page, limit });

    // Verificamos que la respuesta sea un array (puede ser un array vacío)
    if (Array.isArray(charactersArray)) {
      return charactersArray;
    } else {
      // Si la estructura no es un array, es inesperado.
      console.error('[charactersService] Estructura de respuesta inesperada para getCharacters (se esperaba un array):', charactersArray);
      throw new Error('Respuesta de API inesperada al obtener personajes.');
    }
  } catch (error) {
    console.error(`[charactersService] Error al obtener la lista de personajes (page: ${page}, limit: ${limit}):`, error.message);
    throw error;
  }
};

export const getCharacterById = async (id) => {
  // Esta función probablemente no necesite cambios, asumiendo que /characters/:id
  // devuelve el objeto del personaje directamente.
  if (!id) {
    const error = new Error("[charactersService] Se requiere un ID para obtener un personaje.");
    console.error(error.message);
    throw error;
  }
  try {
    const character = await apiClient.get(`/characters/${id}`);
    return character;
  } catch (error) {
    console.error(`[charactersService] Error al obtener el personaje con ID ${id}:`, error.message);
    throw error;
  }
};