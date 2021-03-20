<template lang="pug">
vrm-branch.vrm-layout.horizontal(:config="subconfig" :data="data", :class="{[flexRatio]: true}")
</template>
<script>
import VrmBranch from "@/components/VrmFramework/VrmBranch";
export default {
  components: { VrmBranch },
  props: {
    config: { type: Object, required: true },
    data: { type: Object, default: () => ({}) },
    flexRatio: { type: String, default: "one" },
  },
  computed: {
    subconfig() {
      const subconfig = { ...this.config };
      delete subconfig["component"];
      delete subconfig["props"];
      return subconfig;
    },
  },
};
</script>
<style lang="sass">
.vrm-layout.horizontal
  display: flex
  flex-direction: row
  flex-wrap: wrap
  &.reverse-wrap
    flex-wrap: wrap-reverse
  > .vrm-leaf, > .vrm-branch
    flex-grow: 1
    flex-basis: auto
  &.three
    > .vrm-leaf:first-child, > .vrm-branch:first-child
      flex-grow: 3
</style>
