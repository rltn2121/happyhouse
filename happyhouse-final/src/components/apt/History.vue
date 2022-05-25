<template>
  <div class="container">
    <div class="card mb-4">
      <div class="card-header"><b>거래내역</b></div>
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
              <td>{{ item.dealAmount | moneyFormat }}</td>
              <td>
                {{ item.dealYear }}/{{ item.dealMonth }}/{{ item.dealDay }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dealInfoList"],
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
