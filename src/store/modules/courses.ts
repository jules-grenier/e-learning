import axios from "axios";
import { CoursesState } from "vue";
import { GetterTree, MutationTree, ActionTree } from "vuex";

import { CoursesActions, CoursesGetters, CoursesMutations } from "@/types/vuex";
import { Course } from "@/types/courses";

const state = {
  items: [],
  error: "",
};

const getters: GetterTree<CoursesState, unknown> & CoursesGetters = {
  list(state) {
    return state.items;
  },
  error(state) {
    return state.error;
  },
};

const mutations: MutationTree<CoursesState> & CoursesMutations = {
  setCourses(state, courses) {
    state.items = courses;
  },
  setError(state, error) {
    state.error = error;
  },
};

const actions: ActionTree<CoursesState, unknown> & CoursesActions = {
  async fetchCourses(context) {
    let courses;

    try {
      const res = await axios.get("http://localhost:8090/courses");
      courses = res.data;
    } catch (error) {
      console.error("Failed to fetch courses.", error);

      return undefined;
    }

    context.commit("setCourses", courses);

    return courses;
  },
  getCourse(context, courseId) {
    return context.state.items.find((course: Course) => course.id === courseId);
  },
};

const CoursesModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default CoursesModule;
