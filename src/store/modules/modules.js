// import BackendClient from "../BackendClient";
import StoreObject from "../StoreObject";
// import get from "lodash.get";
const dummyModules = [
  {
    id: Math.floor(Math.random() * 1000000),
    name: "Matthew's breakfast",
    templates: Object.values({
      "0": "I am a sample module. Today Matthew ate an orange for breakfast",
    }),
    dependencies: {},
  },
  {
    id: "123456",
    name: "App name",
    templates: Object.values({ "0": "Deepn", "1": "Dependeco" }),
    dependencies: {},
  },
  {
    id: Math.floor(Math.random() * 1000000),
    name: "App description",
    templates: Object.values({
      "0":
        "Welcome to {{123456:0}}! This is a tool meant to help people easily maintain information",
    }),
    dependencies: { "123456:0": "Deepn" },
  },
];
export default {
  namespaced: true,
  state: {
    modules: new StoreObject(
      dummyModules.reduce((acc, m) => {
        acc[m.id] = m;
        return acc;
      }, {})
    ),
    newModule: new StoreObject({}),
  },
  getters: {
    accessToken({ rootState }) {
      return rootState.accessToken;
    },
  },
  mutations: {
    setModules(state, value) {
      state.modules.addCommit(value);
    },
    setNewModule(state, value) {
      state.newModule.addCommit(value);
    },
  },
  actions: {
    async getSuggestions({ commit, rootState }, search) {
      if (search) {
        const data = {
          username: search,
        };
        const headers = {
          Authorization: `Bearer ${rootState.accessToken}`,
        };
        console.warn("would do stuff here", headers, data);
        commit("setModules", {});
      }
    },
  },
};
