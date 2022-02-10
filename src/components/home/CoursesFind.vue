<template>
  <div class="find-a-course">
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

import categories from "@/data/categories.json";

export default defineComponent({
  data() {
    return {
      categories,
    };
  },
});
</script>

<style lang="scss" scoped>
.find-a-course {
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
</style>
