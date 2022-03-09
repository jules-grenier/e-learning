<template>
  <div class="courses-to-start">
    <swiper :slides-per-view="slidesPerView" :space-between="60" navigation>
      <swiper-slide v-for="course in courses" :key="course.id">
        <course-owned size="small" :course="course" :showProgress="false" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation } from "swiper/core";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

import CourseOwned from "../shared/Course/CourseOwned.vue";

SwiperCore.use([Navigation]);

export default defineComponent({
  props: ["courses"],
  components: { Swiper, SwiperSlide, CourseOwned },
  computed: {
    slidesPerView(): number {
      let nbSlides = 1;

      if (this.courses.length > 0 && this.courses.length < 3) {
        nbSlides = this.courses.length;
      }

      if (this.courses.length >= 3) {
        nbSlides = 3;
      }

      return nbSlides;
    },
  },
});
</script>

<style lang="scss" scoped></style>
