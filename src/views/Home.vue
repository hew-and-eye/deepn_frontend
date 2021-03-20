<template lang="pug">
.home
  button.neu.extruded.clickable.small.padding-medium(@click="connectToIot") Test IOT Connection
  button.neu.extruded.clickable.small.padding-medium(@click="getQRString") Get QR Code
  pre.qr-holder(ref="qrHolder")
</template>
<script>
import { mapActions, mapState } from "vuex";
import qrcode from "qrcode-terminal";
export default {
  computed: {
    ...mapState("whatsapp", ["qrString"]),
  },
  watch: {
    qrString: {
      handler(qr) {
        console.warn("going to render QR code", qr);
        console._log = console.log;
        console.log = (qr) => {
          console.warn("in the modded log");
          this.$refs.qrHolder.innerText = qr;
          console._log(qr);
        };
        qrcode.generate(qr, { small: true });
        console.log = console._log;
        console.log("reassigning worked just fine");
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions("whatsapp", ["getQRString", "connectToIot"]),
  },
};
</script>
<style lang="sass" scoped>
.qr-holder
  div
    height: 20px
    width: 940px
</style>
