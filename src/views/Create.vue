<template lang="pug">
.create
  h3 Create something
  .grid-menu
    router-link(to="create-post").grid-menu--entry.neu.extruded.small.clickable
      .entry
        | Post
      .description
        | Create a note, topic, or report that can be shared with others.
    router-link(to="create-post").grid-menu--entry.neu.extruded.small.clickable
      .entry
        | Recurring Task
      .description
        | Send scheduled notifications via Teamo or WhatsApp.
    router-link(to="create-post").grid-menu--entry.neu.extruded.small.clickable
      .entry
        | Lookup Value
      .description
        | Define a piece of data that can be referenced in posts and tasks.
</template>
<script>
export default {};
</script>
<style lang="sass" scoped>
.create, .grid-menu
  display: flex
  flex: 1
  flex-direction: column
  h3
    margin: 16px
    margin-top: 24px
    margin-bottom: 8px
.grid-menu
  flex-direction: row
  flex-wrap: wrap
  .grid-menu--entry
    text-decoration: none
    cursor: pointer
    height: 160px
    margin: 16px
    display: flex
    flex: 1 0 160px
    flex-direction: column
    justify-content: center
    align-items: center
    .entry
      font-size: 14pt
      font-weight: bold
    &:hover
      .description
        max-height: 200px
        margin: 10px 14px
    .description
      max-height: 0
      overflow: hidden
      transition: max-height 0.8s, margin 0.3s
      margin: 0 14px
</style>
