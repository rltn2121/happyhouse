<template>
  <div class="container">
    <div class="row">
      <div class="col"><apt-info></apt-info></div>
      <div class="col"><price-per-area></price-per-area></div>
    </div>
    <div class="row">
      <div class="col"><market></market></div>
      <div class="col"></div>
    </div>
    <div class="row">
      <div class="col"><history></history></div>
      <div class="col"><reply></reply></div>
    </div>
  </div>
</template>

<script>
import AptInfo from "@/components/apt/AptInfo.vue";
import History from "@/components/apt/History.vue";
import Reply from "@/components/reply/Reply.vue";
import PricePerArea from "@/components/apt/PricePerArea.vue";
import Market from "@/components/apt/Market.vue";
export default {
  components: {
    AptInfo,
    History,
    Reply,
    PricePerArea,
    Market,
  },
};
</script>

<style></style>
