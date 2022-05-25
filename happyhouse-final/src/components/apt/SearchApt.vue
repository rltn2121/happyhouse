<template>
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
                    <option v-for="(item, index) in sidoList" :key="index" :value="item.sidoCode">
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
                    <option v-for="(item, index) in gugunList" :key="index" :value="item.gugunCode">
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
                    <option v-for="(item, index) in dongList" :key="index" :value="item.dongCode">
                        {{ item.dongName }}
                    </option>
                </select>
            </div>
            <div class="card-body" style="overflow: scroll">
                <div class="form-group form-inline justify-content-center">
                    <!-- <button type="button" id="aptSearchBtn">검색</button> -->

                    <!-- <label class="mr-2 ml-3" for="favoriteDong">관심지역 추가 </label>
          <img
            src="@/assets/empty_heart.png"
            id="favoriteDong"
            alt="Logo"
            style="width: 24px; height: 24px; border-radius: 50%"
          /> -->
                </div>
                <table class="table mt-2 table-hover">
                    <tbody>
                        <tr style="cursor: pointer" v-for="(item, index) in aptList" :key="index">
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
                                        @click="toggleFavorite(item.aptCode, item.status)"
                                    >
                                        <td v-if="item.status == 1">
                                            <img src="@/assets/warm_heart.png" alt="" height="20" />
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
                    <!-- <pagination
            :listRowCount="listRowCount"
            :pageLinkCount="pageLinkCount"
            :currentPageIndex="currentPageIndex"
            :totalListItemCount="totalListItemCount"
            v-on:call-parent-move-page="movePage"
          >
          </pagination> -->
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
            aptList: "",
            aptDealList: [],

            aptDetailModal: null,
            // pagination
            listRowCount: 10,
            pageLinkCount: 10,
            currentPageIndex: 1,
            totalListItemCount: 0,
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
            } else {
                this.$alertify.error("이미 제거된 항목입니다.");
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
    background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/updown.png") no-repeat;
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
