<template>
  <div class="col-xl-6">
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-chart-bar me-1"></i>
        내가 찜한 아파트
      </div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col">아파트이름</th>
              <th scope="col">주소</th>
              <th scope="col">찜하기</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in aptList"
              :key="index"
              style="cursor: pointer"
            >
              <td @click="getAptDetail(item.aptCode)">{{ item.aptName }}</td>
              <td @click="getAptDetail(item.aptCode)">{{ item.address }}</td>
              <td
                v-if="item.status == 1"
                @click="toggleFavorite(item.aptCode, item.status)"
              >
                <img src="@/assets/warm_heart.png" alt="" height="20" />
              </td>
              <td v-else>
                <img src="@/assets/empty_heart.png" alt="" height="20" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <apt-detail-modal :aptDealList="aptDealList"></apt-detail-modal> -->
  </div>
</template>

<script>
import http from "@/common/axios.js";
// import AptDetailModal from "@/components/modals/AptDetailModal.vue";
// import { Modal } from "bootstrap";
import jwt_decode from "jwt-decode";
import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);
export default {
  name: "MyFavoriteApt",
  // components: { AptDetailModal },
  data() {
    return {
      aptList: [],
      aptDealList: [],
      userSeq: 0,
    };
  },

  async created() {
    this.getFavoriteList();
  },

  methods: {
    async getFavoriteList() {
      let decode_token = jwt_decode(sessionStorage.getItem("access-token"));
      let userSeq = decode_token.user_seq;
      this.userSeq = userSeq;
      let { data } = await http.get("/favorites/users/" + userSeq);
      // console.log(data);
      this.aptList = data;
    },
    async getAptDetail(aptCode) {
      try {
        let { data } = await http.get("/map/apt/" + aptCode);
        this.aptDealList = data;
        // console.log(data);
        // console.log(this.aptDealList);
        // console.log(aptDealList);

        this.aptDetailModal.show();
      } catch (error) {
        console.log("BoardMainVue: error : ");
        console.log(error);
      }
    },

    async toggleFavorite(aptCode, status) {
      let params = {
        userSeq: this.userSeq,
        aptCode,
      };

      let { data } = await http.put("/favorites", params);
      if (data == "success") {
        if (status == 1) {
          this.$alertify.success("찜 목록에서 제거되었습니다.");
        } else {
          this.$alertify.success("찜 목록에서 추가되었습니다.");
        }
        this.getFavoriteList();
      } else {
        this.$alertify.error("이미 제거된 항목입니다.");
      }
    },
  },
  mounted() {
    console.log("mounted");
    // this.aptDetailModal = new Modal(document.querySelector("#aptDetailModal"));
    // console.log(this.aptDetailModal);
  },
  async updated() {},
};
</script>

<style></style>
