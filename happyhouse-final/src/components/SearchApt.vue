<template>
  <div id="index_section">
    <div class="card mt-1 left" style="min-height: 850px">
      <div class="card-body" style="overflow: scroll">
        <div class="form-group form-inline justify-content-center">
          <label class="mr-2" for="sido"></label>
          <select
            class="form-control"
            id="sido"
            v-model="sidoCode"
            @change="getGugun(sidoCode)"
          >
            <option value="" selected>시/도</option>
            <option
              v-for="(item, index) in sidoList"
              :key="index"
              :value="item.sidoCode"
            >
              {{ item.sidoName }}
            </option>
          </select>
          <label class="mr-2 ml-3" for="gugun"></label>
          <select
            class="form-control"
            id="gugun"
            v-model="gugunCode"
            @change="getDong(gugunCode)"
          >
            <option value="" selected>구/군</option>
            <option
              v-for="(item, index) in gugunList"
              :key="index"
              :value="item.gugunCode"
            >
              {{ item.gugunName }}
            </option>
          </select>
          <label class="mr-2 ml-3" for="dong"></label>
          <select
            class="form-control"
            v-model="dongCode"
            @change="getApt(dongCode)"
          >
            <option value="">읍/면/동</option>
            <option
              v-for="(item, index) in dongList"
              :key="index"
              :value="item.dongCode"
            >
              {{ item.dongName }}
            </option>
          </select>
          <!-- <button type="button" id="aptSearchBtn">검색</button> -->

          <label class="mr-2 ml-3" for="favoriteDong">관심지역 추가 </label>
          <img
            src="../assets/empty_heart.png"
            id="favoriteDong"
            alt="Logo"
            style="width: 24px; height: 24px; border-radius: 50%"
          />
        </div>
        <table class="table mt-2 table-hover">
          <tbody>
            <tr
              style="cursor: pointer"
              v-for="(item, index) in aptList"
              :key="index"
            >
              <td @click="getAptDetail(item.aptCode)">
                <div class="row">
                  <div class="col-md-8 h5 font-weight-bold text-primary">
                    {{ item.aptName }}
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-8">
                    {{ item.sidoName }} {{ item.gugunName }}
                    {{ item.dongName }} {{ item.jibun }}
                  </div>
                  <div class="col-md-4">
                    <img src="../assets/marker.png" alt="" />
                    {{ item.dist.toFixed(2) }}km
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <apt-detail-modal :aptDealList="aptDealList"></apt-detail-modal>
  </div>
</template>

<script>
import AptDetailModal from "@/components/modals/AptDetailModal.vue";
import { Modal } from "bootstrap";
import http from "@/common/axios.js";

export default {
  name: "SearchApt",
  components: { AptDetailModal },
  data() {
    return {
      sidoList: [],
      gugunList: [],
      dongList: [],
      aptList: [],
      sidoCode: "",
      gugunCode: "",
      dongCode: "",
      aptList: "",
      aptDealList: "",

      aptDetailModal: null,
    };
  },

  async created() {
    console.log("created called");

    let { data } = await http.get("/map/sido");
    console.log(data);
    this.sidoList = data;
  },
  methods: {
    async getGugun(sidoCode) {
      const params = { sido: sidoCode };
      let { data } = await http.get("/map/gugun/", { params });
      this.gugunList = data;
    },
    async getDong(gugunCode) {
      const params = { gugun: gugunCode };
      let { data } = await http.get("/map/dong/", { params });
      this.dongList = data;
    },
    async getApt(dongCode) {
      console.log("dongCode: " + dongCode);
      const params = {
        dong: this.dongCode,
        myLng: "128.33171777763386",
        myLat: "34.977085999097184",
      };

      let { data } = await http.get("/map/apt/", { params });
      console.log(data);
      this.aptList = data;
    },

    async getAptDetail(aptCode) {
      try {
        let { data } = await http.get("/map/apts/" + aptCode);
        this.aptDealList = data;
        console.log(data);
        this.aptDetailModal.show();
      } catch (error) {
        console.log("BoardMainVue: error : ");
        console.log(error);
      }
    },
  },
  mounted() {
    console.log("mounted");
    this.aptDetailModal = new Modal(document.querySelector("#aptDetailModal"));
    // console.log(this.aptDetailModal);
  },
};
</script>

<style></style>
g
