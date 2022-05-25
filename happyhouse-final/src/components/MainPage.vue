<template>
  <div class="container-fluid">
    <h1 class="mt-4 font-weight-bold">Dash Board</h1>
    <button @click="updateUserAsset" class="btn btn-primary">시세 갱신</button>
    <p>
      이 버튼을 누르면 1달이 증가합니다. <br />
      버튼을 한 번 누를 때마다 월급이 350만원씩 들어오고, 부동산 시세가
      갱신됩니다. <br />
      버튼을 12번 누를 때마다 은행 대출/예금 이자가 반영됩니다.
    </p>
    <div class="row mt-4">
      <my-money :Assets="Assets"></my-money>

      <my-favorite-apt></my-favorite-apt>
    </div>
    <!-- <board-main> -->
    <my-budongsan :BudongsanList="BudongsanList"></my-budongsan>
  </div>
</template>

<script>
import MyMoney from "@/components/user/MyMoney.vue";
import MyFavoriteApt from "@/components/user/MyFavoriteApt.vue";
import MyBudongsan from "@/components/user/MyBudongsan.vue";
import http from "@/common/axios.js";
import jwt_decode from "jwt-decode";
export default {
  components: {
    MyMoney,
    MyFavoriteApt,
    MyBudongsan,
  },
  data() {
    return {
      userSeq: 0,
      Assets: {
        bds: 0,
        loan: 0,
        deposit: 0,
        cash: 0,
        days: 0,
        total: 0,
      },
      BudongsanList: [],
    };
  },
  created() {
    let decode_token = jwt_decode(sessionStorage.getItem("access-token"));
    let userSeq = decode_token.user_seq;
    this.userSeq = userSeq;
    this.getUserAssets();
    this.getMyBudongsans();
  },
  methods: {
    async getUserAssets() {
      let { data } = await http.get("/banks/assets/" + this.userSeq);

      this.Assets = data;
      this.Assets.total =
        this.Assets.bds +
        this.Assets.cash +
        this.Assets.deposit -
        this.Assets.loan;
    },

    async updateUserAsset() {
      // alert(this.userSeq);
      http.put("/banks/asset/" + this.userSeq);
      this.getUserAssets();
      this.getMyBudongsans();
    },

    async getMyBudongsans() {
      let { data } = await http.get("/budongsans/" + this.userSeq);
      console.log(data);
      this.BudongsanList = data;
      console.log(this.BudongsanList);
    },
  },
};
</script>

<style></style>
