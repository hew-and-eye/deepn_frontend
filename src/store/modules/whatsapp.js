import BackendClient from "../BackendClient";
import IotClient from "../IotClient";
import StoreObject from "../StoreObject";

const whatsAppService = new BackendClient("whatsapp");

export default {
  namespaced: true,
  state: {
    qrString: null,
    iotConnection: new StoreObject(null),
  },
  mutations: {
    setQRString(state, qrString) {
      state.qrString = qrString;
    },
    setIotConnection(state, conn) {
      state.iotConnection.addCommit(conn);
    },
  },
  actions: {
    async connectToIot({ commit }) {
      const client = new IotClient();
      await client.connect();
      commit("setIotConnection", client);
    },
    async getQRString({ commit, rootState }) {
      const headers = {
        Authorization: `Bearer ${rootState.accessToken}`,
      };
      const response = await whatsAppService.create({ headers });
      console.warn(response);
      if (response.data.qr) {
        console.warn("going to commit", response.data.qr);
        commit("setQRString", response.data.qr);
      }
    },
  },
};
