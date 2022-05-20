<template>
  <div class="container">
    <div class="row">
      <div class="col"><my-money></my-money></div>
      <div class="col"><my-favorite-budongsan></my-favorite-budongsan></div>
    </div>
  </div>
</template>

<script>
import MyMoney from "@/components/user/MyMoney.vue";
import MyFavoriteBudongsan from "@/components/user/MyFavoriteBudongsan.vue";
export default {
  compoents: {
    MyMoney,
    MyFavoriteBudongsan,
  },
};
</script>

<style></style>
