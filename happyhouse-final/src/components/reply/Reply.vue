<template>
  <div class="container">
    <div class="card mb-4">
      <div class="card-header"><b>댓글</b></div>
      <div class="card-body">
        <table class="table mt-2 table-hover">
          <thead>
            <th>작성자</th>
            <th>내용</th>
            <th>평점</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in replyList" :key="index">
              <td>{{ item.username }}</td>
              <td>{{ item.content }}</td>
              <td>{{ item.score }}</td>
            </tr>
          </tbody>
        </table>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="내용을 입력해주세요."
            v-model="content"
            @keyup.enter="postReply"
          />
          <div class="input-group-append">
            <button class="btn btn-secondary" type="button" @click="postReply">
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/common/axios.js";
import jwt_decode from "jwt-decode";
import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);
export default {
  props: ["replyList", "aptCode"],
  data() {
    return {
      content: "",
      userSeq: 0,
    };
  },
  created() {
    let decode_token = jwt_decode(sessionStorage.getItem("access-token"));
    let userSeq = decode_token.user_seq;
    this.userSeq = userSeq;
  },
  updated() {},
  filters: {
    moneyFormat: function (value) {
      if (!value) return "";
      let eok = Math.floor(value / 10000);
      let man = value % 10000;
      return (eok > 0 ? eok + "억 " : "") + man + "만원";
    },
  },
  methods: {
    async postReply() {
      let params = {
        aptId: this.aptCode,
        userSeq: this.userSeq,
        content: this.content,
      };
      if (this.content === null || this.content.trim === "") {
        this.$alertify.error("내용을 입력해주세요.");
      } else {
        let { data } = http.post("/reply", JSON.stringify(params));
        this.content = "";

        this.$alertify.success("댓글이 등록되었습니다.");
        this.$emit("updateReplyList");
      }
    },
    async getReplyList() {
      let { data } = await http.get("/reply/" + this.aptCode);
      this.replyList = data;
    },
  },
};
</script>

<style></style>
