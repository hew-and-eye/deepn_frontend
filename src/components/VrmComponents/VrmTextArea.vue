<template lang="pug">
.vrm-textarea.vrm-component
  div(
    contenteditable=true
    @input="emitVrmEvent"
  ) {{data}}
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
      this.$emit("vrmUpdate", event.target.innerText);
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
  div
    outline: none
</style>
