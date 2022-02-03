<template>
  <div class="find-a-course" v-if="!ongoingCourses || !ongoingCourses.length">
    <h2>Parcourez la liste des formations et trouver celle qui vous correspond !</h2>
    <div class="course-categories">
      <router-link
        :to="{ name: 'Courses', query: { c: category.slug } }"
        class="course-category"
        v-for="category in categories"
        :key="category.id"
      >
        <h4>{{ category.name }}</h4>
      </router-link>
    </div>
  </div>
  <div class="ongoing-courses" v-if="ongoingCourses.length > 0">
    <h2>Poursuivre mes formations</h2>
    <div class="ongoing-courses-list">
      <swiper :slides-per-view="slidesPerView" :space-between="60" navigation loop>
        <swiper-slide v-for="course in ongoingCourses" :key="course.id">
          <CourseCard type="ongoing" :course="course" />
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

import courses from "@/data/my-courses.json";
import categories from "@/data/categories.json";

SwiperCore.use([Navigation]);

export default defineComponent({
  components: { Swiper, SwiperSlide, CourseCard },
  data() {
    return {
      ongoingCourses: courses,
      categories,
    };
  },
  computed: {
    slidesPerView(): number {
      let nbSlides = 1;

      if (this?.ongoingCourses.length > 0 && this?.ongoingCourses.length < 3) {
        nbSlides = this?.ongoingCourses.length;
      }

      if (this?.ongoingCourses.length >= 3) {
        nbSlides = 3;
      }

      return nbSlides;
    },
  },
});
</script>

<style lang="scss" scoped>
.find-a-course {
  margin-top: 80px;

  h2 {
    margin-bottom: 30px;
  }

  .course-categories {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 60px;

    .course-category {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 400px;
      height: 130px;
      padding: 20px;
      text-align: center;
      text-decoration: none;
      color: var(--color-black);
      background-color: var(--color-grey-2);
      border-radius: var(--border-radius);

      &:hover {
        background-color: var(--color-blue);
        color: var(--color-white);
        box-shadow: var(--shadow-hover);
      }
    }
  }
}

.ongoing-courses {
  margin-top: 80px;

  h2 {
    margin-bottom: 30px;
  }
}
</style>
