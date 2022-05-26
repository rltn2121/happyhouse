import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/store.js";

Vue.use(VueRouter);

import Home from "@/components/apt/Home.vue";
import Introduce from "@/components/Introduce.vue";
import MyTransaction from "@/components/bank/MyTransaction.vue";
import AptTrade from "@/components/apt/AptTrade.vue";
import MainPage from "@/components/MainPage.vue";
import MyMoney from "@/components/user/MyMoney.vue";
import signIn from "@/components/user/MemberLogin.vue";
import myPage from "@/components/user/MemberMyPage.vue";
import myPageUpdate from "@/components/user/MemberMyPageUpdate.vue";
import Register from "@/components/user/MemberRegister.vue";
import boardList from "@/components/board/BoardList.vue";
import boardRegister from "@/components/board/BoardRegister.vue";
import boardDetail from "@/components/board/BoardDetail.vue";
import boardModify from "@/components/board/BoardModify.vue";
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
            name: "AptTrade",
            path: "/apt-trade",
            component: AptTrade,
            beforeEnter: onlyAuthUser,
        },
        {
            path: "/user/signin",
            name: "signIn",
            component: signIn,
        },
        {
            path: "/user/mypage",
            name: "myPage",
            component: myPage,
        },
        {
            path: "/user/mypageupdate",
            name: "myPageUpdate",
            component: myPageUpdate,
        },
        {
            path: "/user/register",
            name: "Register",
            component: Register,
        },

        {
            path: "/my-money",
            name: "MyMoney",
            component: MyMoney,
        },

        {
            path: "/boardList",
            name: "boardList",
            component: boardList,
            beforeEnter: onlyAuthUser,
        },
        {
            path: "/boardRegister",
            name: "boardRegister",
            component: boardRegister,
            beforeEnter: onlyAuthUser,
        },
        {
            path: "/boardDetail/:articleno",
            name: "boardDetail",
            component: boardDetail,
            beforeEnter: onlyAuthUser,
        },
        {
            path: "/boardModify/:articleno",
            name: "boardModify",
            component: boardModify,
            beforeEnter: onlyAuthUser,
        },
    ],
});
