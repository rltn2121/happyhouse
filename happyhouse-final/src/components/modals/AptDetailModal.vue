<template>
  <div class="modal" tabindex="-1" id="aptDetailModal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">아파트 거래 정보</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col">
              <apt-info :aptInfoDto="aptInfoDto"></apt-info>
            </div>
            <div class="col">
              <price-per-area
                :latestDealInfoList="latestDealInfoList"
              ></price-per-area>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <market :budongsanMarketList="budongsanMarketList"></market>
            </div>
            <div class="col">
              <history :dealInfoList="dealInfoList"></history>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <reply :replyList="replyList"> </reply>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AptInfo from "@/components/apt/AptInfo.vue";
import History from "@/components/apt/History.vue";
import Reply from "@/components/reply/Reply.vue";
import PricePerArea from "@/components/apt/PricePerArea.vue";
import Market from "@/components/apt/Market.vue";
import http from "@/common/axios.js";
export default {
  components: { AptInfo, History, Reply, PricePerArea, Market },
  props: ["aptCode"],
  data() {
    return {
      aptInfoDto: {},
      budongsanMarketList: [],
      dealInfoList: [],
      latestDealInfoList: [],
      replyList: [],
    };
  },
  async updated() {
    // console.log("modal created");
    // this.getAptDetail();
  },
  methods: {
    async getAptDetail(aptCode) {
      console.log(aptCode);
      let { data } = await http.get("/map/apt/" + aptCode);

      this.aptInfoDto = data.aptInfoDto;
      this.budongsanMarketList = data.budongsanMarketList;
      this.dealInfoList = data.dealInfoList;
      this.latestDealInfoList = data.latestDealInfoList;
      this.replyList = data.replyList;

      // console.log(this.aptInfoDto);
      // console.log(this.budongsanMarketList);
      // console.log(this.dealInfoList);
      // console.log(this.latestDealInfoList);
      console.log(this.replyList);
    },
  },
  updated() {},
  mounted() {},
  watch: {
    aptCode: function (newVal, oldVal) {
      // console.log(newVal, oldVal);
      this.getAptDetail(newVal);
    },
  },
};
</script>

<style></style>
