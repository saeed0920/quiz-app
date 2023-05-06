<template>
  <section class="flex rounded-3xl overflow-hidden shadow-md">
    <div
      class="flex flex-col text-start w-[60rem] p-10 bg-[#faf6fc]/30 [&>*:not(button)]:text-center relative"
    >
      <div
        class="animate-spin bg-transparent rounded-full absolute loading-test"
      ></div>
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__flipInX"
        leave-active-class="animate__animated animate__flipOutX"
      >
        <div
          v-if="!categoryCheck"
          class="pop bg-[#faf6ee] rounded-md shadow-md w-1/2 self-center p-4 my-auto"
        >
          <type-q @confrim="confrim"></type-q>
        </div>
        <div v-else-if="categoryCheck && !finish">
          <questions
            :api="apiData"
            :checkP="programmCheck"
            @finish-q="showResult"
          ></questions>
        </div>
        <div v-else-if="finish">
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
      class="bg-cover object-cover w-[40rem] h-[50rem]"
      :src="randomImg.url"
      :alt="randomImg.alt"
    />
  </section>
</template>

<script>
import { setTransitionHooks } from "vue";
import questions from "./question.vue";
import result from "./result.vue";
import typeQ from "./type.vue";
import axios from "axios";

export default {
  name: "formq",
  components: {
    result,
    questions,

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
    };
  },

  methods: {
    async generateQ(data) {
      if (data.category === "random") {
        const randomArray = [
          "generalKnowledge",
          "history",
          "politics",
          "sports",
          "programm",
        ];
        const randomNumber = Math.floor(Math.random() * randomArray.length);
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
      await this.generateQ(objectData);
    },
    showResult(result) {
      this.resultX = result;
      this.finish = true;
    },
    reset() {
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

.loading-test {
  border: rgba(white, 0.5) 5px solid;
  border-top: 5px solid green;
  width: 4rem;
  height: 4rem;
}
</style>
