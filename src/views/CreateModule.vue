<template lang="pug">
.create-module
    vrm-root(:config="config", :data="vrmData" @vrmUpdate="onVrmUpdate")
    .suggestions(:style="suggestionsStyle")
      div(v-for="suggestion in suggestions" @click="addSuggestion(suggestion)")
        | {{ suggestion.name }}
        div.suggestion-value "{{templateToValue(suggestion)}}"
</template>
<script>
import createModuleSchema from "./vrmSchema/createModule.json";
import { getHydratedConfig } from "@/components/VrmFramework/configManager";
import templateToValue from "@/utils/templateToValue";
import VrmRoot from "@/components/VrmFramework/VrmRoot";
import StoreObject from "../store/StoreObject";
const OPEN_DOUBLE_BRACE = /{{[^}}]*$/;
export default {
  components: { VrmRoot },
  data() {
    return {
      module: new StoreObject({}),
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
      return this.module.value;
    },
    suggestions() {
      return [
        {
          id: Math.floor(Math.random() * 1000000),
          name: "Matthew's breakfast",
          templates: Object.values({
            "0":
              "I am a sample module. Today Matthew ate an orange for breakfast",
          }),
          dependencies: {},
        },
        {
          id: "123456",
          name: "App name",
          templates: Object.values({ "0": "Deepn", "1": "Dependeco" }),
          dependencies: {},
        },
        {
          id: Math.floor(Math.random() * 1000000),
          name: "App description",
          templates: Object.values({
            "0":
              "Welcome to {{123456:0}}! This is a tool meant to help people easily maintain information",
          }),
          dependencies: { "123456:0": "Deepn" },
        },
      ];
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
  methods: {
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
        console.warn("this is where I would call the store");
      } else {
        this.module.addCommit(vrmEvent);
      }
    },
    templateToValue(suggestion) {
      return templateToValue(suggestion);
    },
    addSuggestion(suggestion) {
      const latestVersion = suggestion.templates.length - 1;
      const key = `${suggestion.id}:${latestVersion}`;
      const template = this.module.value.template.replace(
        OPEN_DOUBLE_BRACE,
        `{{${key}}}`
      );
      const dependencies = { [key]: suggestion.templates[latestVersion] };
      this.module.addCommit({ template, dependencies });
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
