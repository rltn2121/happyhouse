<template>
  <div class="modal" tabindex="-1" id="createAccountModal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">계좌 개설</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <div class="modal-body">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">선택</th>
                <th scope="col">은행</th>
                <th scope="col">대출 금리</th>
                <th scope="col">예금 금리</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="radio" name="banks" /></td>
                <td>신한은행</td>
                <td>10000%</td>
                <td>0.00001%</td>
              </tr>
              <tr>
                <td><input type="radio" name="banks" /></td>
                <td>우리은행</td>
                <td>20000%</td>
                <td>0.00002%</td>
              </tr>
              <tr>
                <td><input type="radio" name="banks" /></td>
                <td>하나은행</td>
                <td>30000%</td>
                <td>0.00003%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="createAccount"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/common/axios.js";
export default {
  data() {
    return {};
  },
  async updated() {},
  methods: {
    async createAccount() {
      alert("서비스 점검 중입니다.");
    },
  },
  updated() {},
  mounted() {},
  watch: {},
};
</script>

<style></style>
