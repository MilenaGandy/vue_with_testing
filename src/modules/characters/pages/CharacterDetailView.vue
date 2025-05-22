<template>
    <v-container>
        <v-row justify="center" class="mt-5">
            <v-col cols="12" md="8" class="text-center">
                <h1>Bienvenido a la App de Dragon Ball</h1>
                <p class="mt-3">
                Explora información sobre tus personajes y transformaciones favoritas.
                </p>
            </v-col>
        </v-row>
    
        <v-row justify="center" class="mt-5">
            <v-col cols="12" sm="6" md="4">
                <v-card hover to="/characters" class="text-center py-3">
                <v-card-title>
                    <v-icon large left>mdi-account-group</v-icon>
                    Personajes
                </v-card-title>
                <v-card-text>Ver lista de personajes</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>