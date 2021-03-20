<template lang="pug">
.vrm-root--wrapper
  slot
    template(
      v-if="isArray(data) || isArray(config)",
      v-for="value of data || []"
    )
      vrm-root(:data="value", :config="extractConfig(config)")
    .vrm-root(v-else)
      template(v-for="(subconfig, path) of extractConfig(config)")
        template(v-if="hasSubObject(path)")
          vrm-branch(
            :config="extractConfig(subconfig)",
            :data="data[path]",
            :path="path",
            @vrmUpdate="handleVrmUpdate"
          )
        template(v-else)
          vrm-leaf(
            :config="extractConfig(subconfig)",
            :data="data[path]",
            :path="path",
            @vrmUpdate="handleVrmUpdate"
          )
</template>
<script>
import VrmBranch from "./VrmBranch";
import VrmLeaf from "./VrmLeaf";
import vrmMixin from "./mixin";
export default {
  components: { VrmBranch, VrmLeaf },
  mixins: [vrmMixin],
  methods: {
    handleVrmUpdate({ path, payload }) {
      this.$emit("vrmUpdate", { [path]: payload });
    },
  },
};
</script>
<style lang="sass" scoped>
.vrm-root
  // display: flex
  // flex-wrap: wrap
  // align-items: center
  // display: block
  // background: #eee
  // border-radius: 16px
  // box-shadow: 10px 10px 20px #ccc, -10px -10px 20px #ffffff
  // padding: 1em
  // margin: 1em
</style>