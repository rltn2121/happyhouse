<template>
  <div id="app">
    <nav-bar />
    <!-- <router-view></router-view> -->
    <!-- <home></home> -->
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";
import Market from "./components/apt/Market.vue";
import AptDetailModalTest from "./components/test/AptDetailModalTest.vue";
import NavBar from "./components/NavBar.vue";
import AptDetailModal from "./components/modals/AptDetailModal.vue";
import MyMoney from "./components/MyMoney.vue";
export default {
  name: "App",
  components: {
    Login,
    Home,
    Market,
    AptDetailModalTest,
    AptDetailModal,
    NavBar,
    MyMoney,
  },
};
</script>

<style></style>
