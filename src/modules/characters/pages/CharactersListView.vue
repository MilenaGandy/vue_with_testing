<template>
    <v-container>
      <h1 class="mb-4">Lista de Personajes</h1>
      <div v-if="isLoading" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p>Cargando personajes...</p>
      </div>
      <v-alert v-else-if="error" type="error" dense>
        {{ error }}
      </v-alert>
      <v-row v-else>
        <v-col
          v-for="character in characters"
          :key="character.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card :to="`/characters/${character.id}`" hover>
            <v-img :src="character.image" height="200px" cover>
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-card-title>{{ character.name }}</v-card-title>
            <v-card-subtitle>{{ character.race }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  // Crearemos este servicio en el siguiente paso
  // import { getCharacters } from '../services/charactersService';
  
  const characters = ref([]);
  const isLoading = ref(true);
  const error = ref(null);
  
  // Esto es solo un placeholder por ahora, hasta que creemos el servicio
  const fetchCharactersPlaceholder = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      // Simula una llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Datos de ejemplo
      characters.value = [
        { id: 1, name: 'Goku', race: 'Saiyan', image: 'https://res.cloudinary.com/d السياحة-في-الإمارات/image/upload/v1639208000/Goku_Super_Saiyan_Blue_dbz_ gauging_render_by_jaredsongohan_ddn2zkz-fullview.png' }, // URL de imagen de ejemplo
        { id: 2, name: 'Vegeta', race: 'Saiyan', image: 'https://i.pinimg.com/originals/3e/b6/9b/3eb69b30ef516ba0747e32814cf114d7.png' }, // URL de imagen de ejemplo
        // ... más personajes si quieres para probar el layout
      ];
      if (characters.value.length === 0) {
         error.value = "No se encontraron personajes (datos de prueba).";
      }
    } catch (e) {
      console.error(e);
      error.value = "Error al cargar los personajes (datos de prueba).";
    } finally {
      isLoading.value = false;
    }
  };
  
  onMounted(() => {
    fetchCharactersPlaceholder(); // Usaremos la función real del servicio más adelante
    // getCharacters().then(data => { ... });
  });
  </script>
  
  <style scoped>
  /* Estilos si son necesarios */
  </style>