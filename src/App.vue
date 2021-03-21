<template lang="pug">
#app
  .app-header.neu
    logo.logo.neu.extruded.small
    .app-title Dependeco
  content-wrapper(:layout="navbarPosition")
    router-view(v-slot:main)
    template(v-slot:nav v-if="isLoggedIn")
      //- router-button(to="Home")
      //- router-button(to="Feed")
      //- router-button(to="Create")
      //- router-button(to="Tasks")
      router-button(to="CreateModule" label="Create")
      router-button(to="FindModules" label="Find")
</template>
<script>
import ContentWrapper from "@/components/ContentWrapper";
import RouterButton from "@/components/RouterButton";
import Logo from "@/components/Logo";
import { mapGetters } from "vuex";
export default {
  components: { ContentWrapper, RouterButton, Logo },
  computed: {
    ...mapGetters("users", ["isLoggedIn"]),
    navbarPosition() {
      return window.innerHeight > window.innerWidth ? "bottomNav" : "leftNav";
    },
  },
};
</script>
<style lang="sass">
$background-color: #eaeafa
$text-color: #335
$main-accent--background-color: #6096fd
$main-accent--text-color: #fff
$box-shadow--light: #fff
$box-shadow--dark: #c7c7d5
$box-shadow--colorful-light: #6eadff
$box-shadow--colorful-dark: #5280d7
.neu
  background-color: $background-color
  color: $text-color
  &.colorful
    background-color: $main-accent--background-color !important
    color: $main-accent--text-color !important

  &.extruded
    &.large
      background: $background-color
      box-shadow:  20px 20px 60px $box-shadow--dark, -20px -20px 60px $box-shadow--light
      border-radius: 24px

    &.medium
      border-radius: 18px
      background: $background-color
      box-shadow:  10px 10px 19px $box-shadow--dark, -10px -10px 19px $box-shadow--light

    &.small
      border-radius: 12px
      background: $background-color
      box-shadow:  4px 4px 7px $box-shadow--dark, -4px -4px 7px $box-shadow--light

    &.tiny
      border-radius: 8px
      background: $background-color
      box-shadow:  3px 3px 5px $box-shadow--dark, -3px -3px 5px $box-shadow--light

  &.intruded, &.clickable:hover
    &.large
      background: $background-color
      box-shadow: inset 20px 20px 60px $box-shadow--dark, inset -20px -20px 60px $box-shadow--light
      border-radius: 24px

    &.medium
      border-radius: 18px
      background: $background-color
      box-shadow: inset 10px 10px 19px $box-shadow--dark, inset -10px -10px 19px $box-shadow--light
      &.colorful
        box-shadow: inset 10px 10px 19px $box-shadow--colorful-dark, inset -10px -10px 19px $box-shadow--colorful-light

    &.small
      border-radius: 12px
      background: $background-color
      box-shadow: inset 4px 4px 7px $box-shadow--dark, inset -4px -4px 7px $box-shadow--light
      &.colorful
        box-shadow: inset 4px 4px 7px $box-shadow--colorful-dark, inset -4px -4px 7px $box-shadow--colorful-light

    &.tiny
      border-radius: 8px
      background: $background-color
      box-shadow: inset 3px 3px 5px $box-shadow--dark, inset -3px -3px 5px $box-shadow--light

  &.wide
    min-width: 50%
  &.padding-wide
    padding: 16px
  &.padding-medium
    padding: 8px
  &.padding-narrow
    padding: 4px
  &.margin-wide
      margin: 16px
  &.margin-medium
      margin: 8px
  &.margin-narrow
      margin: 4px
.full-width
  flex: 1
.justify-center
  justify-self: center
.justify-start
  justify-self: start
.justify-end
  justify-self: end
.font-huge
  font-size: 18pt
.font-large
  font-size: 14pt
.font-medium
  font-size: 12pt
.font-small
  font-size: 10pt
.font-tiny
  font-size: 8pt
</style>
<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.app-header {
  width: 100%;
  box-sizing: border-box;
  z-index: 2;
  display: flex;
  padding: 4px 24px;
  border-bottom: 1px #444;
  align-items: center;
  padding-top: 12px;
}
.content-wrapper {
  flex: 1;
}
</style>
<style scoped>
@media screen and (max-device-width: 768px) {
  .app-header .app-title {
    font-size: 10pt;
    margin-left: 10px;
    font-weight: bold;
  }
  .logo {
    height: 18px;
    width: 18px;
    margin-left: -8px;
  }
}
.app-title {
  font-size: 18pt;
  display: flex;
  margin-left: 24px;
}
</style>
<style>
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 4px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
