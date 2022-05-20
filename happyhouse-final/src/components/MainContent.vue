<template>
  <div id="layoutSidenav">
    <!-- 측면 nav bar 들어갈 영역 -->
    <div id="layoutSidenav_nav">
      <side-nav-bar></side-nav-bar>
    </div>

    <!-- 메인 컨텐츠 -->
    <div id="layoutSidenav_content">
      <!-- 컨텐츠 -->
      <main class="my-3">
        <router-view></router-view>
        <home></home>
        <apt-detail-modal-test></apt-detail-modal-test>
      </main>
      <!-- 푸터 -->
      <footer-nav-bar></footer-nav-bar>
    </div>
  </div>
</template>

<script>
import SideNavBar from "./SideNavBar.vue";
import FooterNavBar from "./FooterNavBar.vue";
import Home from "./Home.vue";
export default {
  components: {
    SideNavBar,
    Home,
    FooterNavBar,
  },
};
</script>

<style></style>
