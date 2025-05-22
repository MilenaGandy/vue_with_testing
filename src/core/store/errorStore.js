// src/core/store/errorStore.js
import { defineStore } from 'pinia';

export const useErrorStore = defineStore('error', {
  state: () => ({
    isVisible: false,
    message: '',
    title: 'Error', // Título por defecto
  }),
  actions: {
    actions: {
        showError(message = 'Ha ocurrido un error inesperado.', title = 'Error') {
            console.log('[errorStore] showError invocado:', { message, title }); // <--- AÑADE ESTO
            this.message = message;
            this.title = title;
            this.isVisible = true;
        },
        clearError() {
        this.isVisible = false;
        // Opcional: resetear mensaje y título después de un pequeño delay para la animación de cierre
        // setTimeout(() => {
        //   this.message = '';
        //   this.title = 'Error';
        // }, 300);
        },
    },
  },
});