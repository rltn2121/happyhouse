<template>
  <div class="container">
    <div class="mt-5 mb-3 d-flex justify-content-center">
      <h1 class="display-4">삐따기 세상</h1>
    </div>
    <div class="mb-3">
      <h2>Login</h2>
    </div>
    <div class="mb-3">
      <label for="userid" class="form-label">이메일</label>
      <input
        type="email"
        id="userid"
        v-model="user.userid"
        required
        placeholder="아이디 입력...."
        @keyup.enter="confirm"
      />
    </div>
    <div class="mb-3">
      <label for="userpwd" class="form-label">비밀번호</label>
      <input
        type="password"
        id="userpwd"
        v-model="user.userpwd"
        required
        placeholder="비밀번호 입력...."
        @keyup.enter="confirm"
      />
    </div>
    <div>
      <button @click="confirm" class="btn btn-primary">로그인</button>
      <button @click="movePage" class="btn btn-success">회원가입</button>
      <!-- <a href="/register" class="btn btn-success">회원가입</a> -->
      <!-- eclipse 와 다른 부분 -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);
import http from "@/common/axios.js";
const memberStore = "memberStore";
export default {
  name: "Login",
  data() {
    return {
      user: {
        userid: null,
        userpwd: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);

      // -----------------------------------------

      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$router.push({ name: "home" });
      }
    },
    movePage() {
      this.$router.push({ name: "signup" });
    },
  },
  // methods: {
  //   login: async function () {
  //     try {
  //       let response = await http.post("/user/login", {
  //         userid: this.userid,
  //         userpwd: this.userpwd,
  //       });
  //       let { data } = response;
  //       //console.log(data);
  //       this.$emit("call-parent-loginSuccess", {
  //         userName: data.userName,
  //         userProfileImageUrl: data.userProfileImageUrl,
  //       });
  //       this.$router.push("/board");
  //     } catch (error) {
  //       console.error(error);
  //       if (error.response.status == "404") {
  //         this.$alertify.error("이메일 또는 비밀번호를 확인하세요.");
  //       } else {
  //         this.$alertify.error("서버 오류");
  //       }
  //     }
  //   },

  //   register() {
  //     this.$router.push("/register");
  //   },
  // },
};
</script>

<style></style>
