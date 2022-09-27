import { createRouter, createWebHistory } from "vue-router";
import HomeGame from "../views/HomeGame.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/simon-game"
    },
    {
      path: "/simon-game",
      component: HomeGame
    },
    {
      path: "/simon-game-play",
      component: () => import("@/views/Game.vue")
    },
    {
      path: "/:wild(.*)",
      redirect: "/"
    }
  ],
});

export default router;
