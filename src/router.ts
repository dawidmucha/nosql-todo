import { createWebHistory, createRouter } from "vue-router";

import WelcomeView from "./views/WelcomeView.vue";
import RegisterView from "./views/RegisterView.vue";
import DashboardView from "./views/DashboardView.vue";

const routes = [
  { path: '/register', component: RegisterView },
  { path: '/dashboard', component: DashboardView },
  { path: '/', component: WelcomeView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router