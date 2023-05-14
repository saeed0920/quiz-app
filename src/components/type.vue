<template>
  <div class="grid justify-items-start items-center gap-4">
    <h1 class="font-[Open-Sans] text-2xl font-bold">TYPE</h1>
    <div
      class="box flex items-center justify-between font-[Lato] text-xl w-full"
    >
      <label for="category">Select Category:</label>
      <select
        v-model="category"
        name="category"
        :id="category"
        class="p-2 bg-transparent border-none outline-none cursor-pointer font-serif w-1/2"
      >
        <option value="random" selected>Random</option>
        <option value="generalKnowledge">General Knowledge</option>
        <option value="history">History</option>
        <option value="politics">Politics</option>
        <option value="sports">Sport</option>
        <option value="programm">Programm</option>
      </select>
    </div>
    <div
      class="box flex items-center justify-between font-[Lato] text-xl w-full"
    >
      <label for="difficulty">Select Difficulty:</label>
      <select
        :disabled="sP"
        v-model="difficulty"
        name="difficulty"
        id="difficulty"
        class="p-2 bg-transparent border-none outline-none cursor-pointer font-serif w-1/2"
      >
        <option value="any" selected>Any</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
    <button
      class="font-[Lato] text-2xl font-bold bg-green-500 px-2 py-1 rounded-lg text-white hover:bg-green-600 transition-colors justify-self-end"
      @click="confrim"
    >
      Confrim
    </button>
  </div>
</template>

<script>
import { mapState, mapStores } from "pinia";
import useModelStore from "../store/modal";
export default {
  name: "type",
  emits: ["confrim"],
  props: {},
  data() {
    return {
      category: "random",
      difficulty: "any",
      sP: false,
    };
  },
  methods: {
    confrim() {
      const objectData = {
        category: this.category,
        difficulty: this.difficulty,
      };
      //  use pinia for share data
      this.modalStore.category = objectData.category;
      this.modalStore.difficulty = objectData.difficulty;

      // call event for send data for parent component
      this.$emit("confrim", objectData);
    },
  },
  watch: {
    category(newValue, oldValue) {
      newValue === "programm" ? (this.sP = true) : (this.sP = false);
    },
  },
  computed: {
    ...mapStores(useModelStore),
  },
};
</script>

<style lang="scss" scoped></style>
