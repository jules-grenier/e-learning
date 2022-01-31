<template>
  <div class="courses-suggestions" v-if="suggestedCourses.length > 0">
    <h2>Formations que vous pourriez aimer</h2>
    <div class="suggested-courses-list">
      <swiper :slides-per-view="slidesPerView" :space-between="60" navigation loop>
        <swiper-slide v-for="course in suggestedCourses" :key="course.id">
          <CourseCard type="showcase" :course="course" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation } from "swiper/core";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

import CourseCard from "@/components/CourseCard.vue";

SwiperCore.use([Navigation]);

export default defineComponent({
  components: { Swiper, SwiperSlide, CourseCard },
  data() {
    return {
      suggestedCourses: [],
    };
  },
  async mounted() {
    await this.$store.dispatch("courses/fetchCourses");

    this.$nextTick(() => {
      this.suggestedCourses = this.$store.getters["courses/list"];
    });
  },
  computed: {
    slidesPerView(): number {
      let nbSlides = 1;

      if (this?.suggestedCourses.length > 0 && this?.suggestedCourses.length < 3) {
        nbSlides = this?.suggestedCourses.length;
      }

      if (this?.suggestedCourses.length >= 3) {
        nbSlides = 3;
      }

      return nbSlides;
    },
  },
});
</script>

<style lang="scss">
.courses-suggestions {
  margin-top: 80px;

  h2 {
    margin-bottom: 30px;
  }
}
</style>
