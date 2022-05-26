<template>
  <div class="container-fluid">
    <h1 class="mt-4 font-weight-bold">아파트 검색</h1>
    <div class="bg-primary"></div>
    <div class="row">
      <div class="col-6">
        <div id="index_section">
          <div class="card mt-3 left" style="min-height: 850px">
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
            </div>
            <div class="card-body" style="overflow: scroll">
              <div class="form-group form-inline justify-content-center"></div>
              <table class="table mt-2 table-hover">
                <tbody>
                  <tr
                    style="cursor: pointer"
                    v-for="(item, index) in aptList"
                    :key="index"
                  >
                    <td>
                      <div class="row text-left">
                        <div
                          class="col-md-8 h5 font-weight-bold text-primary"
                          @click="getAptDetail(item.aptCode)"
                        >
                          {{ item.aptName }}
                        </div>
                        <div
                          class="col"
                          @click="
                            toggleFavorite(
                              item.aptCode,
                              item.dongCode,
                              item.status
                            )
                          "
                        >
                          <td v-if="item.status == 1">
                            <img
                              src="@/assets/warm_heart.png"
                              alt=""
                              height="20"
                            />
                          </td>
                          <td v-else>
                            <img
                              src="@/assets/empty_heart.png"
                              alt=""
                              height="20"
                            />
                          </td>
                        </div>
                      </div>
                      <div class="row" @click="getAptDetail(item.aptCode)">
                        <div class="col-md-8 text-left">
                          {{ item.sidoName }} {{ item.gugunName }}
                          {{ item.dongName }} {{ item.jibun }}
                        </div>
                        <div class="col-md-4">
                          <img src="@/assets/marker.png" alt="" />
                          {{ item.dist.toFixed(2) }}km
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <apt-detail-modal :aptCode="aptCode"></apt-detail-modal>
        </div>
      </div>
      <div class="col-6">
        <div class="mt-3">
          <div id="map"></div>
          <div id="myPosition mt-4">
            <!-- 부트스트랩 primary 버튼 -->
            <div class="mt-3"></div>
            <button
              type="button"
              class="btn btn-lg btn-primary"
              @click="getCurrentPosBtn()"
            >
              내 위치 가져오기
            </button>
            <div style="display: none">
              <p id="myLng">lng</p>
              <p id="myLat">lat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AptDetailModal from "@/components/modals/AptDetailModal.vue";
import { Modal } from "bootstrap";
import http from "@/common/axios.js";
import jwt_decode from "jwt-decode";
// import Pagination from "@/components/Pagination.vue";
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

      aptCode: 0,
      map: null,
      aptDealList: [],
      markers: [],
      infowindow: null,
      latitude: 0,
      longitude: 0,

      aptDetailModal: null,
      markerPositions2: [
        [37.499590490909185, 127.0263723554437],
        [37.499427948430814, 127.02794423197847],
        [37.498553760499505, 127.02882598822454],
        [37.497625593121384, 127.02935713582038],
        [37.49629291770947, 127.02587362608637],
        [37.49754540521486, 127.02546694890695],
        [37.49646391248451, 127.02675574250912],
      ],
    };
  },

  async created() {
    let decode_token = jwt_decode(sessionStorage.getItem("access-token"));
    let userSeq = decode_token.user_seq;
    this.userSeq = userSeq;
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
    async getApt(dongCode) {
      console.log("dongCode: " + dongCode);
      const params = {
        dong: this.dongCode,
        userSeq: this.userSeq,
        myLng: "128.33171777763386",
        myLat: "34.977085999097184",
      };

      let { data } = await http.get("/map/apt/", { params });
      console.log(data);
      this.aptList = data;
      this.displayMarker(this.aptList);
    },

    async getAptDetail(aptCode) {
      this.aptCode = aptCode;
      this.aptDetailModal.show();
    },
    async toggleFavorite(aptCode, dongCode, status) {
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
        this.getApt(dongCode);
      } else {
        this.$alertify.error("이미 제거된 항목입니다.");
      }
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
    },

    displayMarker(markerPositions2) {
      // marker가 찍혀있으면 제거하기
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      var markerPositions = [];
      for (var i = 0; i < markerPositions2.length; i++) {
        markerPositions.push([
          markerPositions2[i].lat,
          markerPositions2[i].lng,
        ]);
      }
      console.log(markerPositions2);

      console.log(typeof markerPositions);
      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position)
      );

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            })
        );

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        this.map.setBounds(bounds);
      }
    },
    addMarker(position, idx, title) {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(map); // 지도 위에 마커를 표출합니다
      this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    },
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=7300a0d50f02823be6fba48f5ace8bf7&libraries=services";
      document.head.appendChild(script);
    }
    console.log("mounted");
    this.aptDetailModal = new Modal(document.querySelector("#aptDetailModal"));
    // console.log(this.aptDetailModal);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 100%;
  height: 700px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
