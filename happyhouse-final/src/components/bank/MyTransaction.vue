<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <div style="display: inline-block; font-weight: bold">내 거래내역</div>
                <div style="display: inline-block; font-weight: bold; float: right">
                    MY CASH : {{ asset.cash }}
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
                            <td>{{ bank.loan }}</td>
                            <td>{{ bank.deposit }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer">
                <table class="table">
                    <thead class="thead">
                        <tr>
                            <th scope="">총 예금 : {{ asset.loan }}만원</th>
                            <th scope="">총 적금 : {{ asset.deposit }}만원</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import http from "@/common/axios.js";
import jwt_decode from "jwt-decode";

export default {
    name: "MyTransaction",
    components: {},
    data() {
        return {
            list: [],
            asset: {},
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
    },
    created() {
        this.boardList();
        this.assetList();
    },
};
</script>

<style>
table {
    margin: aut;
    text-align: center;
}
</style>
