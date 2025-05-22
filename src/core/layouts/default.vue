// src/core/layouts/default.vue
<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <AppErrorDialog />
  </v-app>
</template>

<script>
import AppErrorDialog from '@/core/components/AppErrorDialog.vue';

export default {
  name: 'DefaultLayout',
  components: {
    AppErrorDialog,
  },
};
</script>