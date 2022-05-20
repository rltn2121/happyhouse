<template>
  <div id="app">
    <top-nav-bar></top-nav-bar>
    <main-content></main-content>
  </div>
</template>

<script>
import TopNavBar from "@/components/TopNavBar.vue";
import MainContent from "@/components/MainContent.vue";
export default {
  name: "App",
  components: {
    TopNavBar,
    MainContent,
  },
};
</script>

<style></style>
