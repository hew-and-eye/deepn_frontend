<template lang="pug">
.find-modules
  .module-card.neu.extruded.small.padding-medium(v-for="module in modulesArray")
    .module-card--name.neu.extruded.small {{ module.name }}
    .module-card--value: span(v-html="getTemplateValue(module)")
    .module-card--footer
      | {{ module.owner }}
      vrm-button.edit-button.neu.extruded.clickable.tiny.padding-medium(label="Edit" v-if="isOwner" @vrmUpdate="editModule(module)")
  
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { templateToValue } from "@/utils/templateToValue";
import VrmButton from "@/components/VrmComponents/VrmButton";
export default {
  components: { VrmButton },
  mounted() {
    this.findModules();
  },
  computed: {
    ...mapState("modules", ["modules"]),
    modulesArray() {
      return Object.values(this.modules.value);
    },
  },
  methods: {
    ...mapActions("modules", ["findModules"]),
    getTemplateValue(module) {
      return templateToValue(module);
    },
    isOwner(module) {
      return module.owner === window.localStorage.getItem("username");
    },
    ...mapMutations("modules", ["setEditModule"]),
    editModule(module) {
      this.setEditModule(module);
      this.$router.push("create-module");
    },
  },
};
</script>
<style lang="sass" scoped>
.find-modules
  padding: 1em
  display: flex
  flex-wrap: wrap
  .module-card
    width: 400px
    height: 300px
    box-sizing: border-box
    margin: 12px
    padding-top: 50px
    position: relative
    display: flex
    flex-direction: column
    .module-card--name
      margin-left: -20px
      padding: 6px 10px
      top: 12px
      font-weight: bold
      position: absolute
      border-radius: 50px
      background: #aac
      font-size: 14pt
    .module-card--value
      margin: 6px 10px
      flex: 1
    .module-card--footer
      align-self: flex-end
      margin: 6px 10px
      .edit-button
        margin-left: 10px
</style>
