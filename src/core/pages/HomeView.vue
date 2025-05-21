<template>
  <v-container>
    <v-card class="d-flex flex-column align-center mx-auto pa-5 rounded-xl" max-width="900" color="blue-lighten-2"  elevation="20">      
      <v-row justify="center" class="mt-5">
        <v-col cols="12" md="8" class="text-center">
          <v-img
            src="/src/core/assets/Dragon_Ball_Z_logo.svg"
            alt="Dragon Ball Z Logo"
            max-width="400"
          ></v-img>        
        </v-col>
        <v-col cols="12" md="12" class="text-center">
          <v-card-text class="text-h4 font-weight-bold">Bienvenido a la App de Dragon Ball Z</v-card-text>
          <v-card-text class="mt-3 text-h6">
            Explora información sobre tus personajes y transformaciones favoritas.
          </v-card-text>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-5">
        <v-col cols="12" sm="12" md="12">
          <v-card hover to="/characters" class="text-center py-3" color="red darken-1" dark>
            <v-card-title>
              <v-icon large left>mdi-account-group</v-icon>
              Personajes
            </v-card-title>
            <v-card-text>Ver lista de personajes</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <v-card hover to="/transformations" class="text-center py-3" color="yellow " dark>
            <v-card-title>
              <v-icon large left>mdi-creation</v-icon> Transformaciones
            </v-card-title>
            <v-card-text>Ver lista de transformaciones</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
// Lógica si es necesaria para la HomeView, por ahora puede estar vacío.
</script>

<style scoped>
/* Estilos específicos para HomeView si son necesarios */
</style>