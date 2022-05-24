import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "@/components/apt/Home.vue";

import User from "@/components/user/User.vue";
import Board from "@/components/board/BoardMain.vue";
import Introduce from "@/components/Introduce.vue";
import Banking from "@/components/bank/Banking.vue";
import MyTransaction from "@/components/bank/MyTransaction.vue";
import Register from "@/components/user/Register.vue";
import AptTrade from "@/components/apt/AptTrade.vue";
import MainPage from "@/components/MainPage.vue";
import MyMoney from "@/components/user/MyMoney.vue";
// https://router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
  // console.log(store);
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const getUserInfo = store._actions["memberStore/getUserInfo"];
  let token = sessionStorage.getItem("access-token");
  if (checkUserInfo == null && token) {
    await getUserInfo(token);
  }
  if (checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    next({ name: "signIn" });
    // router.push({ name: "signIn" });
  } else {
    // console.log("로그인 했다.");
    next();
  }
};
export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "signIn",
      component: () => import("@/components/user/MemberLogin.vue"),
    },
    {
      name: "User",
      path: "/test",
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
      name: "Register",
      path: "/register",
      component: Register,
    },
    {
      name: "AptTrade",
      path: "/apt-trade",
      component: AptTrade,
    },
    {
      path: "/user",
      name: "user",
      component: () => import("@/views/MemberView.vue"),
    },
    {
      path: "/user/signin",
      name: "signIn",
      component: () => import("@/components/user/MemberLogin.vue"),
    },
    {
      path: "/main",
      name: "Main",
      component: MainPage,
    },
    {
      path: "/my-money",
      component: MyMoney,
    },
  ],
});
