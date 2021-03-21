import { templateToNames } from "../../utils/templateToValue";
import BackendClient from "../BackendClient";
import StoreObject from "../StoreObject";
const SUGGESTION_TAG_TEMPLATE = `<span class="suggestion-value">_</span>&nbsp;&nbsp;`;
const moduleService = new BackendClient("modules");
export default {
  namespaced: true,
  state: {
    modules: new StoreObject({}),
    newModule: new StoreObject({}),
    dependencyLayers: {
      current: null,
      imports: {},
      importedBy: {},
    },
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
    initializeDependencyView(state, module) {
      state.dependencyLayers.current = module;
      state.dependencyLayers.imports = Object.keys(module.dependencies).reduce(
        (acc, dependency) => {
          const [id] = dependency.split(":");
          acc[id] = state.modules.value[id];
          return acc;
        },
        {}
      );
      state.dependencyLayers.importedBy = Object.values(
        state.modules.value
      ).reduce((acc, m) => {
        if (JSON.stringify(m.dependencies).includes(module.id)) {
          acc[m.id] = m;
          console.log("yaya");
        }
        return acc;
      }, {});
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
            const [id, version] = key.split(":");
            const dependency = parsedData.find((d) => d.id === id);
            const latestModuleVersion =
              Object.keys(dependency.templates).length - 1;
            if (version < latestModuleVersion) {
              if (!acc.outdated) {
                acc.outdated = {};
              }
              acc.outdated[key] = true;
              console.log(acc);
            }
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
