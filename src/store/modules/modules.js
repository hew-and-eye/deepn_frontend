import BackendClient from "../BackendClient";
import StoreObject from "../StoreObject";
const moduleService = new BackendClient("modules");
export default {
  namespaced: true,
  state: {
    modules: new StoreObject({}),
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
    async findModules({ commit, rootState }) {
      const headers = {
        Authorization: `Bearer ${rootState.accessToken}`,
      };
      const response = await moduleService.find({ headers });
      let parsedData = response.data.map((d) => ({
        ...d,
        templates: JSON.parse(d.templates),
      }));
      parsedData = Object.values(parsedData).reduce((acc, val) => {
        acc[val.id] = val;
        return acc;
      }, {});
      console.log({ response, parsedData });
      commit("setModules", parsedData);
    },
    async createModule({ commit }, data) {
      data.owner = window.localStorage.getItem("username");
      if (!data.dependencies) {
        data.dependencies = {};
      }
      const response = await moduleService.create({ data });
      data.id = response.data.result.id;
      commit("setModules", data);
    },
  },
};
