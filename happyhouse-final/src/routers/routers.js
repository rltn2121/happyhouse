import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "@/components/apt/Home.vue";

import Introduce from "@/components/Introduce.vue";
import Banking from "@/components/bank/Banking.vue";
import MyTransaction from "@/components/bank/MyTransaction.vue";
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
            name: "main",
            component: MainPage,
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
            name: "AptTrade",
            path: "/apt-trade",
            component: AptTrade,
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
            path: "/main",
            name: "Main",
            component: MainPage,
        },
        {
            path: "/my-money",
            component: MyMoney,
        },

        {
            path: "/boardList",
            name: "boardList",
            component: () => import("@/components/board/BoardList.vue"),
        },
        {
            path: "/boardRegister",
            name: "boardRegister",
            component: () => import("@/components/board/BoardRegister.vue"),
        },
        {
            path: "/boardDetail/:articleno",
            name: "boardDetail",
            component: () => import("@/components/board/BoardDetail.vue"),
        },
        {
            path: "/boardModify/:articleno",
            name: "boardModify",
            component: () => import("@/components/board/BoardModify.vue"),
        },
    ],
});
