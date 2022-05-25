<template>
  <div class="container">
    <div class="card mb-4">
      <div class="card-header"><b>현재매물</b></div>
      <div class="card-body">
        <table class="table mt-2 table-hover">
          <thead>
            <th>면적</th>
            <th>거래금액</th>
            <th>구매</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in budongsanMarketList" :key="index">
              <td>{{ item.area }}m²</td>
              <td>{{ item.price | moneyFormat }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="
                    doTrade(item.marketId, item.ownerId, item.bdsId, item.price)
                  "
                >
                  구매하기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueAlertify from "vue-alertify";
import jwt_decode from "jwt-decode";
import http from "@/common/axios.js";
Vue.use(VueAlertify);
export default {
  props: ["budongsanMarketList"],
  data() {
    return {};
  },
  created() {},
  updated() {},
  methods: {
    async doTrade(marketId, ownerId, bdsId, price) {
      let decode_token = jwt_decode(sessionStorage.getItem("access-token"));
      let userSeq = decode_token.user_seq;
      let params = {
        marketId,
        bdsId,
        sellerId: ownerId,
        buyerId: userSeq,
        dealAmount: price,
      };
      this.$alertify.confirm("부동산을 구매하시겠습니까?", async () => {
        let { data } = await http.post("/budongsans", JSON.stringify(params));
        if (data == "success") {
          this.$alertify.success("부동산 구매 성공");
        } else {
          this.$alertify.error("현금이 부족합니다.");
        }
        console.log(data);
      });

      // alert(marketId + " " + ownerId + " " + bdsId + " " + price);
    },
  },
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
