// src/modules/characters/pages/CharactersListView.vue
<template>
  <v-container>
    <v-row align="center" class="mb-5 mt-2">
      <v-col cols="auto" class="pr-2">
        <v-btn 
          color="deep-purple-accent-3" 
          variant="tonal"
          icon 
          size="small"
          @click="goBack"
          aria-label="Volver a la página anterior"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <h1 class="text-h5 text-md-h3 font-weight-bold">Lista de Personajes</h1>
      </v-col>
    </v-row>

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
import { mapState } from 'pinia'; 

export default {
  name: 'CharactersListView',
  computed: {
    charactersStore() {
      return useCharactersStore();
    },
    characters() {
      return this.charactersStore.characters;
    },
    isLoading() {
      return this.charactersStore.isLoadingList;
    },
  },
  methods: {
    async initialLoadCharacters() {
      await this.charactersStore.fetchCharacters(1, 50);
    },
    goBack() {
        this.$router.push('/');
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
.v-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.v-card:hover {
    transform: translateY(-4px);
}
</style>