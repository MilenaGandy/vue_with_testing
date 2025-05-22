// src/modules/characters/router/__tests__/index.spec.js

import { describe, it, expect, vi } from 'vitest';

// Mockea los componentes Vue ANTES de cualquier importación que los use (como charactersRoutes)
// vi.mock es "hoisted" (elevado) por Vitest.
vi.mock('../../pages/CharactersListView.vue', () => ({
  default: { name: 'CharactersListView', template: '<div>Mocked List View</div>' }
}));
vi.mock('../../pages/CharacterDetailView.vue', () => ({
  default: { name: 'CharacterDetailView', template: '<div>Mocked Detail View</div>' }
}));

// Ahora importa el array de rutas. Este usará los componentes mockeados.
import charactersRoutes from '../index';

// También importa las referencias a los componentes (que ahora son los mocks) si quieres
// hacer aserciones de igualdad de referencia.
import CharactersListView from '../../pages/CharactersListView.vue';
import CharacterDetailView from '../../pages/CharacterDetailView.vue';

describe('Character Module Routes', () => {
  it('should be an array', () => {
    expect(Array.isArray(charactersRoutes)).toBe(true);
  });

  it('should contain the correct number of routes', () => {
    expect(charactersRoutes.length).toBe(2);
  });

  describe('Characters List Route', () => {
    const listRoute = charactersRoutes.find(route => route.name === 'CharactersList');

    it('should define the characters list route', () => {
      expect(listRoute).toBeDefined();
      expect(listRoute.path).toBe('/characters');
      // Comparamos con el componente mockeado importado
      expect(listRoute.component).toBe(CharactersListView);
    });
  });

  describe('Character Detail Route', () => {
    const detailRoute = charactersRoutes.find(route => route.name === 'CharacterDetail');

    it('should define the character detail route', () => {
      expect(detailRoute).toBeDefined();
      expect(detailRoute.path).toBe('/characters/:id');
      // Comparamos con el componente mockeado importado
      expect(detailRoute.component).toBe(CharacterDetailView);
    });

    it('should NOT have props enabled for the detail route', () => {
      // Verifica que 'props' no esté definido o sea explícitamente false
      expect(detailRoute.props).toBeUndefined(); // O .toBe(false) si lo estableces así en tu router/index.js
    });
  });
});