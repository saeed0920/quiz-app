import { defineStore } from "pinia";

export default defineStore("modal", {
  state() {
    return {
      category: "",
      difficulty: "",
    };
  },
  getters: {},
});
