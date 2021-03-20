<template lang="pug">
.vrm-checkbox.vrm-component(@click.prevent="checked = !checked")
  input(
    :checked="data"
    @input="checked = !checked"
    :placeholder="placeholder"
    type="checkbox"
    ref="checkbox"
  )
  label(v-if="label") {{label}}
</template>
<script>
export default {
  props: {
    data: null,
    type: { type: String, default: "text" },
    placeholder: { type: String },
    label: { type: String },
  },
  data() {
    return {
      checked: this.data,
    };
  },
  watch: {
    checked() {
      this.emitVrmEvent();
    },
  },
  methods: {
    emitVrmEvent() {
      this.$emit("vrmUpdate", this.checked);
    },
  },
};
</script>
<style lang="sass" scoped>
.vrm-checkbox, input, label
  display: inline-block
  cursor: pointer
  -webkit-touch-callout: none
  -webkit-user-select: none
  -khtml-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
  text-decoration: none
.vrm-checkbox
  display: flex
  align-items: center
</style>
