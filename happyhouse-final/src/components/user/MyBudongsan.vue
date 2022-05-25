<template>
  <div class="card mb-4">
    <div class="card-header">
      <i class="fas fa-chart-bar me-1"></i>
      내 부동산
    </div>
    <div class="card-body">
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
            v-for="(item, index) in BudongsanList"
            :key="index"
            @click="getAptDetail(item.aptCode)"
            style="cursor: pointer"
          >
            <td>{{ item.aptName }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.area }}m²</td>
            <td>{{ item.floor }}층</td>
            <td>{{ item.price | moneyFormat }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <apt-detail-modal :aptDealList="aptDealList"></apt-detail-modal>
  </div>
</template>

<script>
import http from "@/common/axios.js";
import AptDetailModal from "@/components/modals/AptDetailModal.vue";
import { Modal } from "bootstrap";

export default {
  name: "SearchApt",
  components: { AptDetailModal },
  props: ["BudongsanList"],
  data() {
    return {
      aptDealList: [],
    };
  },

  methods: {
    async getAptDetail(aptCode) {
      try {
        let { data } = await http.get("/map/apt/" + aptCode);
        this.aptDealList = data;
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
  },
  filters: {
    moneyFormat: function (value) {
      if (!value) return "";
      let eok = Math.floor(value / 10000);
      let man = value % 10000;
      return (eok > 0 ? eok + "억 " : "") + man + "만원";
    },
  },
  watch: {
    BudongsanList: function (newVal, oldVal) {
      console.log("BudongsanList watch");
    },
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
