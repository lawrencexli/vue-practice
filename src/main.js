import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import { create, NButton } from 'naive-ui';

const app = createApp(App);
const pinia = createPinia();
const naive = create({
    components: [NButton]
});

app.use(pinia);
app.use(naive);
app.mount('#app');
