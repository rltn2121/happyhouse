<template>
  <div id="app">
    <!-- <Login></Login>
    <Home></Home> -->
    <apt-detail-modal-test></apt-detail-modal-test>
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";
import Market from "./components/apt/Market.vue";
import AptDetailModalTest from "./components/test/AptDetailModalTest.vue";

export default {
  name: "App",
  components: {
    Login,
    Home,
    Market,
    AptDetailModalTest,
  },
};
</script>

<style></style>
