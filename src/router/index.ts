import { createRouter, createWebHistory } from "vue-router";

import { Home, Register, Login, Courses, MyCourses } from "@/views";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Register",
    path: "/register",
    component: Register,
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
  },
  {
    name: "Courses",
    path: "/courses",
    component: Courses,
  },
  {
    name: "MyCourses",
    path: "/my-courses",
    component: MyCourses,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
