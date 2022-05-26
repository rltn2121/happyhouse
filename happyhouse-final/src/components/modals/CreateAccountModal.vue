<template>
  <div class="modal" tabindex="-1" id="createAccountModal">
    <div class="modal-dialog modal-lg">
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
              <tr v-for="(item, index) in banks" :key="index">
                <td>
                  <input
                    type="radio"
                    name="banks"
                    :value="item.bankId"
                    v-model="bankId"
                  />
                </td>
                <td>{{ item.name }}</td>
                <td>{{ (item.loanInterest * 100).toFixed(2) }}%</td>
                <td>{{ (item.depositInterest * 100).toFixed(2) }}%</td>
              </tr>
            </tbody>
          </table>
          ※ 한 은행 당 하나의 계좌만 개설 가능합니다.
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
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      banks: [],
      bankId: 0,
      userSeq: 0,
    };
  },
  async created() {
    let { data } = await http.get("/banks");
    this.banks = data;
    let decode_token = jwt_decode(sessionStorage.getItem("access-token"));
    let userSeq = decode_token.user_seq;
    this.userSeq = userSeq;
  },
  async updated() {},
  methods: {
    async createAccount() {
      let params = {
        userSeq: this.userSeq,
        bankId: this.bankId,
      };
      let { data } = await http.post("/banks/account", JSON.stringify(params));
      if (data == "fail") {
        this.$alertify.error("한 은행 당 하나의 계좌만 개설 가능합니다.");
      } else {
        this.$alertify.success("계좌 개설이 완료되었습니다.");
      }
    },
  },
  updated() {},
  mounted() {},
  watch: {},
};
</script>

<style></style>
