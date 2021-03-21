import { templateToNames } from "../../utils/templateToValue";
import BackendClient from "../BackendClient";
import StoreObject from "../StoreObject";
const SUGGESTION_TAG_TEMPLATE = `<span class="suggestion-value">_</span>&nbsp;`;
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
      state.newModule = new StoreObject(value);
    },
    setEditModule(state, value) {
      // const templateArray = Object.values(value.templates);
      // const lastTemplate = templateArray[templateArray.length - 1];
      value.template = templateToNames(
        value,
        SUGGESTION_TAG_TEMPLATE,
        Object.values(state.modules.value)
      );
      state.newModule = new StoreObject(value);
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
        val.dependencies = Object.entries(val.dependencies).reduce(
          (acc, [key, val]) => {
            acc[key] = val["S"];
            return acc;
          },
          {}
        );
        acc[val.id] = val;
        return acc;
      }, {});
      commit("setModules", parsedData);
    },
    async createModule({ commit, dispatch }, data) {
      data.owner = window.localStorage.getItem("username");
      if (!data.dependencies) {
        data.dependencies = {};
      }
      const response = await moduleService.create({ data });
      data.id = response.data.result.id;
      dispatch("findModules");
      commit("setNewModule", {});
    },
  },
};
