// src/modules/characters/router/index.js
import CharactersListView from '@/modules/characters/pages/CharactersListView.vue';
import CharacterDetailView from '@/modules/characters/pages/CharacterDetailView.vue';

const routes = [
  {
    path: '/characters',
    name: 'CharactersList',
    component: CharactersListView,
  },
  {
    path: '/characters/:id',
    name: 'CharacterDetail',
    component: CharacterDetailView,
  },
];

export default routes;