<template>
  <main
    class="bg-gradient-to-r from-[#d9a7c7] to-[#ffdde1] grid place-items-center"
  >
    <formQ></formQ>
  </main>
</template>
<script>
import formQ from "./components/formq.vue";
export default {
  name: "app",
  components: {
    formQ,
  },
};
</script>
<style lang="scss">
main {
  min-width: 100dvw;
  min-height: 100dvh;
}
</style>
