import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { createApp } from 'vue'
import App from './App.vue'
import 'vue3-toastify/dist/index.css';
import router from './router';

const app = createApp(App);

app.use(autoAnimatePlugin);
app.use(router);
app.mount('#app');
