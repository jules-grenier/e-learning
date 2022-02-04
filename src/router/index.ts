import { createRouter, createWebHistory } from "vue-router";

import {
  Home,
  Register,
  Login,
  Courses,
  MyCourses,
  CourseCreate,
  Course,
  Cart,
  Checkout,
  PaymentSuccess,
} from "@/views";

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
    name: "Course",
    path: "/courses/:id",
    component: Course,
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
  {
    name: "Cart",
    path: "/cart",
    component: Cart,
  },
  {
    name: "Checkout",
    path: "/cart/checkout",
    component: Checkout,
  },
  {
    name: "PaymentSuccess",
    path: "/payment/success",
    component: PaymentSuccess,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
