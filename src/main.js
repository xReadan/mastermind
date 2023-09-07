import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import Toaster from '@meforma/vue-toaster';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Create app
const app = createApp(App)
// Add libraries
app.use(Toaster)
app.use(VueSweetalert2)
// Mount to html
app.mount('#app')
