<template lang="pug">
.vrm-module-editor.vrm-component
  div(
    v-show="!previewMode"
    ref="editor"
    contenteditable=true
    @input="emitVrmEvent"
  )
  div(v-show="previewMode" v-html="previewText")
  vrm-button.toggle-btn.neu.extruded.clickable.small.padding-medium(
    :label="previewMode ? 'Edit' : 'Preview'" style="float: right;"
    @vrmUpdate="toggleView"
  )
</template>
<script>
import VrmButton from "@/components/VrmComponents/VrmButton";
import { templateToValue } from "@/utils/templateToValue";
import { mapState } from "vuex";
const SUGGESTION_TAG_TEMPLATE = `<span class="suggestion-value">_</span>&nbsp;`;
export default {
  components: { VrmButton },
  props: {
    data: null,
    type: { type: String, default: "text" },
    placeholder: { type: String },
  },
  data() {
    return {
      previewMode: false,
    };
  },
  computed: {
    ...mapState("modules", ["modules", "newModule"]),
    previewText() {
      const template = this.convertHTMLStringToTemplate(this.data);
      return templateToValue({
        ...this.newModule.value,
        templates: { 0: template },
      });
    },
  },
  watch: {
    data: {
      handler() {
        this.$refs.editor.innerHTML = this.data;
        setEndOfContenteditable(this.$refs.editor);
        // From StackOverflow
        function setEndOfContenteditable(contentEditableElement) {
          var range, selection;
          if (document.createRange) {
            //Firefox, Chrome, Opera, Safari, IE 9+
            range = document.createRange(); //Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
            range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection(); //get the selection object (allows you to change selection)
            selection.removeAllRanges(); //remove any selections already made
            selection.addRange(range); //make the range you have just created the visible selection
          } else if (document.selection) {
            //IE 8 and lower
            range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
            range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
            range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
            range.select(); //Select the range (make it the visible selection
          }
        }
      },
    },
  },
  methods: {
    emitVrmEvent(event) {
      this.$emit("vrmUpdate", event.target.innerHTML);
    },
    toggleView() {
      console.log(this.convertHTMLStringToTemplate(this.data));
      this.previewMode = !this.previewMode;
    },
    convertHTMLStringToTemplate(htmlString) {
      const { dependencies } = this.newModule.value;
      Object.entries(dependencies || {}).forEach(([key]) => {
        htmlString = htmlString.replace(
          new RegExp(
            SUGGESTION_TAG_TEMPLATE.replace(
              "_",
              this.modules.value[key.split(":")[0]].name,
              "g"
            ),
            "g"
          ),
          `{{${key}}}`
        );
      });
      return htmlString;
    },
  },
};
</script>
<style lang="sass" scoped>
.vrm-module-editor
  textarea
    background: none
    border: none
    outline: none
    display: block
    width: 100%
    height: 100%
    font-size: inherit
    font: inherit
    resize: vertical
  div
    outline: none
</style>
<style lang="sass">
.vrm-module-editor
  .suggestion-value
    background: #aac
    font-family: monospace
    border-radius: 50px
    padding: 2px 8px
    max-width: 300px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    display: inline-block
    vertical-align: text-baseline
    margin-bottom: -4px
    font-size: 0.9em
    margin-top: 2px
    transition: all 0.4s
    &:hover
      max-width: 900px
</style>
