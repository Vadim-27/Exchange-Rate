import { createRouter, createWebHistory } from "vue-router";
import { ROUTES_PATHS } from "../contacts/index";
import Home from "../pages/Home.vue";
import ExchangeRate from "../pages/ExchangeRate.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATHS.HOME,
      name: ROUTES_PATHS.HOME,
      component: Home,
    },
    {
      path: ROUTES_PATHS.EXCHANGE_RATE,
      name: ROUTES_PATHS.EXCHANGE_RATE,
      component: ExchangeRate,
    },
    {
      path: "/:pathMatch(.*)",
      name: "NotFoundPage",
      component: NotFoundPage,
    },
  ],
});

export default router;
