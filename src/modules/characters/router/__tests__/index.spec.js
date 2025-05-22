// src/modules/characters/router/__tests__/index.spec.js

import { describe, it, expect } from 'vitest';
import charactersRoutes from '../index'; // Asumiendo que tu archivo es index.js
import CharactersListView from '../../pages/CharactersListView.vue';
import CharacterDetailView from '../../pages/CharacterDetailView.vue';

describe('Character Module Routes', () => {
  it('should be an array', () => {
    expect(Array.isArray(charactersRoutes)).toBe(true);
  });

  it('should contain the correct number of routes', () => {
    // Ajusta este número si añades o quitas rutas en el módulo de personajes
    expect(charactersRoutes.length).toBe(2);
  });

  describe('Characters List Route', () => {
    const listRoute = charactersRoutes.find(route => route.name === 'CharactersList');

    it('should define the characters list route', () => {
      expect(listRoute).toBeDefined();
      expect(listRoute.path).toBe('/characters');
      expect(listRoute.component).toBe(CharactersListView);
    });
  });

  describe('Character Detail Route', () => {
    const detailRoute = charactersRoutes.find(route => route.name === 'CharacterDetail');

    it('should define the character detail route', () => {
      expect(detailRoute).toBeDefined();
      expect(detailRoute.path).toBe('/characters/:id');
      expect(detailRoute.component).toBe(CharacterDetailView);
    });

    it('should have props enabled for the detail route', () => {
      expect(detailRoute.props).toBe(true);
    });
  });
});