<template>
  <div id="app">
    <!-- <Login></Login>
    <Home></Home> -->
    <apt-detail-modal-test></apt-detail-modal-test>
    <!-- <nav-bar></nav-bar> -->
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";
import Market from "./components/apt/Market.vue";
import AptDetailModalTest from "./components/test/AptDetailModalTest.vue";
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: {
    Login,
    Home,
    Market,
    AptDetailModalTest,
    NavBar,
  },
};
</script>

<style></style>
