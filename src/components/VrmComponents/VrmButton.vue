<template lang="pug">
.vrm-button.vrm-component(@click.prevent="emitVrmClickEvent")
  button {{label}}
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
      clickCount: 0,
    };
  },
  watch: {
    checked() {
      this.emitVrmEvent();
    },
  },
  methods: {
    emitVrmClickEvent() {
      this.clickCount++;
      this.$emit("vrmUpdate", this.clickCount);
    },
  },
};
</script>
<style lang="sass" scoped>
.vrm-button, button, label
  display: inline-block
  cursor: pointer
  -webkit-touch-callout: none
  -webkit-user-select: none
  -khtml-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
  text-decoration: none
.vrm-button
  text-align: center
  button
    background: transparent
    border: none
    font-weight: bold
    outline: none
    font-size: inherit
    color: inherit
</style>
