<template lang="pug">
.vrm-textarea.vrm-component
  textarea(
    :value="data"
    @input="emitVrmEvent"
  )
</template>
<script>
export default {
  props: {
    data: null,
    type: { type: String, default: "text" },
    placeholder: { type: String },
  },
  methods: {
    emitVrmEvent(event) {
      this.$emit("vrmUpdate", event.target.value);
    },
  },
};
</script>
<style lang="sass" scoped>
.vrm-textarea
  textarea
    background: none
    border: none
    outline: none
    display: block
    width: 100%
    height: 100%
    font-size: inherit
    font: inherit
    resize: vertical
</style>
