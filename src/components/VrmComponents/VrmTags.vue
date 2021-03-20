<template lang="pug">
.vrm-tags.vrm-component(:class="{ hidden: !data || !data.length }")
  h3(v-if="label") {{label}} {{data}} 
  .vrm-tag.neu.extruded.small.padding-medium(v-for="tag in data")
    | {{renderText(tag)}} {{tag}} {{renderKey}}
    .x-button(v-if="removeButton")

</template>
<script>
export default {
  props: {
    data: null,
    text: { type: String },
    type: { type: String, default: "normal" },
    classesObject: { type: Object },
    renderKey: { type: String, default: "text" },
    label: { type: String },
    removeButton: { type: Boolean, default: true },
  },
  methods: {
    renderText(object) {
      return object[this.renderKey];
    },
  },
};
</script>
<style lang="sass" scoped>
.hidden
  display: none !important
.vrm-tags
  justify-self: start
  flex-wrap: wrap
  margin-left: 10px
  margin-top: 10px
  display: flex
  width: calc(100% - 18px)
  box-sizing: border-box
  margin-right: 24px
  .vrm-tag
    margin: 4px
    .x-button
      margin-left: 6px
      cursor: pointer
      background: #333
      width: 14px
      height: 14px
      justify-content: center
      align-items: center
      border-radius: 100%
      display: inline-flex
      &::after
        content: "\00D7"
        color: white
        font-weight: bold
</style>
