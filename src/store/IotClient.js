import BackendClient from "./BackendClient";

import mqtt from "mqtt";
const options = {
  will: {
    topic: "TESTO",
    payload: JSON.stringify({ hello: "world" }),
  },
};
export default class IotClient {
  constructor() {
    this.backendClient = new BackendClient("iot");
  }
  async connect() {
    const connection = await this.backendClient.get({});
    const url = JSON.parse(connection.data.body).url;
    this.url = url;
    console.warn("will try to connect to", url);
    this.mqtt = mqtt.connect(this.url, options);
    this.mqtt.on("connect", () => {
      console.log("Connected!");
    });
  }
}
