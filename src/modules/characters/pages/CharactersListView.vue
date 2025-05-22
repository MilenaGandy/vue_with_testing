// src/modules/characters/pages/CharactersListView.vue
<template>
  <v-container>
    <h1 class="mb-4">Lista de Personajes</h1>

    <div v-if="isLoading" class="text-center mt-10">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      <p class="mt-4">Cargando personajes...</p>
    </div>

    <v-row v-else-if="characters && characters.length > 0">
      <v-col
        v-for="character in characters"
        :key="character.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card :to="`/characters/${character.id}`" hover elevation="10" class="d-flex flex-column fill-height rounded-xl my-5" color="indigo-lighten-4">
          <v-img :src="character.image" aspect-ratio="1" class="align-end text-white">
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

    <v-alert v-else-if="!isLoading" type="info" class="mt-5">
      No se encontraron personajes.
    </v-alert>
  </v-container>
</template>

<script>
import { useCharactersStore } from '@/modules/characters/store/charactersStore';
// Ya no es necesario mapState si no usamos this.error directamente en el template,
// pero mantenerlo para las otras propiedades es consistente.
// Si solo se usan 'characters' e 'isLoading', podrías quitar 'error' de mapState.
import { mapState } from 'pinia'; 

export default {
  name: 'CharactersListView',
  // data() ya estaba vacío y es correcto así.
  computed: {
    // Mantenemos el acceso directo a la instancia del store si se prefiere,
    // o usamos mapState para las propiedades que sí se usan en el template.
    charactersStore() {
      return useCharactersStore();
    },
    // Mapeamos solo las propiedades del store que la plantilla necesita directamente
    characters() {
      return this.charactersStore.characters;
    },
    isLoading() {
      return this.charactersStore.isLoadingList;
    },
    // La propiedad computada 'error' que mapeaba a 'errorList' ya no es necesaria
    // si el v-alert correspondiente fue eliminado y no se usa en otro lado del script.
    // Si decides mantenerla para alguna lógica interna, está bien. Por ahora la quito para limpieza.
    // error() {
    //   return this.charactersStore.errorList;
    // },

    // Alternativa con mapState más concisa:
    // ...mapState(useCharactersStore, ['characters', 'isLoadingList']),
    // Si decides mantener 'errorList' para alguna lógica, la añadirías aquí:
    // ...mapState(useCharactersStore, ['characters', 'isLoadingList', 'errorList'])
  },
  methods: {
    async initialLoadCharacters() {
      await this.charactersStore.fetchCharacters(1, 50);
    }
  },
  mounted() {
    this.initialLoadCharacters();
  },
};
</script>

<style scoped>
.v-card-title {
  word-break: break-word;
}
</style>