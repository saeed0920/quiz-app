<template>
  <div class="grid justify-items-start items-center gap-2">
    <h1 class="">TYPE</h1>
    <div class="box flex items-center justify-between">
      <label for="category">Select Category:</label>
      <select v-model="category" name="category" :id="category">
        <option value="random" selected>Random</option>
        <option value="generalKnowledge">General Knowledge</option>
        <option value="history">History</option>
        <option value="politics">Politics</option>
        <option value="sports">Sport</option>
        <option value="programm">Programm</option>
      </select>
    </div>
    <div class="box flex items-center justify-between">
      <label for="difficulty">Select Difficulty:</label>
      <select v-model="difficulty" name="difficulty" id="difficulty">
        <option value="any" selected>Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
    <button @click="confrim">Confrim</button>
  </div>
</template>

<script>
export default {
  name: "type",
  emits: ["confrim"],
  props: {},
  data() {
    return {
      category: "random",
      difficulty: "any",
    };
  },
  methods: {
    confrim() {
      const objectData = {
        category: this.category,
        difficulty: this.difficulty,
      };
      this.$emit("confrim", objectData);
    },
  },
};
</script>

<style lang="scss" scoped></style>
