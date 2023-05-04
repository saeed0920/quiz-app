<template>
  <section class="flex rounded-3xl overflow-hidden shadow-md">
    <div
      class="flex flex-col text-start w-2/3 p-10 bg-[#faf6fc]/30 [&>*:not(button)]:text-center"
    >
      <div class="w-52 h-52"></div>
      <button @click="categoryCheck = false">click de</button>
      <transition name="popup">
        <div
          v-if="!categoryCheck"
          class="pop fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg"
        >
          <type-q @confrim="confrim"></type-q>
        </div>
      </transition>
      <transition
        name="load"
        enter-active-class="animate__animated animate__jackInTheBox"
        leave-active-class="animate__animated animate__hinge"
      >
        <div v-if="load">
          <questions></questions>
        </div>
      </transition>
      <transition name="load" appear>
        <div v-if="load">
          <result></result>
        </div>
      </transition>
    </div>
    <img
      class="bg-cover object-cover w-1/3 min-h-[48rem]"
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
      randomImg: {
        url: "",
        alt: "",
        color: "",
        blurHash: "",
      },
      apiData: [],

      categoryCheck: false,
      load: false,
    };
  },

  methods: {
    generateQ(data) {
      if (data.category === "random") {
        const randomArray = [
          "generalKnowledge",
          "history",
          "politics",
          "sprots",
          "programm",
        ];
        const randomNumber = Math.floor(Math.random() * randomArray.length);
        data.category = randomArray[randomNumber];
      }

      if (data.category === "programm") {
        this.proggramQ();
      } else {
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
        this.mainQ(url);
      }
    },
    async mainQ(url) {
      try {
        const response = await axios.get(url);
        this.apiData = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async proggramQ() {
      try {
        const response = await axios.get(
          "https://quizapi.io/api/v1/questions",
          {
            params: {
              apiKey: "hFfuZZkOZjETopgieFOqDakqlM9SqSXMh0iAfVIA",
              limit: 5,
            },
          }
        );
        this.apiData = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    confrim(objectData) {
      this.categoryCheck = !this.categoryCheck;
      this.generateQ(objectData);
      this.categoryCheck = true;
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
