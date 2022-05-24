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
              <!-- <price-per-area :aptDealList="aptDealList"></price-per-area> -->
              <price-per-area :aptDealList="aptDealList"></price-per-area>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <market :aptDealList="aptDealList"></market>
            </div>
            <div class="col">
              <history :aptDealList="aptDealList"></history>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <reply :aptDealList="aptDealList"> </reply>
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
export default {
  components: {
    AptInfo,
    History,
    Reply,
    PricePerArea,
    Market,
  },
  props: ["aptDealList"],
  data() {
    return {
      aptInfoDto: [],
      budongsanMarketList: [],
      dealInfoList: [],
      latestDealInfoList: [],
      replyList: [],
    };
  },
  created() {},
  updated() {
    console.log("aptDetailModalUpdated");
    let {
      aptInfoDto,
      budongsanMarketList,
      dealInfoList,
      latestDealInfoList,
      replyList,
    } = this.aptDealList;
    this.aptInfoDto = aptInfoDto;
    this.budongsanMarketList = budongsanMarketList;
    this.dealInfoList = dealInfoList;
    this.latestDealInfoList = latestDealInfoList;
    // this.replyList = replyList;
    // console.log("this.aptInfoDto");
    // console.log(this.aptInfoDto);
    // console.log(this.budongsanMarketList);
    // console.log(this.dealInfoList);
    // console.log(this.latestDealInfoList);
    // console.log(this.replyList);
  },
  mounted() {
    console.log("aptDetailModalMounted");
  },
};
</script>

<style></style>
