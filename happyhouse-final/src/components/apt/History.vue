<template>
  <div class="container">
    <div class="card mb-4">
      <div class="card-header">거래내역</div>
      <div class="card-body">
        <table class="table mt-2 table-hover">
          <thead>
            <th>면적</th>
            <th>거래금액</th>
            <th>거래일</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dealInfoList" :key="index">
              <td>{{ item.area }}m²</td>
              <td>{{ item.dealAmount }}만원</td>
              <td>
                {{ item.dealYear }}/{{ item.dealMonth }}/{{ item.dealDay }}
              </td>
            </tr>
            <div style="display: none">
              {{ aptDealList.aptInfoDto.aptName }}
            </div>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["aptDealList"],
  data() {
    return {
      dealInfoList: [],
      name: "",
    };
  },
  created() {},
  updated() {
    // console.log("aptInfo.vue updated");
    let { dealInfoList } = this.aptDealList;
    this.dealInfoList = dealInfoList;
  },
};
</script>

<style></style>
