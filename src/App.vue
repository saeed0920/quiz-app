<template>
  <main
    class="bg-gradient-to-r from-[#403B4A] to-[#E7E9BB] grid place-items-center"
  >
    <transition-group leave-active-class="animate__animated animate__fadeOut">
      <loading v-if="!img"></loading>
      <formQ @imgLoad="imgF"></formQ>
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
      img: false,
    };
  },
  methods: {
    imgF(boolean) {
      console.log(boolean, "yotest");
      this.img = boolean;
    },
  },
};
</script>
<style lang="scss">
main {
  min-width: 100dvw;
  min-height: 100dvh;
}
</style>
