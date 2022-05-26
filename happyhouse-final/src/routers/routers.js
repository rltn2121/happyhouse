import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/store.js";

Vue.use(VueRouter);

import Home from "@/components/apt/Home.vue";
import Introduce from "@/components/Introduce.vue";
import Banking from "@/components/bank/Banking.vue";
import MyTransaction from "@/components/bank/MyTransaction.vue";
import AptTrade from "@/components/apt/AptTrade.vue";
import MainPage from "@/components/MainPage.vue";
import MyMoney from "@/components/user/MyMoney.vue";
// https://router.vuejs.org/kr/guide/advanced/navigation-guards.html
import jwt_decode from "jwt-decode";
const onlyAuthUser = async (to, from, next) => {
  if (sessionStorage.getItem("access-token") == null) {
    alert("로그인이 필요한 페이지입니다..");
    next({ name: "signIn" });
  } else {
    // alert("로그인 했다.");
    next();
  }
};
export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "main",
      component: MainPage,
      beforeEnter: onlyAuthUser,
    },
    {
      path: "/main",
      name: "Main",
      component: MainPage,
      beforeEnter: onlyAuthUser,
    },
    {
      name: "Introduce",
      path: "/introduce",
      component: Introduce,
      beforeEnter: onlyAuthUser,
    },
    {
      name: "Home",
      path: "/apt-search",
      component: Home,
      beforeEnter: onlyAuthUser,
    },
    {
      name: "MyTransaction",
      path: "/my-transaction",
      component: MyTransaction,
      beforeEnter: onlyAuthUser,
    },
    {
      name: "Banking",
      path: "/banking",
      component: Banking,
    },
    {
      name: "AptTrade",
      path: "/apt-trade",
      component: AptTrade,
      beforeEnter: onlyAuthUser,
    },
    {
      path: "/user/signin",
      name: "signIn",
      component: () => import("@/components/user/MemberLogin.vue"),
    },
    {
      path: "/user/mypage",
      name: "myPage",
      component: () => import("@/components/user/MemberMyPage.vue"),
    },
    {
      path: "/user/register",
      name: "Register",
      component: () => import("@/components/user/MemberRegister.vue"),
    },

    {
      path: "/my-money",
      component: MyMoney,
    },

    {
      path: "/boardList",
      name: "boardList",
      component: () => import("@/components/board/BoardList.vue"),
      beforeEnter: onlyAuthUser,
    },
    {
      path: "/boardRegister",
      name: "boardRegister",
      component: () => import("@/components/board/BoardRegister.vue"),
      beforeEnter: onlyAuthUser,
    },
    {
      path: "/boardDetail/:articleno",
      name: "boardDetail",
      component: () => import("@/components/board/BoardDetail.vue"),
      beforeEnter: onlyAuthUser,
    },
    {
      path: "/boardModify/:articleno",
      name: "boardModify",
      component: () => import("@/components/board/BoardModify.vue"),
      beforeEnter: onlyAuthUser,
    },
  ],
});
