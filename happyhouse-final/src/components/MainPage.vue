<template>
  <div class="container">
    <h1 class="mt-4 font-weight-bold">Dash Board</h1>
    <div class="row mt-4">
      <my-money></my-money>

      <my-favorite-budongsan></my-favorite-budongsan>
    </div>
  </div>
</template>

<script>
import MyMoney from "@/components/user/MyMoney.vue";
import MyFavoriteBudongsan from "@/components/user/MyFavoriteBudongsan.vue";
export default {
  components: {
    MyMoney,
    MyFavoriteBudongsan,
  },
};
</script>

<style></style>
