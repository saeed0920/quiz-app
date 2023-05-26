<template>
  <main
    class="bg-gradient-to-r from-[#403B4A] to-[#E7E9BB] grid place-items-center des:p-4 minDes:p-10 phone:p-[unset]"
  >
    <transition-group leave-active-class="animate__animated animate__fadeOut">
      <loading key="loading-component" v-if="!imgCheck"></loading>
      <formQ key="form-component" v-show="imgCheck" @imgLoad="imgF"></formQ>
    </transition-group>
  </main>
</template>
<script>
import formQ from "./components/formq.vue";
import loading from "./components/loading.vue";
export default {
  name: "app",
  components: {
    formQ,
    loading,
  },
  data() {
    return {
      imgCheck: false,
    };
  },
  methods: {
    imgF(boolean) {
      this.imgCheck = boolean;
    },
  },
};
</script>
<style lang="scss">
html {
  @media only screen and (max-width: 106.25em) {
    font-size: 90%;
  }
  @media only screen and (max-width: 62.5em) {
    font-size: 85%;
  }
  @media only screen and (max-width: 43.75em) {
    font-size: 75%;
  }
  @media only screen and (max-width: 31.25em) {
    font-size: 70%;
  }
}
main {
  min-width: 100dvw;
  min-height: 100dvh;
}
</style>
