<template>
  <div class="container">
    <div class="card mb-4">
      <div class="card-header"><b>아파트 정보</b></div>
      <div class="card-body">
        <div class="row">
          <div class="col-4">아파트명</div>
          <!-- <div class="col-8">{{ aptDealList.aptInfoDto.aptName }}</div> -->
          <div class="col-8">{{ aptInfoDto.aptName }}</div>
        </div>
        <div class="row">
          <div class="col-4">주소</div>
          <!-- <div class="col-8">{{ aptDealList.aptInfoDto.address }}</div> -->
          <div class="col-8">{{ aptInfoDto.address }}</div>
        </div>
        <div class="row">
          <div class="col-4">건축년도</div>
          <!-- <div class="col-8">{{ aptDealList.aptInfoDto.buildYear }}년</div> -->
          <div class="col-8">{{ aptInfoDto.buildYear }}년</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: ["aptDealList", "aptInfoDto"],
  props: ["aptInfoDto"],

  created() {},
  updated() {
    // let { aptDealList } = this.aptDealList;
  },
};
</script>

<style></style>
