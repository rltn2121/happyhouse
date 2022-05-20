import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "@/components/Home.vue";
import User from "@/components/User.vue";

import Register from "@/components/Register.vue";

export default new VueRouter({
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            name: "Register",
            path: "/register",
            component: Register,
        },
        {
            name: "User",
            path: "/U=user",
            component: User,
        },
    ],
});
