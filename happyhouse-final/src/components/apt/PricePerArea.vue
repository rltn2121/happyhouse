<template>
  <div class="container">
    <div class="card mb-4">
      <div class="card-header"><b>전용면적당 최신 거래가</b></div>
      <div class="card-body">
        <div
          class="row"
          v-for="(item, index) in latestDealInfoList"
          :key="index"
        >
          <div class="col-4">{{ item.area }}m²</div>
          <div class="col-8">{{ item.dealAmount | moneyFormat }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["latestDealInfoList"],
  data() {
    return {};
  },
  created() {},
  updated() {},
  filters: {
    moneyFormat: function (value) {
      if (!value) return "";
      let eok = Math.floor(value / 10000);
      let man = value % 10000;
      return (eok > 0 ? eok + "억 " : "") + man + "만원";
    },
  },
};
</script>

<style></style>
