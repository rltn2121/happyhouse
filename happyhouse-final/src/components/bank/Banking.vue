<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <div style="display: inline-block; font-weight: bold">대출/상환/예금</div>
                <div style="display: inline-block; font-weight: bold; float: right">
                    MY CASH : {{ asset.cash }}
                </div>
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
                <button @click="[loanCalc()]" type="button" class="btn btn-dark float-right m-3">
                    계산
                </button>
            </div>
            <div class="card-footer">
                <div style="display: inline-block; font-weight: bold; float: right">총 원</div>
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
            bankId: "",
            work: "",
            price: "",
            asset: {},
        };
    },
    methods: {
        test() {
            console.log(this.name);
            console.log(this.work);
            console.log(this.price);
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
                    alert("대출한도초과!");
                } else if (data == "ERR02") {
                    alert("현금부족!");
                } else if (data == "ERR03") {
                    alert("상환금이 더 많습니다");
                }
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
                    alert("현금부족!");
                } else if (data == "ERR04") {
                    alert("출금금액부족!");
                }
            } catch (error) {
                console.error(error);
            }
        },
    },

    created() {
        this.assetList();
    },
};
</script>

<style>
input::placeholder {
    float: right;
}
</style>
