<template>
  <div class="courses-suggestions">
    <swiper v-if="courses.length > 1" :slides-per-view="slidesPerView" :space-between="60" navigation loop>
      <swiper-slide v-for="course in courses" :key="course.id">
        <CourseCard type="showcase" :course="course" />
      </swiper-slide>
    </swiper>

    <CourseCard v-if="courses.length === 1" type="showcase" :course="courses[0]" />
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
