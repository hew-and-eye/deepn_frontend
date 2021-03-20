<template lang="pug">
.create-module
  | {{ modules }}
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  mounted() {
    this.findModules();
  },
  computed: {
    ...mapState("modules", ["modules"]),
  },
  methods: {
    ...mapActions("modules", ["findModules"]),
  },
};
</script>
