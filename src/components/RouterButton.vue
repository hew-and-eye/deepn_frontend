<template lang="pug">
.router-button.neu.small.clickable(:class="{intruded: isActive}")
  router-link(:to="{ name: to }") {{ label || to }}
</template>
<script>
import ZIcon from "@/components/ZIcon";

export default {
  components: { "z-icon": ZIcon },
  props: {
    to: { type: String, required: true },
    label: { stype: String },
    icon: { type: String },
  },
  data() {
    return {
      iconInitialized: false,
    };
  },
  computed: {
    isActive() {
      return this.$route.name === this.to;
    },
  },
};
</script>
<style lang="sass" scoped>
.router-button
  cursor: pointer
  padding: 8px 16px
  margin: 0.5em 0.3em
  text-align: center
  a
    text-decoration: none
    color: inherit !important
    text-align: center
</style>
