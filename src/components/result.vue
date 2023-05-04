<template>
  <h1 class="result p-4 rounded-md text-blue-700 font-[Lato] text-2xl">
    You got sample result {{ currect }}!
  </h1>
  <p class="desc font-[Roboto] text-gray-800 font-light text-xl">
    Enter a short description here about the result :
  </p>
  <div class="flex items-center gap-4 justify-center p-4">
    <button
      class="w-14 h-14 rounded-full hover:scale-110 transition-all"
      v-for="(item, index) of objectMain"
      :key="index"
      @click="show(item, index)"
      :class="{ red: !item.result, green: item.result }"
    ></button>
  </div>
  <div v-if="check" class="fixed">
    <span class="w-full h-full absolute z-[0]"></span>
    <div class="box flex flex-col z-[2]">
      <h1>{{ items.number + 1 }}</h1>
      <h2 v-html="items.question"></h2>
      <div v-for="(item, index) of items.answer">
        <p
          v-html="item"
          :class="{
            red: items.userIndex == index,
            green: items.mainIndex == index,
          }"
        ></p>
      </div>
    </div>
  </div>
</template>

<script>
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
};
</script>

<style lang="scss" scoped>
.green {
  background-color: green !important;
}
.red {
  background-color: red;
}
</style>
