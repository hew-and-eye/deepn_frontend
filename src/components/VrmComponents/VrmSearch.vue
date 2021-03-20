<template lang="pug">
.vrm-search.vrm-component
  label(v-if="label") {{label}}
  input.search(
    :value="searchTerm"
    @input="emitSearch"
    :placeholder="placeholder"
    :type="type"
  )
  .results(v-if="searchResults && searchResults.length")
    li(v-for="result in searchResults" @click="emitResultSelection(result)") {{ result.username }}
</template>
<script>
export default {
  props: {
    data: null,
    type: { type: String, default: "text" },
    placeholder: { type: String },
    label: { type: String },
    path: { type: String },
  },
  computed: {
    searchTerm() {
      return this.data && this.data.term;
    },
    searchResults() {
      return this.data && this.data.results;
    },
  },
  methods: {
    emitResultSelection(searchResult) {
      this.$emit("vrmUpdate", {
        path: `${this.path}.selectedResult`,
        payload: searchResult,
      });
    },
    emitSearch(event) {
      this.$emit("vrmUpdate", {
        path: `${this.path}.term`,
        payload: event.target.value,
      });
    },
  },
};
</script>
<style lang="sass" scoped>
.vrm-search
  position: relative
  input
    background: none
    border: none
    outline: none
    display: block
    width: 100%
    font-size: inherit
  .results
    position: absolute
    top: 100%
    left: 0
    background: white
    width: 100%
    margin-top: 4px
    box-sizing: border-box
    border-radius: 8px
    overflow: auto
    border: 1px solid #6096fd
    z-index: 1
    li
      list-style: none
      cursor: pointer
      padding: 10px
      &:hover
        background: #ebebeb
</style>
