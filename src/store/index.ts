import { createStore } from "vuex";

import auth from "./modules/auth";
import courses from "./modules/courses";
import cart from "./modules/cart";

const store = createStore({
  modules: {
    auth,
    courses,
    cart,
  },
});

export default store;
