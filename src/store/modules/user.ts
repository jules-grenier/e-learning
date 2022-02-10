import axios from "axios";
import { UserState } from "vue";
import { GetterTree, MutationTree, ActionTree } from "vuex";

import { UserActions, UserGetters, UserMutations } from "@/types/vuex";

const state = {
  courses: [],
  error: "",
};

const getters: GetterTree<UserState, unknown> & UserGetters = {
  courses(state) {
    return state.courses;
  },
  error(state) {
    return state.error;
  },
};

const mutations: MutationTree<UserState> & UserMutations = {
  setCourses(state, courses) {
    state.courses = courses;
  },
  setError(state, error) {
    state.error = error;
  },
};

const actions: ActionTree<UserState, unknown> & UserActions = {
  async fetchCourses(context, token) {
    let courses;

    try {
      const res = await axios.get("http://localhost:8090/user/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      courses = res.data;
    } catch (error) {
      console.error("Failed to fetch courses.", error);

      return undefined;
    }

    context.commit("setCourses", courses);

    return courses;
  },
};

const userModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default userModule;
