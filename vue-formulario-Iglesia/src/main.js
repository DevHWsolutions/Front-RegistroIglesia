import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "../src/Router";
import store from "./stores/store";

import App from "./App.vue";
import axios from "axios";

const app = createApp(App);
// axios.defaults.baseURL = "http://localhost:5003";

app.use(createPinia());
app.use(router);
app.mount("#app");
