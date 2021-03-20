import BackendClient from "../BackendClient";
import StoreObject from "../StoreObject";

const loginService = new BackendClient("login");

const localLoginData = {
  username: "",
  password: "",
  rememberMe: false,
};
if (window.localStorage) {
  localLoginData.username = window.localStorage.getItem("username");
  localLoginData.password = window.localStorage.getItem("password");
  localLoginData.rememberMe = window.localStorage.getItem("rememberMe");
}
export default {
  namespaced: true,
  state: {
    users: new StoreObject([]),
    loggedInUser: new StoreObject(null),
    loginData: new StoreObject(localLoginData),
    session: new StoreObject(null),
  },
  mutations: {
    setLoggedInUser(state, user) {
      state.loggedInUser.addCommit(user);
    },
    updateLoginData(state, update) {
      state.loginData.addCommit(update);
    },
    setSession(state, update) {
      state.session.addCommit(update);
      if (window.localStorage) {
        window.localStorage.setItem("access_token", update.access_token);
      }
    },
  },
  getters: {
    loginData(state) {
      return state.loginData.value;
    },
    isLoggedIn(state) {
      return Object.keys(state.session.value).length;
    },
  },
  actions: {
    async login({ commit, getters }) {
      const data = getters.loginData;
      try {
        const response = await loginService.create({ data });
        if (!response.data.error) {
          commit("setLoggedInUser", response.data.user);
          commit("setSession", response.data.session);
          commit("setAccessToken", response.data.session.access_token, {
            root: true,
          });
          if (data.rememberMe && window.localStorage) {
            window.localStorage.setItem("rememberMe", data.rememberMe);
            window.localStorage.setItem("username", data.username);
            window.localStorage.setItem("password", data.password);
          }
        } else {
          throw new Error(response.data.error);
        }
      } catch (error) {
        console.error("Failed to log in", error);
      }
    },
  },
};
