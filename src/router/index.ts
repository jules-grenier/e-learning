import { createRouter, createWebHistory } from "vue-router";

import { Home, Register, Login, Courses, MyCourses, CourseCreate } from "@/views";

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
  {
    name: "CreateCourse",
    path: "/teacher/create",
    component: CourseCreate,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
