<template>
  <section
    class="flex rounded-3xl overflow-hidden shadow-md minDes:w-full tab:h-full tab:grid phone:rounded-none"
  >
    <div
      class="flex flex-col text-start w-[60rem] des:w-[50rem] minDes:w-2/3 p-10 bg-[#faf6fc]/30 [&>*:not(button)]:text-center relative tab:col-end-1 tab:w-full tab:row-end-1 tab:bg-[#403B4A]/40 tab:backdrop-blur-md"
    >
      <loading v-show="loadingCheck"></loading>
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__bounceIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <div
          v-if="!categoryCheck"
          class="pop bg-[#faf6ee] rounded-md shadow-md w-1/2 self-center p-4 my-auto minDes:w-full"
        >
          <type-q @confrim="confrim"></type-q>
        </div>
        <div class="minDes:w-full" v-else-if="categoryCheck && !finish">
          <questions
            :api="apiData"
            :checkP="programmCheck"
            @finish-q="showResult"
          ></questions>
        </div>
        <div v-else-if="finish" class="minDes:w-full">
          <result :data="resultX"></result>
        </div>
      </transition>
      <button
        class="py-2 px-4 bg-red-500 self-end rounded-lg text-2xl text-white shadow-md hover:bg-red-600 transition-all active:scale-95 active:shadow-sm border-none outline-none mt-auto"
        @click="reset"
      >
        Reset
      </button>
    </div>
    <img
      class="bg-cover object-cover w-[40rem] h-[50rem] des:w-[30rem] des:h-[45rem] minDes:w-1/3 tab:col-end-1 tab:w-full tab:row-end-1 tab:h-full tab:max-h-[94vh] phone:max-h-[100vh]"
      :src="randomImg.url"
      :alt="randomImg.alt"
      @load="imgLoad"
    />
  </section>
</template>

<script>
import { setTransitionHooks } from "vue";
import questions from "./question.vue";
import result from "./result.vue";
import typeQ from "./type.vue";
import axios from "axios";
import loading from "./compnent-loading.vue";
export default {
  name: "formq",
  emits: ["imgLoad"],
  components: {
    result,
    questions,
    loading,
    typeQ,
  },
  data() {
    return {
      apiData: [],
      randomImg: {
        url: "",
        alt: "",
        color: "",
        blurHash: "",
      },
      finish: false,
      categoryCheck: false,
      programmCheck: false,
      resultX: "",
      loadingCheck: false,
    };
  },

  methods: {
    imgLoad(boolean) {
      this.$emit("imgLoad", boolean);
    },
    async generateQ(data) {
      if (data.category === "random") {
        const randomArray = [
          "generalKnowledge",
          "history",
          "politics",
          "sports",
          "programm",
        ];
        const randomNumber = Math.floor(Math.random() * 4);
        data.category = randomArray[randomNumber];
      }

      if (data.category === "programm") {
        await this.proggramQ();
        this.programmCheck = true;
      } else {
        this.programmCheck = false;
        const categoryNumber = {
          sports: 21,
          politics: 24,
          generalKnowledge: 9,
          history: 23,
        };
        let url = `https://opentdb.com/api.php?amount=5&category=${
          categoryNumber[data.category]
        }${
          data.difficulty !== "any" ? `&difficulty=${data.difficulty}` : ""
        }&type=multiple`;
        await this.mainQ(url);
      }

      this.finish = false;
      this.categoryCheck = true;
      this.loadingCheck = false;
    },
    async mainQ(url) {
      try {
        const response = await axios.get(url);
        this.apiData = response.data.results;
      } catch (error) {
        console.error(error);
      }
    },
    async proggramQ() {
      try {
        const response = await axios.get(
          "https://quizapi.io/api/v1/questions?apiKey=hFfuZZkOZjETopgieFOqDakqlM9SqSXMh0iAfVIA"
        );
        this.apiData = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async picImg() {
      const url =
        "https://api.unsplash.com/search/photos?query=neture&client_id=38-s608lnI47MW30SMKc4BBiq0fcuAJJeFRnWmwwsxs";
      try {
        const response = await axios.get(url);
        const results = response.data.results;
        const randomNumber = Math.floor(Math.random() * results.length);
        this.randomImg.url = results[randomNumber].urls.full;
        this.randomImg.alt = results[randomNumber]["alt_description"];
        this.randomImg.color = results[randomNumber].color;
        this.randomImg.blurHash = results[randomNumber]["blur_hash"];
      } catch (error) {
        console.error(error);
      }
    },
    async confrim(objectData) {
      this.loadingCheck = true;
      await this.generateQ(objectData);
    },
    showResult(result) {
      this.resultX = result;
      this.finish = true;
    },
    reset() {
      this.apiData = [];
      this.finish = false;
      this.categoryCheck = false;
    },
  },
  computed: {},
  async created() {
    await this.picImg();
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "Anton";
  font-family: "Hahmlet";
  font-family: "Lato";
  font-family: "Open Sans";
  font-family: "Roboto";
  src: url("https://fonts.googleapis.com/css2?family=Anton&family=Hahmlet:wght@300&family=Lato:wght@300;400;700;900&family=Open+Sans:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap")
    format("truetype");
}
</style>
