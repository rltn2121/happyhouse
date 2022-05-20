import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "@/components/apt/Home.vue";

import User from "@/components/user/User.vue";
import Board from "@/components/board/BoardMain.vue";
import Introduce from "@/components/Introduce.vue";
import Banking from "@/components/bank/Banking.vue";
import MyTransaction from "@/components/bank/MyTransaction.vue";
import Login from "@/components/user/Login.vue";
import Register from "@/components/user/Register.vue";
import AptTrade from "@/components/apt/AptTrade.vue";
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
    {
      name: "Home",
      path: "/apt-search",
      component: Home,
    },
    {
      name: "MyTransaction",
      path: "/my-transaction",
      component: MyTransaction,
    },
    {
      name: "Banking",
      path: "/banking",
      component: Banking,
    },
    {
      name: "Login",
      path: "/login",
      component: Login,
    },
    {
      name: "Register",
      path: "/register",
      component: Register,
    },
    {
      name: "AptTrade",
      path: "/apt-trade",
      component: AptTrade,
    },
  ],
});
