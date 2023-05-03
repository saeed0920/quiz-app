<template>
  <section class="flex rounded-3xl overflow-hidden shadow-md">
    <div
      class="flex flex-col text-start w-2/3 p-10 bg-[#faf6fc]/30 ] [&>*:not(button)]:text-center"
    >
      <button @click="load = !load">click m</button>
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
      :src="randomImg"
      alt="img"
    />
  </section>
</template>

<script>
import img1 from "@/assets/img-1.jpg";
import img2 from "@/assets/img-2.jpg";
import img3 from "@/assets/img-3.jpg";

import questions from "./question.vue";
import result from "./result.vue";

export default {
  name: "formq",
  components: {
    result,
    questions,
  },
  data() {
    return {
      imgS: [img1, img2, img3],
      randomImg: "",
      load: false,
    };
  },
  methods: {
    picImg() {
      const randomNumber = Math.floor(Math.random() * this.imgS.length);
      return this.imgS[randomNumber];
    },
  },
  created() {
    this.randomImg = this.picImg();
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
