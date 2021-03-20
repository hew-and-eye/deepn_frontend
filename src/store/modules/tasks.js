import BackendClient from "../BackendClient";
import StoreObject from "../StoreObject";
import get from "lodash.get";

const tasksService = new BackendClient("tasks");
const usersService = new BackendClient("users");

export default {
  namespaced: true,
  state: {
    tasks: new StoreObject({}),
    newTask: new StoreObject({}),
  },
  getters: {
    accessToken({ rootState }) {
      return rootState.accessToken;
    },
  },
  mutations: {
    setNewTask(state, value) {
      state.newTask = new StoreObject(value);
    },
    updateNewTask(state, patch) {
      state.newTask.addCommit(patch);
    },
    addUserToSharedList(state, { payload }) {
      const sharedList = get(state.newTask.value, "shareData.users.shared", []);
      sharedList.push({
        ...payload,
        access_type: get(state.newTask.value, "shareData.accessType", "Read"),
      });
      state.newTask.addCommit({ "shareData.users.shared": sharedList });
    },
    updateTasks(state, tasks) {
      console.warn("doing the thing");
      const tasksObject = tasks.reduce((acc, task, index) => {
        acc[index] = task;
        return acc;
      }, {});
      console.warn({ tasksObject });
      state.tasks.addCommit(tasksObject);
      console.warn(state.tasks);
      console.warn(state.tasks.value);
    },
  },
  actions: {
    async searchForUsers({ commit, rootState }, search) {
      if (search) {
        const data = {
          username: search,
        };
        const headers = {
          Authorization: `Bearer ${rootState.accessToken}`,
        };
        const response = await usersService.find({ data, headers });
        commit("updateNewTask", {
          "shareData.users.search.results": response.data.results,
        });
      } else {
        commit("updateNewTask", { "shareData.users.search.results": [] });
      }
    },
    async createTask({ commit, rootState, state }) {
      // TODO: validation
      const data = state.newTask.value;
      data.shared_users = data.shareData?.users.shared;
      const headers = {
        Authorization: `Bearer ${rootState.accessToken}`,
      };
      const response = await tasksService.create({ data, headers });
      console.warn(response);
      if (!response.data.error) {
        commit("setNewTask", null);
      }
    },
    async findTasks({ commit, rootState }) {
      const headers = {
        Authorization: `Bearer ${rootState.accessToken}`,
      };
      const response = await tasksService.find({ data: {}, headers });
      console.warn("found tasks", response);
      if (!response.data.error) {
        commit("updateTasks", response.data.results.Items);
      }
    },
  },
};
