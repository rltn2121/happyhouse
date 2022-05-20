import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "@/components/apt/Home.vue";

import User from "@/components/user/User.vue";
import Board from "@/components/board/BoardMain.vue";
import Introduce from "@/components/Introduce.vue";
// import Login from "@/components/Login.vue";
// import Register from "@/components/Register.vue";
export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      name: "User",
      path: "/user",
      component: User,
    },
    {
      name: "Board",
      path: "/board",
      component: Board,
    },
    {
      name: "Introduce",
      path: "/introduce",
      component: Introduce,
    },
  ],
});
