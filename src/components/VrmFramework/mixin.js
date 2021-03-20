import { hasSubObject as _hasSubObject, isObject as _isObject } from "./utils";
export default {
  props: {
    config: { type: Object, required: true },
    data: { type: Object, default: () => ({}) },
  },
  data() {
    return {};
  },
  computed: {
    dataArray() {
      return Array.isArray(this.data) ? this.data : [this.data];
    },
    schema() {
      return this.config[0] || this.config;
    },
  },
  methods: {
    _defaultUpdateCallback(event) {
      this.$emit("vrmUpdate", event);
    },
    isObject(subConfig) {
      return _isObject(subConfig);
    },
    getConfig(path, config = this.config) {
      return Array.isArray(config) ? config[0][path] : config[path];
    },
    extractConfig(config) {
      return Array.isArray(config) ? config[0] : config;
    },
    isArray(data) {
      return Array.isArray(data);
    },
    hasSubObject(path) {
      const schema = this.getConfig(path);
      return _hasSubObject(schema);
    },
    forwardVrmUpdate({ path, payload }, index) {
      let newPath = `${this.path}.${path}`;
      if (index !== undefined) {
        newPath = newPath.replace(".", `.${index}.`);
      }
      this.$emit("vrmUpdate", {
        path: newPath,
        payload,
      });
    },
  },
};
