<template>
    <v-container>
      <div v-if="isLoading" class="text-center mt-10">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        <p class="mt-4">Cargando detalles del personaje...</p>
      </div>
  
      <v-card v-else-if="character" class="mt-5 pa-md-8 pa-4 rounded-xl" elevation="10" color="indigo-lighten-5">
        <v-row no-gutters>
          <v-col cols="12" md="4" sm="5">
            <v-img 
              :src="character.image" 
              :alt="character.name" 
              cover 
              height="100%" 
              min-height="300"
              class="rounded-s-md" 
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey-lighten-2"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
          <v-col cols="12" md="8" sm="7">
            <v-card-title class="text-h4 mb-1 pt-4 px-4">{{ character.name }}</v-card-title>
            <v-card-subtitle class="mb-3 px-4">
              <v-chip small color="indigo-lighten-1" class="mr-2">{{ character.race }}</v-chip>
              <v-chip small color="pink-lighten-1">{{ character.gender }}</v-chip>
            </v-card-subtitle>
  
            <v-list density="compact" class="py-0" style="background-color: transparent;">
              <v-list-item class="px-4">
                <v-list-item-title class="font-weight-bold fixed-width-title">Ki:</v-list-item-title>
                <v-list-item-subtitle>{{ character.ki }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item class="px-4">
                <v-list-item-title class="font-weight-bold fixed-width-title">Max Ki:</v-list-item-title>
                <v-list-item-subtitle>{{ character.maxKi }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item class="px-4">
                <v-list-item-title class="font-weight-bold fixed-width-title">Afiliación:</v-list-item-title>
                <v-list-item-subtitle>{{ character.affiliation }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
  
            <v-card-text class="mt-2 px-4 text-justify">
              <p class="text-body-1">{{ character.description }}</p>
            </v-card-text>
  
            <v-card-actions class="pa-4">
              <v-spacer></v-spacer>
              <v-btn 
                color="deep-purple-accent-3" 
                variant="tonal"
                @click="goBack"
              >
              Volver a la Lista
              </v-btn>              
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
  
      <v-alert v-else-if="!isLoading" type="info" class="mt-5">
        No se pudo encontrar o cargar la información del personaje.
      </v-alert>
    </v-container>
  </template>
  
  <script>
  import { useCharactersStore } from '@/modules/characters/store/charactersStore';
  import { mapState, mapActions } from 'pinia';
  
  export default {
    name: 'CharacterDetailView',
    computed: {
      // Mapeamos el estado del store. Ya no necesitamos 'errorDetail' aquí
      // si solo el diálogo global lo va a mostrar.
      ...mapState(useCharactersStore, {
        character: 'character',
        isLoading: 'isLoadingDetail',
        // error: 'errorDetail', // Eliminado si no se usa en este template
      }),
      characterIdFromRoute() {
        return this.$route.params.id;
      }
    },
    methods: {
      ...mapActions(useCharactersStore, ['fetchCharacterById', 'clearCharacterDetail']),
      
      async loadCharacterData() {
        const id = this.characterIdFromRoute;
        if (id) {
          await this.fetchCharacterById(id);
        } else {
          console.error("CharacterDetailView: No se encontró ID en los parámetros de la ruta.");
          // Opcional: podrías usar el errorStore aquí si el ID no está en la ruta,
          // ya que es un error de la aplicación/ruta y no de la API.
          // const errorStore = useErrorStore();
          // errorStore.showError("No se pudo determinar la identidad del personaje desde la ruta.", "Error de Navegación");
        }
      },
      goBack() {
        this.$router.push('/characters');
      }
    },
    created() {
      this.clearCharacterDetail(); 
      this.loadCharacterData();
    },
    watch: {
      characterIdFromRoute(newId, oldId) {
        if (newId && newId !== oldId) {
          this.clearCharacterDetail();
          this.loadCharacterData();
        }
      }
    },
    beforeUnmount() {
      this.clearCharacterDetail();
    },
  };
  </script>
  
  <style scoped>
  .v-card-title {
    word-break: break-word;
  }
  /* .v-list { background-color: transparent; } */ /* Ya estaba así */
  .fixed-width-title {
    min-width: 90px; 
    flex: none; 
    font-weight: bold;
  }
  .v-list-item-subtitle {
    white-space: normal;
  }
  .rounded-s-md {
    @media (min-width: 960px) { /* md breakpoint */
      border-top-left-radius: inherit !important;
      border-bottom-left-radius: inherit !important;
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }
  </style>