<template lang="pug">
.feed
  template(v-if="!feedData.length")
    div You have no notifications
  template(v-else)
    .dummy-notification(v-for="notification, index in feedData", :key="index")
      | Notification goes here
</template>
<script>
export default {
  props: {
    feedData: { type: Array, default: () => [] },
  },
};
</script>
