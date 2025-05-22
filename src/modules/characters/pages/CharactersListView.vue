// src/modules/characters/pages/index.vue (CharactersListView)
<template>
  <v-container>
    <h1 class="mb-4">Lista de Personajes</h1>

    <div v-if="isLoading" class="text-center mt-10">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      <p class="mt-4">Cargando personajes...</p>
    </div>

    <v-alert v-else-if="error" type="error" prominent class="mt-5">
      <template v-slot:prepend>
        <v-icon>mdi-alert-circle-outline</v-icon>
      </template>
      <template v-slot:title>
        Error al Cargar Personajes
      </template>
      {{ error }}
    </v-alert>

    <v-row v-else-if="characters && characters.length > 0">
      <v-col
        v-for="character in characters"
        :key="character.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card :to="`/characters/${character.id}`" hover elevation="2" class="d-flex flex-column fill-height">
          <v-img :src="character.image" aspect-ratio="1" cover class="align-end text-white">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey-lighten-2"></v-progress-circular>
              </v-row>
            </template>
            <v-card-title class="text-subtitle-1" style="background-color: rgba(0,0,0,0.5);">
              {{ character.name }}
            </v-card-title>
          </v-img>
          <v-card-subtitle class="pt-3">{{ character.race }}</v-card-subtitle>
          <v-card-text>
            <div>Ki: {{ character.ki }}</div>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn color="primary" variant="text" :to="`/characters/${character.id}`">Ver Detalles</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-alert v-else type="info" class="mt-5">
      No se encontraron personajes.
    </v-alert>
  </v-container>
</template>

<script>
import { useCharactersStore } from '@/modules/characters/store/charactersStore';
// Opcional: si quieres usar mapState/mapActions con Options API de forma más directa
// import { mapState, mapActions } from 'pinia';

export default {
  name: 'CharactersListView',
  data() {
    // El estado local es mínimo o nulo, ya que la mayoría vendrá del store
    return {
      // Si necesitas manejar paginación localmente, podrías tener currentPage, itemsPerPage aquí
    };
  },
  computed: {
    // Mapea el estado del store a propiedades computadas
    charactersStore() {
      // Hacemos esto para tener una referencia al store en `this`
      // y evitar llamar a useCharactersStore() múltiples veces en el template o métodos.
      // Aunque es más idiomático en Options API usar mapState o accederlo directamente.
      // Para este ejemplo, lo hacemos así para claridad en el acceso.
      return useCharactersStore();
    },
    characters() {
      return this.charactersStore.characters;
    },
    isLoading() {
      return this.charactersStore.isLoadingList;
    },
    error() {
      return this.charactersStore.errorList;
    },
    // Podrías usar un getter del store si lo prefieres
    // ...mapState(useCharactersStore, ['characters', 'isLoadingList', 'errorList'])
  },
  methods: {
    // Mapea acciones del store a métodos locales
    // ...mapActions(useCharactersStore, ['fetchCharacters'])

    // O define un método que llame a la acción del store
    async initialLoadCharacters() {
      // Llama a la acción del store.
      // Puedes pasar page y limit si tuvieras controles de paginación.
      // El store usa page=1, limit=20 por defecto.
      // La versión anterior que tenías llamaba con (1, 50)
      await this.charactersStore.fetchCharacters(1, 50);
    }
  },
  mounted() {
    // Llama a la acción para cargar los personajes cuando el componente se monta
    this.initialLoadCharacters();
  },
  // Opcional: si quieres limpiar algo al destruir el componente
  // unmounted() {
  //   this.charactersStore.errorList = null; // Ejemplo de limpieza
  // }
};
</script>

<style scoped>
.v-card-title {
  word-break: break-word;
}
</style>