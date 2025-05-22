<template>
    <v-container>
      <div v-if="isLoading" class="text-center mt-10">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        <p class="mt-4">Cargando detalles del personaje...</p>
      </div>
  
      <v-alert v-else-if="error" type="error" prominent class="mt-5">
        <template v-slot:prepend><v-icon>mdi-alert-circle-outline</v-icon></template>
        <template v-slot:title>Error al Cargar Personaje</template>
        {{ error }}
      </v-alert>
  
      <v-card v-else-if="character" class="mt-5 pa-8 rounded-xl" elevation="10" color="indigo-lighten-5">
        <v-row no-gutters>
          <v-col cols="12" md="4" sm="5">
            <v-img 
              :src="character.image" 
              :alt="character.name" 
              cover 
              height="100%" 
              min-height="300"
              class="rounded-s"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey-lighten-2"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
          <v-col cols="12" md="8" sm="7">
            <v-card-title class="text-h4 mb-1 pt-4">{{ character.name }}</v-card-title>
            <v-card-subtitle class="mb-3">
              <v-chip small color="indigo-lighten-1" class="mr-2">{{ character.race }}</v-chip>
              <v-chip small color="pink-lighten-1">{{ character.gender }}</v-chip>
            </v-card-subtitle>
  
            <v-list density="compact" class="py-0">
              <v-list-item class="px-4">
                <v-list-item-title class="font-weight-bold">Ki:</v-list-item-title>
                <v-list-item-subtitle>{{ character.ki }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item class="px-4">
                <v-list-item-title class="font-weight-bold">Max Ki:</v-list-item-title>
                <v-list-item-subtitle>{{ character.maxKi }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item class="px-4">
                <v-list-item-title class="font-weight-bold">Afiliación:</v-list-item-title>
                <v-list-item-subtitle>{{ character.affiliation }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
  
            <v-card-text class="mt-2 px-4 text-justify">
              <p class="text-body-1">{{ character.description }}</p>
            </v-card-text>
  
            <v-card-actions class="pa-4">
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
    props: {
      // Asume que el router pasa el 'id' como prop
      // En tu src/modules/characters/router/index.js, la ruta debe tener `props: true`
      // { path: '/characters/:id', name: 'CharacterDetail', component: CharacterDetailView, props: true }
      id: {
        type: [String, Number],
        required: true,
      },
    },
    computed: {
      // Mapea estado del store a propiedades computadas locales.
      // El primer argumento es el store, el segundo es un array de los nombres de las propiedades del estado o getters.
      ...mapState(useCharactersStore, {
        character: 'character', // this.character será this.store.character
        isLoading: 'isLoadingDetail', // this.isLoading será this.store.isLoadingDetail
        error: 'errorDetail',     // this.error será this.store.errorDetail
      }),
    },
    methods: {
      // Mapea acciones del store a métodos locales.
      // El primer argumento es el store, el segundo es un array de los nombres de las acciones.
      ...mapActions(useCharactersStore, ['fetchCharacterById', 'clearCharacterDetail']),
      
      async loadCharacterData() {
        // `this.id` viene de las props del router
        await this.fetchCharacterById(this.id);
      },
      goBack() {
        this.$router.push('/characters'); // O this.$router.go(-1) para ir a la página anterior en el historial
      }
    },
    created() {
      // Limpiamos cualquier detalle de personaje anterior antes de cargar el nuevo.
      // La acción `clearCharacterDetail` resetea character, errorDetail y isLoadingDetail.
      this.clearCharacterDetail(); 
      this.loadCharacterData();
    },
    watch: {
      // Si el ID de la ruta (y por ende la prop 'id') cambia mientras este componente ya está montado
      // (por ejemplo, navegando de un detalle de personaje a otro), necesitamos recargar los datos.
      id(newId) {
        this.clearCharacterDetail();
        this.loadCharacterData(); // Llama a loadCharacterData con el nuevo ID (implícito por this.id)
      }
    },
    // Es una buena práctica limpiar el estado del detalle cuando el componente se destruye
    // para no mostrar datos antiguos brevemente si se vuelve a esta vista o a otra de detalle.
    beforeUnmount() {
      this.clearCharacterDetail();
    },
  };
  </script>
  
  <style scoped>
  .v-card-title {
    word-break: break-word;
  }
  .v-list {
    background-color: #E8EAF6; /* Asegúrate de que el color esté en formato hexadecimal */
  }
  .v-list-item-title {
    min-width: 90px; /* Ajusta para alineación si es necesario */
    flex: none; /* Para que el min-width tenga efecto */
    font-weight: bold;
  }
  .v-list-item-subtitle {
    white-space: normal; /* Para que el texto largo se ajuste */
  }
  .rounded-s { /* Para redondear solo el lado inicial de la imagen en md y superior */
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  @media (max-width: 959px) { /* sm y xs de Vuetify */
    .rounded-s {
      border-top-right-radius: inherit; /* Redondea todos los bordes en pantallas pequeñas */
      border-bottom-left-radius: 0; /* Quita el redondeo inferior izquierdo si la imagen está arriba */
    }
  }
  </style>