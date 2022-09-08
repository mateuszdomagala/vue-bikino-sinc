import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("../views/CategoriesView.vue"),
    },
    {
      path: "/shop",
      name: "shop",
      component: () => import("../views/ShopView.vue"),
    },
    {
      path: "/shop/:id",
      name: "product",
      component: () => import("../views/ProductView.vue"),
      props: true,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("../views/CheckoutView.vue"),
      props: true,
    },
    {
      path: "/confirmation",
      name: "confirmation",
      component: () => import("../views/ConfirmationView.vue"),
      props: true,
    },
    {
      path: "/404",
      name: "404",
      component: () => import("../views/NotFoundView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      redirect: "/404",
    },
  ],
});

export default router;
