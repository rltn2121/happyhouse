<template>
  <div class="container-fluid">
    <h1 class="mt-4 font-weight-bold">부동산 매매</h1>
    <div id="index_section ">
      <div class="card mt-4 left" style="min-height: 850px">
        <div class="card-header form-inline">
          <label class="mr-2" for="sido"></label>
          <select
            class="form-control"
            style="width: 137px"
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
            style="width: 137px"
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
            style="width: 137px"
            v-model="dongCode"
            @change="getBudongsanMarket(dongCode)"
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
          <form
            class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"
          >
            <div class="input-group">
              <input
                class="form-control"
                type="text"
                placeholder="Search for..."
                aria-label="Search for..."
                aria-describedby="btnNavbarSearch"
              />
              <button
                class="btn btn-primary"
                id="btnNavbarSearch"
                type="button"
              >
                <i class="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>
        <div class="card-body" style="overflow: scroll">
          <div class="form-group form-inline justify-content-center"></div>
          <table class="table table-hover">
            <thead class="thead-dark">
              <tr>
                <th scope="col">아파트이름</th>
                <th scope="col">주소</th>
                <th scope="col">전용면적</th>
                <th scope="col">층</th>
                <th scope="col">가격</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in aptList"
                :key="index"
                @click="getAptDetail(item.aptCode)"
                style="cursor: pointer"
              >
                <td>{{ item.aptName }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.area }}m²</td>
                <td>{{ item.floor }}층</td>
                <td>{{ item.price }}만원</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <apt-detail-modal :aptDealList="aptDealList"></apt-detail-modal>
  </div>
</template>

<script>
import http from "@/common/axios.js";
import AptDetailModal from "@/components/modals/AptDetailModal.vue";
import { Modal } from "bootstrap";
import jwt_decode from "jwt-decode";
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
      aptDealList: [],
    };
  },

  async created() {
    let { data } = await http.get("/map/sido");
    console.log("128 line:" + data);
    this.sidoList = data;
  },

  methods: {
    async getGugun(sidoCode) {
      const params = { sido: sidoCode };

      let { data } = await http.get("/map/gugun", {
        params,
      });

      this.gugunList = data;
    },
    async getDong(gugunCode) {
      const params = { gugun: gugunCode };

      let { data } = await http.get("/map/dong/", {
        params,
      });
      this.dongList = data;
    },
    async getBudongsanMarket(dongCode) {
      console.log("dongCode: " + dongCode);
      const params = {
        dongCode: this.dongCode,
      };

      console.log("dongCode: " + dongCode);
      let { data } = await http.get("/budongsans/market", { params });
      console.log(data);
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
  },
  mounted() {
    console.log("mounted");
    this.aptDetailModal = new Modal(document.querySelector("#aptDetailModal"));
    // console.log(this.aptDetailModal);
  },
};
</script>

<style>
#logo {
  width: 400px;
}

.overlaybox {
  position: relative;
  width: 360px;
  height: 350px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/box_movie.png")
    no-repeat;
  padding: 15px 10px;
}
.overlaybox div,
ul {
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.overlaybox li {
  list-style: none;
}
.overlaybox .boxtitle {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png")
    no-repeat right 120px center;
  margin-bottom: 8px;
}
.overlaybox .first {
  position: relative;
  width: 247px;
  height: 136px;
  margin-bottom: 8px;
}
.first .text {
  color: #fff;
  font-weight: bold;
}
.first .triangle {
  position: absolute;
  width: 48px;
  height: 48px;
  top: 0;
  left: 0;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/triangle.png")
    no-repeat;
  padding: 6px;
  font-size: 18px;
}
.first .movietitle {
  position: absolute;
  width: 100%;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  padding: 7px 15px;
  font-size: 14px;
}
.overlaybox ul {
  width: 247px;
}
.overlaybox li {
  position: relative;
  margin-bottom: 2px;
  background: #2b2d36;
  padding: 5px 10px;
  color: #aaabaf;
  line-height: 1;
}
.overlaybox li span {
  display: inline-block;
}
.overlaybox li .number {
  font-size: 16px;
  font-weight: bold;
}
.overlaybox li .title {
  font-size: 13px;
}
.overlaybox li .last {
  font-size: 12px;
  margin-right: 15px;
}
.overlaybox ul .arrow {
  position: absolute;
  margin-top: 8px;
  right: 25px;
  width: 5px;
  height: 3px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/updown.png")
    no-repeat;
}
.overlaybox li .up {
  background-position: 0 -40px;
}
.overlaybox li .down {
  background-position: 0 -60px;
}
.overlaybox li .count {
  position: absolute;
  margin-top: 5px;
  right: 15px;
  font-size: 10px;
}
.overlaybox li:hover {
  color: #fff;
  background: #d24545;
}
.overlaybox li:hover .up {
  background-position: 0 0px;
}
.overlaybox li:hover .down {
  background-position: 0 -20px;
}
</style>
g
