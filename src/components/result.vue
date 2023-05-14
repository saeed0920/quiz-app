<template>
  <h1
    class="result p-4 rounded-md text-blue-700 font-[Lato] font-bold text-2xl tab:text-gray-800"
  >
    You got sample result {{ currect }}!
  </h1>
  <p
    class="desc font-mono text-gray-800 font-light text-xl tab:text-[#faf6fc] text-center"
  >
    Category: {{ this.category }}
    <br />
    Difficulty: {{ this.difficulty }}
  </p>
  <div class="flex items-center gap-4 justify-center p-4">
    <button
      class="w-14 h-14 rounded-full hover:scale-105 hover:shadow-md active:scale-95 active:shadow-inner transition-all text-white text-bold text-2xl font-serif"
      v-for="(item, index) of objectMain"
      :key="index"
      @click="show(item, index)"
      :class="{ red: !item.result, green: item.result }"
    >
      {{ index + 1 }}
    </button>
  </div>

  <div v-if="check" class="flex flex-col">
    <div class="box flex flex-col p-6">
      <h1 class="text-2xl text-[#403b4a] font-light mb-4 tab:text-white">
        Q{{ items.number + 1 }}
      </h1>
      <h2 class="text-[#403b4a] text-2xl font-bold mb-4 tab:text-[#faf6fc]/90">
        {{ shl(items.question) }}
      </h2>

      <p
        v-for="(item, index) of items.answer"
        class="text-white font-medium font-sans text-lg px-4 py-2 rounded-md"
        :class="{
          red: items.userIndex == index,
          green: items.mainIndex == index,
        }"
      >
        {{ shl(item) }}
      </p>
    </div>
  </div>
</template>

<script>
import DOMPurify from "dompurify";
import he from "he";

import { mapState } from "pinia";
import useModalStore from "@/store/modal";

export default {
  name: "result ",
  props: ["data"],
  data() {
    return {
      objectMain: this.data,
      currect: 0,
      items: {
        number: "",
        question: "",
        answer: "",
        userIndex: "",
        mainIndex: "",
      },
      check: false,
    };
  },
  methods: {
    shl(q) {
      let test = DOMPurify.sanitize(q);
      return he.decode(test);
    },
    show(item, index) {
      this.items.number = index;
      this.items.question = item.question;
      this.items.answer = item.answer;
      this.items.userIndex = item.userAnswerIndex;
      this.items.mainIndex = item.currectAnswerIndex;
      this.check = true;
    },
  },
  mounted() {
    for (const child of this.objectMain) {
      if (child.result) this.currect++;
    }
  },
  computed: {
    ...mapState(useModalStore, ["category"]),
    ...mapState(useModalStore, ["difficulty"]),
  },
};
</script>

<style lang="scss" scoped>
.green {
  background-color: #2ecc71 !important;
}
.red {
  background-color: #e74c3c;
}
</style>
