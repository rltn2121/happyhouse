<template>
    <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-7">
                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                                <div class="card-header">
                                    <h3 class="text-center font-weight-light my-4">
                                        Create Account
                                    </h3>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <input
                                                        class="form-control"
                                                        id="inputId"
                                                        v-model="inputId"
                                                        type="text"
                                                        placeholder="Enter your ID"
                                                    />
                                                    <label for="inputId">ID</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-floating">
                                                    <input
                                                        class="form-control"
                                                        id="inputName"
                                                        v-model="inputName"
                                                        type="text"
                                                        placeholder="Enter your name"
                                                    />
                                                    <label for="inputLastName">Name</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input
                                                class="form-control"
                                                id="inputEmail"
                                                v-model="inputEmail"
                                                type="email"
                                                placeholder="name@example.com"
                                            />
                                            <label for="inputEmail">Email address</label>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <input
                                                        class="form-control"
                                                        id="inputPassword"
                                                        v-model="inputPassword"
                                                        type="password"
                                                        placeholder="Create a password"
                                                    />
                                                    <label for="inputPassword">Password</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <input
                                                        class="form-control"
                                                        id="inputPasswordConfirm"
                                                        type="password"
                                                        placeholder="Confirm password"
                                                    />
                                                    <label for="inputPasswordConfirm"
                                                        >Confirm Password</label
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-4 mb-0">
                                            <div class="d-grid">
                                                <a class="btn btn-primary btn-block" @click="Regist"
                                                    >Create Account</a
                                                >
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import http from "@/common/axios.js";

const memberStore = "memberStore";

export default {
    name: "MemberRegister",
    data() {
        return {
            inputId: "",
            inputName: "",
            inputEmail: "",
            inputPassword: "",
        };
    },
    components: {},
    computed: {
        ...mapState(memberStore, ["userInfo"]),
    },
    methods: {
        async Regist() {
            console.log("Regist");

            let obj = {
                userid: this.inputId,
                username: this.inputName,
                email: this.inputEmail,
                userpwd: this.inputPassword,
            };

            try {
                let response = await http.post("/user/register", obj);
                let { data } = response;
                console.log(data);
                this.$router.push({ name: "signIn" });
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>

<style></style>
