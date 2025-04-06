import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { globalStore } from './store/globalStore';

const app = createApp(App)

globalStore.dispatch('movieStore/fetchGenres')

app.use(globalStore).use(router).mount('#app')
