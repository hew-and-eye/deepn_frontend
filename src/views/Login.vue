<template lang="pug">
.login
  .login-form--wrapper.neu.extruded.large
    vrm-root(:data="loginData" :config="config" @vrmUpdate="onVrmUpdate")
</template>
<script>
import loginSchema from "./vrmSchema/login.json";
import { getHydratedConfig } from "@/components/VrmFramework/configManager";
import VrmRoot from "@/components/VrmFramework/VrmRoot";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  components: {
    VrmRoot,
  },
  computed: {
    ...mapGetters("users", ["loginData", "isLoggedIn"]),
    config() {
      return getHydratedConfig(loginSchema);
    },
  },
  methods: {
    ...mapActions("users", ["login"]),
    ...mapMutations("users", ["updateLoginData"]),
    async onVrmUpdate(event) {
      this.updateLoginData(event);
      const actionEvent = Object.entries(event).find(([key]) =>
        key.includes("action:")
      );
      if (actionEvent) {
        const [action, payload] = actionEvent;
        await this[action.replace("action:", "")](payload);
        if (this.isLoggedIn) {
          this.$router.push({ name: this.$route.query.redirect || "Feed" });
        }
      }
    },
  },
};
</script>
<style lang="sass" scoped>
.login
  height: 100%
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  &::before
    // content: ""
    position: fixed
    top: 0
    left: 0
    height: 100vh
    width: 100vw
    background: #eaeafa
    z-index: 1
  .login-form--wrapper
    min-width: 600px
    max-width: 90vw
    position: relative
    z-index: 2
    padding: 20px
</style>
