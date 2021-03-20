<template lang="pug">
.create
  .title
    router-link.caret.right(to="create")
    | Create a post
  vrm-root(:config="config", :data="vrmData" @vrmUpdate="onVrmUpdate")
</template>
<script>
import createTaskSchema from "./vrmSchema/createTask.json";
import { getHydratedConfig } from "@/components/VrmFramework/configManager";
import VrmRoot from "@/components/VrmFramework/VrmRoot";
import { mapActions, mapMutations, mapState } from "vuex";
// const DEBOUNCE_TIMEOUT = 200;
export default {
  components: { VrmRoot },
  data() {
    return {
      debounceTimeouts: {},
    };
  },
  computed: {
    ...mapState("tasks", ["newTask"]),
    vrmData() {
      return this.newTask.value;
    },
    config() {
      return getHydratedConfig(createTaskSchema);
    },
  },
  methods: {
    ...mapActions("tasks", ["searchForUsers", "createTask"]),
    ...mapMutations("tasks", ["updateNewTask", "addUserToSharedList"]),
    onVrmUpdate(event) {
      const searchTerm = event["shareData.users.search.term"];
      const selectedUser = event["shareData.users.search.selectedResult"];
      const createTask = event["action:create"];
      if (searchTerm) {
        console.warn("going to search for users");
        this.searchForUsers(searchTerm);
        this.updateNewTask(event);
      } else if (selectedUser) {
        const [path, payload] = Object.entries(event)[0];
        this.addUserToSharedList({ path, payload });
        this.searchForUsers(null);
      } else if (createTask) {
        this.createTask();
      } else {
        this.updateNewTask(event);
      }
    },
  },
};
</script>
<style lang="sass" scoped>
.create
  padding: 10px
  .caret
    background-image: url(https://upload.wikimedia.org/wikipedia/commons/9/9a/Caret_down_font_awesome.svg)
    height: 24px
    width: 24px
    margin-top: -2px
    display: inline-block
    &.right
      transform: rotate(90deg)
  .title
    text-align: left
    margin-left: 8px
    margin-top: 8px
    font-size: 14pt
    font-weight: bold
    display: flex
    align-items: center
</style>
