import { CartState } from "vue";
import { GetterTree, MutationTree, ActionTree } from "vuex";

import { CartActions, CartGetters, CartMutations } from "@/types/vuex";
import { CartItem } from "@/types/cart";

const state: CartState = {
  items: [],
  error: "",
};

const getters: GetterTree<CartState, unknown> & CartGetters = {
  list(state) {
    return state.items;
  },
  length(state) {
    return state.items.length;
  },
  error(state) {
    return state.error;
  },
};

const mutations: MutationTree<CartState> & CartMutations = {
  setList(state, list) {
    state.items = list;
  },
  setItem(state, item) {
    state.items.push(item);
  },
  deleteItem(state, item) {
    state.items.forEach((cartItem: CartItem, index: number) => {
      if (cartItem.id === item.id) {
        state.items.splice(index, 1);
      }
    });
  },
  emptyList(state) {
    state.items = [];
  },
  setError(state, error) {
    state.error = error;
  },
};

const actions: ActionTree<CartState, unknown> & CartActions = {
  set(context) {
    const rawList = localStorage.getItem("cart");

    if (rawList) {
      const list = JSON.parse(rawList);
      context.commit("setList", list);
    }
  },
  add(context, item) {
    context.commit("setItem", item);
    localStorage.setItem("cart", JSON.stringify(context.state.items));
  },
  remove(context, item) {
    context.commit("deleteItem", item);
    localStorage.setItem("cart", JSON.stringify(context.state.items));
  },
  isInCart(context, item) {
    return !!context.state.items.find((course: CartItem) => item.id === course.id);
  },
  empty(context) {
    context.commit("emptyList", null);
    localStorage.removeItem("cart");
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
