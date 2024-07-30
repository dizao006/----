import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import * as loginServ from "./service/loginService";

// loginServ.login("abcd", "123").then((e) => {
//   console.log("====================================");
//   console.log(e);
//   console.log("====================================");
// });
// loginServ.whoAmi().then((e) => {
//   console.log("====================================");
//   console.log(e);
//   console.log("====================================");
// });
store.dispatch("loginUser/whoAmi");
createApp(App).use(store).use(router).mount("#app");
