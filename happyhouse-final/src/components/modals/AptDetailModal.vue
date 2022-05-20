<template>
  <div class="modal" tabindex="-1" id="aptDetailModal">
    <div class="modal-dialog">
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
          <p>아파트명: {{ aptDealList.aptName }}</p>
          <p>
            주소:{{ aptDealList.sidoName }}{{ aptDealList.gugunName
            }}{{ aptDealList.dongName }}
          </p>
          <p>건축년도:{{ aptDealList.buildYear }}</p>
          <p>거래건수: 총 {{ aptDealList.length }}건</p>
          <table class="table mt-2 table-hover">
            <thead>
              <th>면적</th>
              <th>거래금액</th>
              <th>거래일</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in aptDealList" :key="index">
                <td>{{ item.area }}m²</td>
                <td>{{ item.dealAmount }},000원</td>
                <td>
                  {{ item.dealYear }}/{{ item.dealMonth }}/{{ item.dealDay }}
                </td>
              </tr>
            </tbody>
          </table>
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
export default {
  props: ["aptDealList"],
  data() {
    return {
      aptName: "",
    };
  },
  created() {},
};
</script>

<style></style>
