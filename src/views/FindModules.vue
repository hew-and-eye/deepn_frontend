<template lang="pug">
.find-modules
  .search-bar
    input.search.neu.intruded.tiny.padding-medium(v-model="search" placeholder="Search")
  .grid-view(v-if="gridView")
    .module-card.neu.extruded.small.padding-medium(
      v-for="module in filteredModulesArray"
      @click="searchDependencies(module)"
    )
      .module-card--name.neu.extruded.small {{ module.name }}
      .module-card--value: span(v-html="getTemplateValue(module)")
      .module-card--footer
        .outdated.neu.extruded.tiny.padding-small(
          v-if="hasOutdatedDependencies(module)"
        ) !
          .outdated-popover This module has outdated dependencies
        a.edit-button(
          href="/"
          v-if="isOwner(module)"
          @click.prevent="editModule(module)"
        ) Edit
        | {{ module.owner }}
  .dependency-view(v-else)
    a.close-button(@click.prevent="gridView = true; viewHistory = []" href="/") close
    .side-panel.neu.intruded.small.padding-medium
      .history
        h3 Visited
        .visited-module.module-card--name.neu.extruded.small(
          v-for="module in viewHistory"
        ) {{ module.name }}
    .main-panel
      .imported-by
        .module-card.neu.extruded.small.padding-medium(
          v-for="module in toValues(dependencyLayers.importedBy)"
          @click="searchDependencies(module)"
          v-if="toValues(dependencyLayers.importedBy).length"
        )
          .module-card--name.neu.extruded.small {{ module.name }}
          .module-card--value: span(v-html="getTemplateValue(module)")
          .module-card--footer
            .outdated.neu.extruded.tiny.padding-small(v-if="hasOutdatedDependencies(module)") !
              .outdated-popover This module has outdated dependencies
            a.edit-button(
              href="/"
              v-if="isOwner(module)"
              @click.prevent="editModule(module)"
            ) Edit
            | {{ module.owner }}
        .empty-layer(v-else) This module is not imported anywhere
      .up-arrow
        svg(version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve")
          g
            g
              path(d="M506.134,241.843c-0.006-0.006-0.011-0.013-0.018-0.019l-104.504-104c-7.829-7.791-20.492-7.762-28.285,0.068 c-7.792,7.829-7.762,20.492,0.067,28.284L443.558,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h423.557 l-70.162,69.824c-7.829,7.792-7.859,20.455-0.067,28.284c7.793,7.831,20.457,7.858,28.285,0.068l104.504-104 c0.006-0.006,0.011-0.013,0.018-0.019C513.968,262.339,513.943,249.635,506.134,241.843z")
      .current
        .module-card.neu.extruded.medium.padding-medium
          .module-card--name.neu.extruded.small {{ dependencyLayers.current.name }}
          .module-card--value: span(v-html="getTemplateValue(dependencyLayers.current)")
          .module-card--footer
            .outdated.neu.extruded.tiny.padding-small(v-if="hasOutdatedDependencies(dependencyLayers.current)") !
              .outdated-popover This module has outdated dependencies
            a.edit-button(
              href="/"
              v-if="isOwner(dependencyLayers.current)"
              @click.prevent="editModule(dependencyLayers.current)"
            ) Edit
            | {{ dependencyLayers.current.owner }}
      .up-arrow(style="margin-bottom: 32px; margin-top: -8px")
        svg(version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve")
          g
            g
              path(d="M506.134,241.843c-0.006-0.006-0.011-0.013-0.018-0.019l-104.504-104c-7.829-7.791-20.492-7.762-28.285,0.068 c-7.792,7.829-7.762,20.492,0.067,28.284L443.558,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h423.557 l-70.162,69.824c-7.829,7.792-7.859,20.455-0.067,28.284c7.793,7.831,20.457,7.858,28.285,0.068l104.504-104 c0.006-0.006,0.011-0.013,0.018-0.019C513.968,262.339,513.943,249.635,506.134,241.843z")
      .imports
        .module-card.neu.extruded.small.padding-medium(
          v-for="module in toValues(dependencyLayers.imports)"
          @click="searchDependencies(module)"
          v-if="toValues(dependencyLayers.imports).length"
        )
          .module-card--name.neu.extruded.small {{ module.name }}
          .module-card--value: span(v-html="getTemplateValue(module)")
          .module-card--footer
            .outdated.neu.extruded.tiny.padding-small(v-if="hasOutdatedDependencies(module)") !
              .outdated-popover This module has outdated dependencies
            a.edit-button(
              href="/"
              v-if="isOwner(module)"
              @click.prevent="editModule(module)"
            ) Edit
            | {{ module.owner }}
        .empty-layer(v-else) This module does not import anything
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { templateToValue } from "@/utils/templateToValue";
import VrmButton from "@/components/VrmComponents/VrmButton";
export default {
  components: { VrmButton },
  data() {
    return {
      gridView: true,
      viewHistory: [],
      search: null,
    };
  },
  mounted() {
    this.findModules();
  },
  computed: {
    ...mapState("modules", ["modules", "dependencyLayers"]),
    modulesArray() {
      return Object.values(this.modules.value);
    },
    filteredModulesArray() {
      if (!this.search) {
        return this.modulesArray;
      }
      return this.modulesArray.filter((module) => {
        return (
          JSON.stringify(module.templates).includes(this.search) ||
          JSON.stringify(module.dependencies).includes(this.search) ||
          module.name.includes(this.search) ||
          module.owner.includes(this.search)
        );
      });
    },
  },
  methods: {
    ...mapActions("modules", ["findModules"]),
    ...mapMutations("modules", ["setEditModule", "initializeDependencyView"]),
    getTemplateValue(module) {
      return templateToValue(module);
    },
    isOwner(module) {
      return module.owner === window.localStorage.getItem("username");
    },
    hasOutdatedDependencies(module) {
      return module.dependencies.outdated;
    },
    editModule(module) {
      this.setEditModule(module);
      this.$router.push("create-module");
    },
    searchDependencies(module) {
      this.initializeDependencyView(module);
      this.viewHistory.push(module);
      this.gridView = false;
    },
    toValues(modulesObject) {
      return Object.values(modulesObject);
    },
  },
};
</script>
<style lang="sass" scoped>
.find-modules
  padding: 1em
  height: 100%
  box-sizing: border-box
  .grid-view
    display: flex
    flex-wrap: wrap
  a
    color: #333
  .module-card--name
    padding: 6px 10px
    top: 12px
    font-weight: bold
    border-radius: 5px
    background: #aac
    font-size: 14pt
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
      position: absolute
    .module-card--value
      margin: 6px 10px
      flex: 1 1
      overflow: auto
    .module-card--footer
      align-self: flex-end
      margin: 6px 10px
      flex-shrink: 0
      flex-basis: auto
      .edit-button
        margin-right: 10px
      .outdated
        background-color: #e88
        display: inline-block
        margin-right: 16px
        width: 24px
        height: 24px
        border-radius: 50%
        display: inline-flex
        align-items: center
        justify-content: center
        position: relative
        cursor: pointer
        &:hover .outdated-popover
          opacity: 1
          top: 28px
        .outdated-popover
          pointer-events: none
          opacity: 0
          transition: all 0.2s
          background: white
          border: 1px solid #6096fd
          padding: 6px
          border-radius: 6px
          position: absolute
          width: auto
          white-space: nowrap
          top: 24px
          z-index: 1
  .dependency-view
    display: flex
    position: relative
    overflow: hidden
    height: 100%
    .close-button
      position: absolute
      top: 10px
      right: 10px
    .side-panel
      h3
        margin-top: 0.3em
      padding: 0.5em 1em
      .module-card--name
        margin: 8px 0
    .main-panel
      flex: 1 1
      overflow: hidden
      display: flex
      align-items: center
      flex-direction: column
      .empty-layer
        display: flex
        flex: 1
        justify-content: center
        align-items: center
        text-align: center
        min-height: 100px
      .imported-by, .imports, .current
        display: flex
        flex: 1
        justify-content: center
        overflow-x: auto
        width: 100%
        margin-left: 1em
      .current
        flex: 1.2
        align-items: center
      .module-card
        height: 180px
  .up-arrow
    height: 32px
    width: 32px
    transform: rotate(-90deg)
  .search-bar
    display: flex
    justify-content: center
    .search
      outline: none
      border: none
      min-width: 30vw
      padding: 12px 18px
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
