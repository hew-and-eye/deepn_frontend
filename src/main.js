import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngry } from "@fortawesome/free-regular-svg-icons";
import store from './store'

library.add(faAngry);

createApp(App).use(store)
  .use(router)
  .mount("#app");
