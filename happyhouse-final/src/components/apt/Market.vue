<template>
  <div class="container">
    <div class="card mb-4">
      <div class="card-header">현재매물</div>
      <div class="card-body">
        <table class="table mt-2 table-hover">
          <thead>
            <th>면적</th>
            <th>거래금액</th>
            <th>구매</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in budongsanMarketList" :key="index">
              <td>{{ item.area }}</td>
              <td>{{ item.price }}</td>
              <td>
                <button type="button" class="btn btn-primary">구매하기</button>
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
      budongsanMarketList: [],
      name: "",
    };
  },
  created() {},
  updated() {
    // console.log("aptInfo.vue updated");
    let { budongsanMarketList } = this.aptDealList;
    this.budongsanMarketList = budongsanMarketList;
  },
};
</script>

<style></style>
