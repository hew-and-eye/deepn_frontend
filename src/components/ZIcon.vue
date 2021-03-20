<template lang="pug">
.z-icon
  img(
    v-if="initialized"
    :height="height"
    :width="width"
    :style="style"
    :src="url"
  )
</template>
<script>
const BASE_FILEPATH = `../../assets/zondicons/zondicons/`;
export default {
  props: {
    height: { type: [Number, String], default: 32 },
    width: { type: [Number, String], default: 32 },
    style: { type: Object, default: () => ({}) },
    icon: { type: String, required: true },
  },
  data() {
    return {
      initialized: false,
      url: null,
    };
  },
  mounted() {
    require(`${BASE_FILEPATH}${this.icon}.svg`).then((path) => {
      this.url = path;
      this.initialized = true;
    });
  },
};
</script>
