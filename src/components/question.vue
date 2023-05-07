<template>
  <h3
    class="header bg-red-400 font-semibold py-2 px-4 rounded-md text-white font-sans shadow-md z-[2]"
  >
    {{ mainNumber }} out of 5 questions answered
  </h3>
  <h1
    v-html="question"
    class="question text-[#433e4c] rounded-md p-4 font-bold font-serif text-3xl mb-4 min-h-[10rem]"
  ></h1>
  <div class="q flex flex-col [&>button]:text-start gap-4 my-4">
    <button
      v-for="(q, index) of answer"
      :key="index"
      @click="next(index)"
      class="py-4 px-8 bg-white shadow-md rounded-lg transition-all hover:scale-105 hover:shadow-sm"
    >
      {{ shl(q) }}
    </button>
  </div>
</template>

<script>
// import DOMPurify from "dompurify";
import DOMPurify from "isomorphic-dompurify";
export default {
  name: "question",
  emits: ["finishQ"],
  props: ["api", "checkP"],
  data() {
    return {
      dataCheck: this.checkP,
      data: this.api,
      mainNumber: 0,
      question: "",
      answer: [],
      currectIndex: "",
      result: [],
    };
  },
  methods: {
    shl(q) {
      console.log(DOMPurify.sanitize(q));
      return DOMPurify.sanitize(q);
    },
    next(index) {
      // setup
      this.answer = [];
      const data = this.data[this.mainNumber];
      this.question = data.question;

      // check api programming category or not
      if (this.dataCheck) {
        for (const [k, v] of Object.entries(data.answers)) {
          if (v != null) {
            this.answer.push(v);
          }
        }

        for (const [index, [k, v]] of Object.entries(
          Object.entries(data.correct_answers)
        )) {
          if (v == "true") this.currectIndex = index;
        }
      } else {
        for (const a of data.incorrect_answers) {
          this.answer.push(a);
        }

        // random genarete option
        const randomNumber = Math.floor(Math.random() * 4);
        this.currectIndex = randomNumber;
        this.answer.splice(randomNumber, 0, data.correct_answer);
      }
      // result function
      const inf = {
        question: this.question,
        answer: this.answer,
        currectAnswerIndex: this.currectIndex,
        userAnswerIndex: index,
      };
      if (this.currectIndex === index) {
        inf.result = true;
      } else {
        inf.result = false;
      }
      this.result.push(inf);
      //  finish
      this.mainNumber++;
      if (this.mainNumber === 5) {
        this.$emit("finishQ", this.result);
      }
    },
  },
  computed: {
    shlq(name) {
      return DOMPurify.sanitize(this.question);
    },
  },
  mounted() {
    if (this.dataCheck) {
      const data = this.data[this.mainNumber];

      this.question = data.question;
      for (const [k, v] of Object.entries(data.answers)) {
        if (v != null) this.answer.push(v);
      }

      for (const [index, [k, v]] of Object.entries(
        Object.entries(data.correct_answers)
      )) {
        if (v == "true") this.currectIndex = index;
      }
    } else {
      // setup
      const data = this.data[this.mainNumber];

      this.question = data.question;
      for (const a of data.incorrect_answers) {
        this.answer.push(a);
      }

      // random genarete option
      const randomNumber = Math.floor(Math.random() * 5);
      this.currectIndex = randomNumber;
      this.answer.splice(randomNumber, 0, data.correct_answer);
    }
    //  finish
    this.mainNumber++;
  },
};
</script>

<style lang="scss" scoped></style>
