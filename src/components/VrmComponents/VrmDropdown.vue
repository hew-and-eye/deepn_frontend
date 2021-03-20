<template lang="pug">
.vrm-dropdown.vrm-component(
    @click.prevent="onDropdownClick"
)
  .selected(
    @blur="showDropdown=false"
  ) {{ data || placeholder }}
    .caret
  .options(v-if="showDropdown")
    li(v-for="value in listValues" @click.prevent="emitVrmEvent(value)") {{ value }}
</template>
<script>
export default {
  props: {
    data: null,
    type: { type: String, default: "text" },
    placeholder: { type: String },
    listValues: { type: Array, default: () => [] },
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  beforeUnmount() {
    if (this.hideOnClickAway) {
      window.removeEventListener("click", this.hideOnClickAway);
    }
  },
  methods: {
    emitVrmEvent(value) {
      this.$emit("vrmUpdate", value);
    },
    onDropdownClick() {
      this.showDropdown = !this.showDropdown;
      this.hideOnClickAway = (event) => {
        if (!this.$el.contains(event.target)) {
          this.showDropdown = false;
          window.removeEventListener("click", this.hideOnClickAway);
        }
      };
      window.addEventListener("click", this.hideOnClickAway);
    },
  },
};
</script>
<style lang="sass" scoped>
.vrm-dropdown
  position: relative
  align-self: flex-start
  .selected
    display: flex
    align-items: center
    flex: 1
    justify-content: space-between
    padding: 0 4px
    .caret
      background-image: url(https://upload.wikimedia.org/wikipedia/commons/9/9a/Caret_down_font_awesome.svg)
      height: 30px
      width: 30px
      display: inline-block
  .options
    position: absolute
    top: 100%
    left: 0
    background: white
    width: 100%
    margin-top: 4px
    box-sizing: border-box
    border-radius: 8px
    overflow: auto
    border: 1px solid #6096fd
    li
      list-style: none
      cursor: pointer
      padding: 10px
      &:hover
        background: #ebebeb
</style>
