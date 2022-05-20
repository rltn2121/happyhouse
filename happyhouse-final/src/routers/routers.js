import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "@/components/apt/Home.vue";
import Login from "@/components/user/Login.vue";
import MainPage from "@/components/MainPage.vue";
import MyTransaction from "@/components/bank/MyTransaction.vue";
import LoanDeposit from "@/components/bank/LoanDeposit.vue";
// import User from "@/components/User.vue";
// import Register from "@/components/Register.vue";
// import Pagination from "@/components/Pagination.vue";
export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/main",
      name: "Main",
      component: MainPage,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/my-transaction",
      name: "MyTransaction",
      component: MyTransaction,
    },
    {
      path: "/loan-deposit",
      name: "LoanDeposit",
      component: LoanDeposit,
    },
  ],
});
