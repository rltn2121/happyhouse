<template>
  <div>
    <div class="container">
      <h1 class="mt-4 font-weight-bold">은행 업무</h1>

      <div class="card mt-4">
        <div class="card-header">
          <div style="display: inline-block; font-weight: bold">
            내 거래내역
          </div>
          <div style="display: inline-block; font-weight: bold; float: right">
            MY CASH : {{ asset.cash | moneyFormat }}
          </div>
        </div>
        <div class="card-body">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">은행</th>
                <th scope="col">예금</th>
                <th scope="col">대출</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bank, index) in list" :key="index">
                <td>{{ bank.name }}</td>
                <td>{{ bank.deposit | moneyFormat }}</td>
                <td>{{ bank.loan | moneyFormat }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer">
          <table class="table">
            <thead class="thead">
              <tr>
                <th scope="">총 예금 : {{ asset.deposit | moneyFormat }}</th>
                <th scope="">총 대출 : {{ asset.loan | moneyFormat }}</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>

    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <div style="display: inline-block; font-weight: bold">
            대출/상환/예금
          </div>
          <button
            @click="createBank()"
            type="button"
            class="btn btn-primary ml-3"
          >
            계좌 개설
          </button>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col" style="text-align: center">
              <label for="bank">은행</label>
              <select class="form-control" v-model="bankId">
                <option disabled value="">은행을 고르세요.</option>
                <option value="1">신한</option>
                <option value="2">우리</option>
                <option value="3">하나</option>
                <option value="4">기업</option>
                <option value="5">국민</option>
              </select>
            </div>
            <div class="col" style="text-align: center">
              <label for="work">업무</label>
              <select class="form-control" v-model="work">
                <option disabled value="">업무 내용을 고르세요.</option>
                <option value="대출">대출</option>
                <option value="상환">상환</option>
                <option value="예금">예금</option>
                <option value="출금">출금</option>
              </select>
            </div>
            <div class="col" style="text-align: center">
              <label for="price">금액</label>
              <input class="form-control" v-model="price" placeholder="만원" />
            </div>
          </div>
          <br />
          ※ 한 은행 당 최대 10억 원까지 대출 가능합니다.
        </div>

        <button
          @click="change()"
          type="button"
          class="btn btn-dark float-right m-3"
        >
          계산
        </button>
      </div>
    </div>
    <create-account-modal></create-account-modal>
  </div>
</template>

<script>
import CreateAccountModal from "@/components/modals/CreateAccountModal.vue";
import { Modal } from "bootstrap";
import http from "@/common/axios.js";
import jwt_decode from "jwt-decode";

export default {
  name: "MyTransaction",
  components: { CreateAccountModal },
  data() {
    return {
      list: [],
      asset: {},
      bankId: "",
      work: "",
      price: "",
      createAccountModal: null,
    };
  },
  methods: {
    async boardList() {
      let decode_token = jwt_decode(sessionStorage.getItem("access-token"));
      let userSeq = decode_token.user_seq;
      console.log(userSeq);

      try {
        let response = await http.get("banks/account/" + userSeq); // params: params : shorthand property
        let { data } = response;
        console.log(data);
        this.list = data;
      } catch (error) {
        console.error(error);
      }
    },
    async assetList() {
      let decode_token = jwt_decode(sessionStorage.getItem("access-token"));
      let userSeq = decode_token.user_seq;
      console.log(userSeq);

      try {
        let response = await http.get("banks/assets/" + userSeq); // params: params : shorthand property
        let { data } = response;
        console.log(data);
        this.asset = data;
      } catch (error) {
        console.error(error);
      }
    },
    async loanCalc() {
      console.log("loan start");

      let decode_token = jwt_decode(sessionStorage.getItem("access-token"));
      let userSeq = decode_token.user_seq;
      console.log(userSeq);

      let loan = this.price;
      if (this.work == "상환") {
        loan = -loan;
      }

      let obj = {
        userSeq,
        bankId: this.bankId,
        loan,
      };

      console.log(this.work);
      console.log(obj);

      try {
        let { data } = await http.put("/banks/loan", obj);
        console.log(data);
        if (data == "ERR01") {
          this.$alertify.error("대출 한도 초과!");
        } else if (data == "ERR02") {
          this.$alertify.error("현금 부족!");
        } else if (data == "ERR03") {
          this.$alertify.error("상환금이 더 많습니다");
        } else if (data == "ERR05") {
          this.$alertify.error("해당 은행에 계좌가 존재하지 않습니다.");
        }
        this.boardList();
        this.assetList();
      } catch (error) {
        console.error(error);
      }
    },
    async depositCalc() {
      console.log("deposit");

      let decode_token = jwt_decode(sessionStorage.getItem("access-token"));
      let userSeq = decode_token.user_seq;
      console.log(userSeq);

      let deposit = this.price;
      if (this.work == "출금") {
        deposit = -deposit;
      }

      let obj = {
        userSeq,
        bankId: this.bankId,
        deposit,
      };

      console.log(this.work);
      console.log(obj);

      try {
        let response = await http.put("/banks/deposit", obj);
        let { data } = response;
        console.log(data);
        if (data == "ERR02") {
          this.$alertify.error("현금 부족!");
        } else if (data == "ERR04") {
          this.$alertify.error("출금 금액 부족!");
        } else if (data == "ERR05") {
          this.$alertify.error("해당 은행에 계좌가 존재하지 않습니다.");
        }
        this.boardList();
        this.assetList();
      } catch (error) {
        console.error(error);
      }
    },
    change() {
      if (this.work == "대출" || this.work == "상환") {
        this.loanCalc();
      } else if (this.work == "예금" || this.work == "출금") {
        this.depositCalc();
      }
    },
    async createBank() {
      this.createAccountModal.show();
    },
  },
  created() {
    this.boardList();
    this.assetList();
  },
  mounted() {
    this.createAccountModal = new Modal(
      document.querySelector("#createAccountModal")
    );
  },
  filters: {
    moneyFormat: function (value) {
      if (value === 0) return value + "원";
      let eok = Math.floor(value / 10000);
      let man = value % 10000;
      return (eok > 0 ? eok + "억 " : "") + man + "만원";
    },
  },
};
</script>

<style>
table {
  margin: auto;
  text-align: center;
}
input::placeholder {
  float: right;
}
</style>
