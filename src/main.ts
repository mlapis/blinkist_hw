import { createApp } from "vue";
import { VueCookieNext } from "vue-cookie-next";

import App from "./App.vue";

const app = createApp(App);
app.use(VueCookieNext);
app.mount("#app");

VueCookieNext.config({ expire: "1Y" });
