import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

const app = createApp(App);

// Plugins
app.use(store);

// Mounting the app
app.mount('#app');
