<template>
  <LayoutTopSpace>
    <h1>Mon apprentissage</h1>

    <section class="courses">
      <course-owned v-for="course in courses" :key="course.id" :course="course" size="small" />
    </section>
  </LayoutTopSpace>
</template>

<script lang="ts">
import { defineComponent, VuexState } from "vue";
import { mapState } from "vuex";

import { LayoutTopSpace } from "@/layouts";
import CourseOwned from "@/components/shared/Course/CourseOwned.vue";

export default defineComponent({
  components: { LayoutTopSpace, CourseOwned },
  computed: {
    ...mapState({
      courses: (state) => (state as VuexState).user.courses,
    }),
  },
  async mounted() {
    const rawUser = localStorage.getItem("user");

    if (rawUser) {
      const token = JSON.parse(rawUser).token;
      await this.$store.dispatch("user/fetchCourses", token);
    }
  },
});
</script>

<style lang="scss" scoped>
section {
  margin-top: 80px;
}
</style>
