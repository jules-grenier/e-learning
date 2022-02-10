import { createStore } from "vuex";

import auth from "./modules/auth";
import courses from "./modules/courses";
import cart from "./modules/cart";
import user from "./modules/user";

const store = createStore({
  modules: {
    auth,
    courses,
    cart,
    user,
  },
});

export default store;
