<template>
  <v-container class="fill-height d-flex align-center justify-center pa-4">
    <v-card
      class="d-flex flex-column align-center mx-auto pa-sm-8 pa-4 rounded-xl"
      max-width="900"
      color="blue-lighten-3"
      elevation="20"
      width="100%"
    >
      <v-row justify="center" class="mt-md-5 mt-3" style="width: 100%;">
        <v-col cols="12" sm="10" md="8" class="text-center">
          <v-img
            src="/src/core/assets/Dragon_Ball_Z_logo.svg"
            alt="Dragon Ball Z Logo"
            max-width="350" 
            width="100%"
            class="mx-auto mb-4"
          ></v-img>
        </v-col>
      </v-row>

      <v-row justify="center" class="text-center" style="width: 100%;">
        <v-col cols="12">
          <div class="text-h4 font-weight-bold text-indigo-darken-3">
            Bienvenido a la App de Dragon Ball Z
          </div>
          <div class="my-3 text-h6 text-grey-darken-2">
            Explora información sobre tus personajes favoritos.
          </div>
        </v-col>
      </v-row>

      <v-card
        hover
        to="/characters"
        class="text-center py-3 rounded-xl mt-8 mb-4"
        color="red-darken-2"
        elevation="10"
        width="90%"
        max-width="320px"
        dark
      >
        <v-card-title class="justify-center">
          <v-icon size="large" start icon="mdi-account-group"></v-icon>
          Personajes
        </v-card-title>
        <v-card-text>Ver lista de personajes</v-card-text>
      </v-card>
    </v-card>
  </v-container>
</template>

<style scoped>
.text-h4, .text-h6 {
  line-height: 1.4; 
}
.v-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.v-card:hover {
    transform: translateY(-4px);
}
</style>