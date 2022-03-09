<template>
  <div class="courses-suggestions">
    <swiper v-if="courses.length > 1" :slides-per-view="slidesPerView" :space-between="60" navigation loop>
      <swiper-slide v-for="course in courses" :key="course.id">
        <course-showcase type="showcase" :course="course" />
      </swiper-slide>
    </swiper>

    <course-showcase v-if="courses.length === 1" type="showcase" :course="courses[0]" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation } from "swiper/core";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

import CourseShowcase from "@/components/shared/Course/CourseShowcase.vue";

SwiperCore.use([Navigation]);

export default defineComponent({
  components: { Swiper, SwiperSlide, CourseShowcase },
  props: ["courses"],
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
