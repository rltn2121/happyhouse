import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "@/components/apt/Home.vue";
// import Login from "@/components/Login.vue";
// import User from "@/components/User.vue";
// import Register from "@/components/Register.vue";
// import NavBar from "@/components/NavBar.vue";
// import Pagination from "@/components/Pagination.vue";
export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
  ],
});
