<template lang="pug">
.vrm-leaf
  component(
    :is="config.component",
    :data="data",
    :config="config",
    :path="path",
    v-bind="config.props",
    @vrmUpdate="onVrmUpdate"
    :class="classesObject"
  )
</template>
<script>
export default {
  props: {
    data: null,
    path: { type: String, required: true },
    config: { type: Object, required: true },
  },
  computed: {
    classesObject() {
      let classes = {};
      if (this.config && this.config.props && this.config.props.classes) {
        classes = this.config.props.classes.reduce((acc, c) => {
          acc[c] = true;
          return acc;
        }, classes);
      }
      return classes;
    },
  },
  methods: {
    onVrmUpdate(event) {
      if (event.payload && event.path) {
        // Received event from nested Vrm component
        this.$emit("vrmUpdate", {
          path: event.path,
          payload: event.payload,
        });
      } else {
        // Received raw event from a component
        this.$emit("vrmUpdate", { path: this.path, payload: event });
      }
    },
    logSubUpdate(subupdate) {
      console.warn({ subupdate });
    },
  },
};
</script>
<style lang="sass" scoped>
.vrm-leaf
  display: grid
</style>
