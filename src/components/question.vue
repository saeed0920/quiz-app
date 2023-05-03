<template>
  <h3
    class="header bg-red-400 font-semibold py-2 px-4 rounded-md text-white font-sans shadow-md z-[2]"
  >
    1 out of 3 questions answered
  </h3>
  <h1
    class="question text-white bg-green-500 rounded-md p-4 font-bold font-serif text-3xl mb-4 shadow-inner"
  >
    Sample Question 1
  </h1>
  <div class="q flex flex-col [&>button]:text-start gap-4 my-4">
    <button
      class="py-4 px-8 bg-white shadow-md rounded-lg transition-all hover:scale-105 hover:shadow-sm"
    >
      Sample Answer 1
    </button>
  </div>
</template>

<script>
export default {
  name: "question",
};
</script>

<style lang="scss" scoped></style>
