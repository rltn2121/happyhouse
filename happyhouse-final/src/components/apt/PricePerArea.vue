<template>
  <div class="container">
    <div class="card mb-4">
      <div class="card-header">전용면적당 최신 거래가</div>
      <div class="card-body">
        <div
          class="row"
          v-for="(item, index) in latestDealInfoList"
          :key="index"
        >
          <div class="col-4">{{ item.area }}m²</div>
          <div class="col-8">{{ item.dealAmount }}만원</div>
        </div>
        <div style="display: none">
          {{ aptDealList.aptInfoDto.aptName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["aptDealList"],
  data() {
    return {
      latestDealInfoList: [],
      name: "",
    };
  },
  created() {},
  updated() {
    // console.log("aptInfo.vue updated");
    let { latestDealInfoList } = this.aptDealList;
    this.latestDealInfoList = latestDealInfoList;
  },
};
</script>

<style></style>
