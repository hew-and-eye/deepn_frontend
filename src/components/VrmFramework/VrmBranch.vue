<template lang="pug">
.vrm-branch
  slot
    template(
      v-if="isArray(config) || isArray(data)",
      v-for="value, index of data || []"
    )
      slot(:name="`branch-${index}`")
        vrm-branch(
          :data="value",
          :config="extractConfig(config)",
          :path="index",
          @vrmUpdate="forwardVrmUpdate($event)"
        )
    template(v-else)
      template(v-for="(subconfig, subpath) of extractConfig(config)")
        template(v-if="hasSubObject(subpath)")
          slot(name="every-branch")
            slot(:name="`branch-${subpath}`")
              vrm-branch(
                :config="extractConfig(subconfig)",
                :data="data[subpath]",
                :path="subpath",
                @vrmUpdate="forwardVrmUpdate"
              )
        template(v-else)
          slot(:name="`leaf-${subpath}`")
            vrm-leaf(
              :config="extractConfig(subconfig)",
              :data="data[subpath]",
              :path="subpath",
              @vrmUpdate="forwardVrmUpdate"
            )
</template>
<script>
import VrmLeaf from "./VrmLeaf";
import vrmMixin from "./mixin";
export default {
  components: { VrmLeaf },
  mixins: [vrmMixin],
  props: {
    path: { type: [String, Number], required: true },
  },
};
</script>
<style lang="sass" scoped>
.vrm-branch
  // display: inline-flex
  // flex-wrap: wrap
  // display: block
  // background: #eee
  // border-radius: 16px
  // box-shadow: 10px 10px 20px #ccc, -10px -10px 20px #ffffff
  // padding: 1em
  // margin: 1em
</style>