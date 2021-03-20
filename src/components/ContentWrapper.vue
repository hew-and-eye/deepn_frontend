<template lang="pug">
.content-wrapper.neu(:class="{[layout]: true}")
  .content-wrapper--nav
    slot(name="nav")
  .content-wrapper--main.neu.intruded.medium
    slot
</template>
<script>
export default {
  props: {
    layout: { type: String, default: "bottomNav" },
  },
};
</script>
<style lang="sass" scoped>
.content-wrapper
  display: flex
  height: 100%
  width: 100%
  overflow: hidden
  .content-wrapper--main
    flex: 1 1 auto
    margin: 10px
    overflow: auto
  .content-wrapper--nav
    flex: 0 1 auto
    display: flex
  &.bottomNav
    flex-direction: column-reverse
    .content-wrapper--nav
      flex-direction: row
      justify-content: center
      padding-bottom: 10px
  &.leftNav
    flex-direction: row
    .content-wrapper--nav
      flex-direction: column
</style>
