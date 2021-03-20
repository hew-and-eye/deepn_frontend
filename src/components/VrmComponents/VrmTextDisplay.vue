<template lang="pug">
.vrm-text-display.vrm-component(:class={[type]: true})
  | {{ data || text }}
</template>
<script>
export default {
  props: {
    data: null,
    text: { type: String },
    type: { type: String, default: "normal" },
    classesObject: { type: Object },
  },
};
</script>
<style lang="sass" scoped>
.vrm-text-display
  justify-self: start
  margin-left: 10px
  margin-top: 10px
  &.formLabel
    font-weight: bold
    font-size: 12pt
</style>
