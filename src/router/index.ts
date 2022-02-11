import { createRouter, createWebHistory } from "vue-router";

import {
  Home,
  Register,
  Login,
  Courses,
  MyCourses,
  CourseCreate,
  CourseOverview,
  CourseLearn,
  Cart,
  Checkout,
  PaymentSuccess,
  PageNotFound,
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
    name: "CourseOverview",
    path: "/course/overview/:id",
    component: CourseOverview,
  },
  {
    name: "CourseLearn",
    path: "/course/learn/:id",
    component: CourseLearn,
  },
  {
    name: "MyCourses",
    path: "/my-courses",
    component: MyCourses,
  },
  {
    name: "CourseCreate",
    path: "/teacher/create-course",
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
  {
    name: "PageNotFound",
    path: "/:pathMatch(.*)",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
