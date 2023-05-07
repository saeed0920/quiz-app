<template>
  <div
    class="absolute h-full w-full z-[3] backdrop-blur-md grid place-items-center left-0 top-0"
  >
    <div class="loading-test animate-spin rounded-full"></div>
  </div>
</template>

<script>
export default {
  name: "component-loading",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.loading-test {
  border: white 5px solid;
  border-top: 5px solid #e0e2b7;
  width: 5rem;
  height: 5rem;
}
</style>
