<template lang="pug">
.create-module
  vrm-root(:config="config", :data="vrmData" @vrmUpdate="onVrmUpdate")
  .suggestions(:style="suggestionsStyle" v-if="suggestions && suggestions.length")
    div(v-for="suggestion in suggestions" @click="addSuggestion(suggestion)")
      | {{ suggestion.name }}
      div.suggestion-value "{{templateToValue(suggestion)}}"
</template>
<script>
import createModuleSchema from "./vrmSchema/createModule.json";
import { getHydratedConfig } from "@/components/VrmFramework/configManager";
import { templateToValue, templateToNames } from "@/utils/templateToValue";
import VrmRoot from "@/components/VrmFramework/VrmRoot";
import { mapActions, mapState } from "vuex";
const OPEN_DOUBLE_BRACE = /{{[^}}]*$/;
const SUGGESTION_TAG_TEMPLATE = `<span class="suggestion-value">_</span>&nbsp;`;
export default {
  components: { VrmRoot },
  data() {
    return {
      suggestionsTop: null,
      suggestionsLeft: null,
      suggestionsDisplay: "none",
      suggestionsMarginLeft: null,
    };
  },
  computed: {
    config() {
      return getHydratedConfig(createModuleSchema);
    },
    vrmData() {
      console.log(this.newModule.value.id);
      return this.newModule.value;
    },
    ...mapState("modules", ["modules", "newModule"]),
    suggestions() {
      return Object.values(this.modules.value);
    },
    suggestionsStyle: {
      get() {
        return {
          top: this.suggestionsTop,
          left: this.suggestionsLeft,
          display: this.suggestionsDisplay,
          marginLeft: this.suggestionsMarginLeft,
        };
      },
      set({ top = 0, left = 0, display, marginLeft = 0 }) {
        this.suggestionsTop = top + "px";
        this.suggestionsLeft = left + "px";
        this.suggestionsDisplay = display;
        this.suggestionsMarginLeft = -marginLeft + "px";
      },
    },
  },
  mounted() {
    this.findModules();
  },
  methods: {
    ...mapActions("modules", ["createModule", "findModules"]),
    onVrmUpdate(vrmEvent) {
      if (vrmEvent.template?.match(OPEN_DOUBLE_BRACE)) {
        const marginLeft =
          vrmEvent.template?.match(OPEN_DOUBLE_BRACE)[0].length * 6;
        this.suggestionsStyle = {
          ...getCaretTopPoint(),
          display: "block",
          marginLeft,
        };
      } else if (vrmEvent.template) {
        this.suggestionsStyle = { display: "none" };
      }
      if (vrmEvent["action:create"]) {
        const newIndex = Object.keys(this.newModule.value.templates || {})
          .length;
        console.log("using index", newIndex);
        const newModule = {
          ...this.newModule.value,
          templates: {
            ...this.newModule.value.templates,
            [newIndex]: this.convertHTMLStringToTemplate(
              this.newModule.value.template
            ),
          },
          reactions: {}, // name, owner, dependencies, templates, reactions
        };
        delete newModule.template;
        console.warn(newModule);
        this.createModule(newModule);
      } else {
        this.newModule.addCommit(vrmEvent);
      }
    },
    convertTemplateToHTMLString(suggestion) {
      return templateToNames(
        suggestion,
        SUGGESTION_TAG_TEMPLATE,
        this.suggestions
      );
    },
    handleModuleEdit(event) {
      const templateValue = this.convertStringToTemplate(
        event.target.innerHTML
      );
      this.$emit("vrmUpdate", templateValue);
    },
    convertHTMLStringToTemplate(htmlString) {
      const { dependencies } = this.newModule.value;
      Object.entries(dependencies || {}).forEach(([key]) => {
        const modules = this.suggestions.reduce((acc, m) => {
          acc[m.id] = m;
          return acc;
        }, {});
        htmlString = htmlString.replace(
          new RegExp(
            SUGGESTION_TAG_TEMPLATE.replace(
              "_",
              modules[key.split(":")[0]].name,
              "g"
            ),
            "g"
          ),
          `{{${key}}}`
        );
      });
      return htmlString;
    },
    templateToValue(suggestion) {
      return templateToValue(suggestion);
    },
    addSuggestion(suggestion) {
      const latestVersion = Object.keys(suggestion.templates).length - 1;
      const key = `${suggestion.id}:${latestVersion}`;
      const template = this.newModule.value.template.replace(
        OPEN_DOUBLE_BRACE,
        `{{${key}}}`
      );
      const dependencies = { [key]: templateToValue(suggestion) };
      this.newModule.addCommit({
        template: this.convertTemplateToHTMLString({ template, dependencies }),
        dependencies: { ...this.newModule.value.dependencies, ...dependencies },
      });
      this.suggestionsStyle = { display: "none" };
    },
  },
};
/**
 * Get the caret position in all cases
 *
 * @returns {object} left, top distance in pixels
 */
function getCaretTopPoint() {
  const sel = document.getSelection();
  const r = sel.getRangeAt(0);
  let rect;
  let r2;
  // supposed to be textNode in most cases
  // but div[contenteditable] when empty
  const node = r.startContainer;
  const offset = r.startOffset;
  if (offset > 0) {
    // new range, don't influence DOM state
    r2 = document.createRange();
    r2.setStart(node, offset - 1);
    r2.setEnd(node, offset);
    // https://developer.mozilla.org/en-US/docs/Web/API/range.getBoundingClientRect
    // IE9, Safari?(but look good in Safari 8)
    rect = r2.getBoundingClientRect();
    return { left: rect.right, top: rect.top };
  } else if (offset < node.length) {
    r2 = document.createRange();
    // similar but select next on letter
    r2.setStart(node, offset);
    r2.setEnd(node, offset + 1);
    rect = r2.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  } else {
    // textNode has length
    // https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect
    rect = node.getBoundingClientRect();
    const styles = getComputedStyle(node);
    const lineHeight = parseInt(styles.lineHeight);
    const fontSize = parseInt(styles.fontSize);
    // roughly half the whitespace... but not exactly
    const delta = (lineHeight - fontSize) / 2;
    return { left: rect.left, top: rect.top + delta };
  }
}
</script>
<style lang="sass" scoped>
.create-module
  display: flex
  padding: 4em
  flex-direction: column
  justify-content: flex-end
  .suggestions, .suggestion-value
    position: fixed
    background: white
    border: 1px solid #6096fd
    padding: 6px
    border-radius: 6px
    margin-top: 1.2em
    div
      padding: 6px 4px
      cursor: pointer
      font-family: monospace
      &:hover .suggestion-value
        opacity: 1
        margin-left: 0
    .suggestion-value
      filter: brightness(0.98)
      opacity: 0
      margin-left: -8px
      pointer-events: none
      transition: all 0.2s
</style>
