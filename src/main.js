import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import firebase from './firebase/config';
import store from './store';
import router from './router';

loadFonts();

createApp(App).use(router).use(store).use(vuetify).use(firebase).mount('#app');
