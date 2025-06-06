/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/core/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import '@/core/styles/styles.css'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
