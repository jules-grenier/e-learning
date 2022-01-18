import axios, { AxiosError } from "axios";
import { AuthState } from "vue";
import { GetterTree, MutationTree, ActionTree } from "vuex";

import { AuthActions, AuthGetters, AuthMutations } from "@/types/vuex";

const state = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  role: "",
  token: "",
  error: "",
  isAuthenticated: false,
};

const getters: GetterTree<AuthState, unknown> & AuthGetters = {
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  user(state) {
    const user = {
      id: state.id,
      firstname: state.firstname,
      lastname: state.lastname,
      email: state.email,
      role: state.role,
      token: state.token,
    };

    return user;
  },
  token(state) {
    return state.token;
  },
  error(state) {
    return state.error;
  },
};

const mutations: MutationTree<AuthState> & AuthMutations = {
  setAuthentication(state, credentials) {
    state.id = credentials.id;
    state.firstname = credentials.firstname;
    state.lastname = credentials.lastname;
    state.email = credentials.email;
    state.role = credentials.role;
    state.token = credentials.token;
    state.isAuthenticated = true;

    localStorage.setItem("user", JSON.stringify(credentials));
  },
  resetAuthentication(state) {
    state.id = "";
    state.firstname = "";
    state.lastname = "";
    state.email = "";
    state.role = "";
    state.token = "";
    state.error = "";
    state.isAuthenticated = false;

    localStorage.removeItem("user");
  },
  setError(state, error) {
    state.error = error;
  },
};

const actions: ActionTree<AuthState, unknown> & AuthActions = {
  async retrieveProfile(context, token) {
    let res;

    try {
      res = await axios.get("http://localhost:8090/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      console.error("Failed to fetch user.", error);
      context.commit("resetAuthentication", undefined);

      return undefined;
    }

    const credentials = { ...res.data.user, token };

    context.commit("setAuthentication", credentials);

    return credentials;
  },
  async register(context, userCredentials) {
    try {
      const res = await axios.post("http://localhost:8090/user/register", userCredentials);
      const { token, user } = res.data;
      const credentials = {
        ...user,
        token,
      };

      context.commit("setAuthentication", credentials);
      context.commit("setError", "");
    } catch (error) {
      context.commit("setError", "An error occurred on the server. Try again later");
      throw new Error("An error occurred on the server. Try again later");
    }
  },
  async login(context, userCredentials) {
    try {
      const res = await axios.post("http://localhost:8090/user/login", userCredentials);
      const { token, user } = res.data;
      const credentials = {
        ...user,
        token,
      };

      context.commit("setAuthentication", credentials);
      context.commit("setError", "");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if ((error as AxiosError)?.response?.status === 401) {
        context.commit("setError", "E-mail ou mot de passe incorrect");
        throw new Error("E-mail ou mot de passe incorrect");
      }

      context.commit("setError", "An error occurred on the server. Try again later");
      throw new Error("An error occurred on the server. Try again later");
    }
  },
  logout(context) {
    context.commit("resetAuthentication", undefined);
  },
};

const authModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default authModule;
