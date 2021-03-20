<template lang="pug">
.find-modules
  .module-card(v-for="module in modulesArray")
    .module-card--name {{ module.name }}
    .module-card--value {{ getTemplateValue(module) }}
    .module-card-owner {{ module.owner }}
  
</template>
<script>
import { mapActions, mapState } from "vuex";
import { templateToValue } from "@/utils/templateToValue";
export default {
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
  },
};
</script>
<style lang="sass" scoped>
.find-modules
  padding: 1em
</style>
