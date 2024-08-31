import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import PrimeButton from 'primevue/button';
import router from './router/index';

import '@primevue/themes/aura'; // Select your preferred theme
import 'primeicons/primeicons.css'; // PrimeIcons

const app = createApp(App);
app.use(PrimeVue);
app.use(router)
app.component('PrimeButton', PrimeButton);
app.mount('#app');
