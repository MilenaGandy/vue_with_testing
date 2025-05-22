<template>
    <v-dialog
      :model-value="isVisible"
      max-width="500px"
      persistent
      @click:outside="onOutsideClick"
      @keydown.esc="clearDialog"
    >
      <v-card>
        <v-card-title :class="['text-h5', titleBgClass]">
          <v-icon dark left class="mr-2">{{ errorIcon }}</v-icon>
          {{ title }}
        </v-card-title>
        <v-card-text class="pt-4 text-body-1">
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" @click="clearDialog">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import { mapState, mapActions } from 'pinia';
  import { useErrorStore } from '@/core/store/errorStore';
  
  export default {
    name: 'AppErrorDialog',
    computed: {
      // Mapeamos el estado del errorStore a propiedades computadas locales
      ...mapState(useErrorStore, ['isVisible', 'message', 'title']),
      // Clase dinámica para el fondo del título (opcional)
      titleBgClass() {
        // Podrías tener diferentes colores/iconos según el tipo de error si lo extiendes
        return 'error-title-bg-color'; // Define esta clase en <style>
      },
      errorIcon() {
        return 'mdi-alert-circle-outline';
      }
    },
    methods: {
      // Mapeamos la acción clearError
      ...mapActions(useErrorStore, {
        // Renombramos la acción localmente para evitar conflictos si es necesario
        // o para darle un nombre más específico al contexto del diálogo.
        clearDialogState: 'clearError' 
      }),
      clearDialog() {
        this.clearDialogState(); // Llama a la acción mapeada del store
      },
      onOutsideClick() {
        // Opcional: Decide si quieres que se cierre al hacer clic afuera.
        // Si es `persistent`, no se cerrará. Puedes llamar a clearDialog aquí si cambias de idea.
        // this.clearDialog();
      }
    }
  };
  </script>
  
  <style scoped>
  .error-title-bg-color {
    background-color: rgb(var(--v-theme-error)); /* Usa el color de error de tu tema Vuetify */
    color: white;
  }
  .v-card-text {
    line-height: 1.6;
  }
  </style>