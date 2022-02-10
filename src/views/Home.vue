<template>
  <LayoutDefault>
    <Carousel />

    <section v-if="!userIsAuthenticated || (userIsAuthenticated && (!userCourses || !userCourses.length))">
      <h2>Trouvez <i>la</i> formation qui vous correspond !</h2>
      <CoursesFind />
    </section>

    <section v-if="userIsAuthenticated && userOngoingCourses.length > 0">
      <h2>Poursuivre mes formations</h2>
      <CoursesOngoing :courses="userOngoingCourses" />
    </section>

    <section v-if="userIsAuthenticated && userCoursesToStart.length > 0">
      <h2>Vos formations non débutées</h2>
      <CoursesToStart :courses="userCoursesToStart" />
    </section>

    <section v-if="userIsAuthenticated && userCourseSuggestions.length > 0">
      <h2>Formations que vous pourriez aimer</h2>
      <CoursesSuggestions :courses="userCourseSuggestions" />
    </section>
  </LayoutDefault>
</template>

<script lang="ts">
import { defineComponent, VuexState } from "vue";

import { LayoutDefault } from "@/layouts";
import Carousel from "@/components/Carousel.vue";
import CoursesFind from "@/components/home/CoursesFind.vue";
import CoursesOngoing from "@/components/home/CoursesOngoing.vue";
import CoursesToStart from "@/components/home/CoursesToStart.vue";
import CoursesSuggestions from "@/components/home/CoursesSuggestions.vue";

import { Course, UserCourse } from "@/types/courses";
import { mapState } from "vuex";

type DataTypes = {
  userCoursesToStart: UserCourse[];
  userOngoingCourses: UserCourse[];
  userCourseSuggestions: Course[];
  [key: string]: unknown;
};

export default defineComponent({
  components: { LayoutDefault, Carousel, CoursesFind, CoursesOngoing, CoursesToStart, CoursesSuggestions },
  data(): DataTypes {
    return {
      userCoursesToStart: [],
      userOngoingCourses: [],
      userCourseSuggestions: [],
      showFindCourses: false,
    };
  },
  watch: {
    userIsAuthenticated: {
      handler: function () {
        this.loadCourses();
      },
      deep: true,
    },
    allCourses: {
      handler: function () {
        this.loadCourses();
      },
      deep: true,
    },
    userCourses: {
      handler: function () {
        this.loadCourses();
      },
      deep: true,
    },
  },
  computed: {
    ...mapState({
      userIsAuthenticated: (state) => (state as VuexState).auth.isAuthenticated,
      allCourses: (state) => (state as VuexState).courses.items,
      userCourses: (state) => (state as VuexState).user.courses,
    }),
  },
  methods: {
    loadCourses() {
      const userCourseIds = this.userCourses.map((course: UserCourse) => course.id);
      this.userCoursesToStart = this.userCourses.filter((course: UserCourse) => {
        return !course.ongoing && !course.finished;
      });
      this.userOngoingCourses = this.userCourses.filter((course: UserCourse) => course.ongoing);
      this.userCourseSuggestions = this.allCourses.filter((course: Course) => !userCourseIds.includes(course.id));
    },
  },
  async mounted() {
    const rawUser = localStorage.getItem("user");

    if (rawUser) {
      const token = JSON.parse(rawUser).token;
      await this.$store.dispatch("user/fetchCourses", token);
    }

    await this.$store.dispatch("courses/fetchCourses");
  },
});
</script>

<style lang="scss" scoped>
section {
  margin-top: 80px;

  h2 {
    margin-bottom: 30px;
  }
}
</style>
