<template>
  <LayoutDefault>
    <Carousel />
    <OngoingCourses v-if="$store.getters['auth/isAuthenticated']" />
    <CoursesSuggestions />
  </LayoutDefault>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { LayoutDefault } from "@/layouts";
import Carousel from "@/components/Carousel.vue";
import OngoingCourses from "@/components/home/OngoingCourses.vue";
import CoursesSuggestions from "@/components/home/CoursesSuggestions.vue";

export default defineComponent({
  components: { LayoutDefault, Carousel, OngoingCourses, CoursesSuggestions },
});
</script>

<style lang="scss" scoped></style>
