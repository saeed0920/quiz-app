import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./assets/style.css";
import "../node_modules/animate.css";

let app = createApp(App);

app.use(createPinia());
app.mount("#app");
