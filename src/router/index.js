import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home.vue";
import About from "../components/About.vue";
import Login from "../components/Login.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/login", component: Login },
];

const router = new createRouter({
  history: createWebHistory(),
  routes,
});

export default router
