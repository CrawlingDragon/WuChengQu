import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "@/http";
// import "./registerServiceWorker";

// Vue.config.productionTip = false;

import "@/common/css/base.styl";
import "@/common/css/reseat.styl";
import Vant from "vant";
import { Dialog } from "vant";
import "vant/lib/index.css";
import { Lazyload } from "vant";
// import VConsole from "vconsole/dist/vconsole.min.js";

// if (process.env.NODE_ENV == "development") {
//   // eslint-disable-next-line no-unused-vars
//   var vsconsole = new VConsole();
// } else {
//   let meta = document.createElement("meta");
//   // <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
//   meta.httpEquiv = "Content-Security-Policy";
//   meta.content = "upgrade-insecure-requests";
//   document.getElementsByTagName("head")[0].appendChild(meta);
// }
// new VConsole();
import { createMetaManager, plugin as metaPlugin } from "vue-meta";
const app = createApp(App);
app.config.globalProperties.$axios = axios;
app
  .use(router)
  .use(store)
  .use(Vant)
  .use(Dialog)
  .use(Lazyload)
  .use(createMetaManager)
  .use(metaPlugin)
  .mount("#app");
// app
