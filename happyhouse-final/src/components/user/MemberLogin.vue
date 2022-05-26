<template>
    <div class="container">
        <div class="card-header">
            <div class="mt-5 mb-3 d-flex justify-content-center">
                <h1 class="display-4">LOGIN</h1>
            </div>
        </div>
        <div class="card-body">
            <form>
                <div class="form-floating mb-3">
                    <input
                        class="form-control"
                        id="userid"
                        v-model="user.userid"
                        required
                        placeholder="아이디 입력...."
                        @keyup.enter="confirm"
                    />
                    <label for="userid">ID</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                        class="form-control"
                        type="password"
                        id="userpwd"
                        v-model="user.userpwd"
                        required
                        placeholder="비밀번호 입력...."
                        @keyup.enter="confirm"
                    />
                    <label for="userpwd">Password</label>
                </div>
                <div>
                    <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                        <a class="small" @click="movePage">회원가입</a>
                        <a class="btn btn-primary" @click="confirm">Login</a>
                    </div>
                </div>
            </form>
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
                // this.$router.push({ name: "Main" });
                this.$router.push("/");
            }
        },
        movePage() {
            this.$router.push({ name: "Register" });
        },
    },
};
</script>

<style></style>
