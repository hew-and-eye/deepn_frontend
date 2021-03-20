import { createStore } from "vuex";
import users from "./modules/users";
import tasks from "./modules/tasks";
import whatsapp from "./modules/whatsapp";

export default createStore({
  state: {
    accessToken: null,
  },
  mutations: {
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
  },
  actions: {},
  modules: { users, tasks, whatsapp },
});
