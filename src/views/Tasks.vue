<template lang="pug">
.tasks
  template(v-if="!feedData.length")
    div You have no tasks
  template(v-else)
    .task.extruded.neu.small.padding-medium.margin-wide(v-for="task, index in feedData", :key="index")
      .title(v-if="task.title") {{ task.title }}
      .description(v-if="task.description") {{ task.description }}
      .comments-indicator--wrapper
        .comments-indicator(v-if="task.comments?.length") {{task.comments.length}} comments
      
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("tasks", ["tasks"]),
    feedData() {
      console.warn(Object.values(this.tasks.value));
      return Object.values(this.tasks.value);
    },
  },
  methods: {
    ...mapActions("tasks", ["findTasks"]),
  },
  mounted() {
    this.findTasks();
  },
};
</script>

<style lang="sass" scoped>
.tasks
  padding: 16px 8px
  display: flex
  flex-wrap: wrap
  .task
    padding: 16px
    flex: 1 0 160px
    margin: 6px 10px
    display: flex
    flex-direction: column
    .title
      font-weight: bold
    .description
      margin-top: 4px
    .comments-indicator--wrapper
      flex: 1 1 auto
      display: flex
      justify-content: flex-end
      align-items: flex-end
</style>
