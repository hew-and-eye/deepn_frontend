<template lang="pug">
.vrm-input.vrm-component
  label(v-if="label") {{label}}
  input(
    :value="data"
    @input="emitVrmEvent"
    :placeholder="placeholder"
    :type="type"
  )
</template>
<script>
export default {
  props: {
    data: null,
    type: { type: String, default: "text" },
    placeholder: { type: String },
    label: { type: String },
  },
  methods: {
    emitVrmEvent(event) {
      this.$emit("vrmUpdate", event.target.value);
    },
  },
};
</script>
<style lang="sass" scoped>
.vrm-input
  input
    background: none
    border: none
    outline: none
    display: block
    width: 100%
    font-size: inherit
</style>
