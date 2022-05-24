<template>
    <div class="container">
        <div class="mt-5 mb-3 d-flex justify-content-center">
            <h1 class="display-4">삐따기 세상</h1>
        </div>
        <div class="mb-3">
            <h2>Login</h2>
        </div>
        <div class="mb-3">
            <label for="userid" class="form-label">Email</label>
            <input
                id="userid"
                v-model="user.userid"
                required
                placeholder="아이디 입력...."
                @keyup.enter="confirm"
            />
        </div>
        <div class="mb-3">
            <label for="userpwd" class="form-label">제목</label>
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
            <button type="button" variant="primary" class="m-1" @click="confirm">로그인</button>
            <button type="button" variant="success" class="m-1" @click="movePage">회원가입</button>
            <!-- <a href="/register" class="btn btn-success">회원가입</a> -->
            <!-- eclipse 와 다른 부분 -->
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
    name: "MemberLogin",
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
            let token = sessionStorage.getItem("access-token");
            if (this.isLogin) {
                await this.getUserInfo(token);
                this.$router.push({ name: "Home" });
            }
        },
        movePage() {
            this.$router.push({ name: "signup" });
        },
    },
};
</script>

<style></style>
