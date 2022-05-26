<template>
    <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-7">
                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                                <div class="card-header">
                                    <h3 class="text-center font-weight-light my-4">내 정보</h3>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <input
                                                        class="form-control"
                                                        id="inputId"
                                                        type="text"
                                                        v-model="userInfo.userid"
                                                        disabled
                                                    />
                                                    <label for="inputEmail">ID</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-floating">
                                                    <input
                                                        class="form-control"
                                                        id="inputName"
                                                        type="text"
                                                        v-model="userInfo.username"
                                                        disabled
                                                    />
                                                    <label for="inputName">Name</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-floating mb-3">
                                            <input
                                                class="form-control"
                                                id="inputEmail"
                                                type="email"
                                                v-model="userInfo.email"
                                                disabled
                                            />
                                            <label for="inputEmail">Email address</label>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <input
                                                        class="form-control"
                                                        id="inputPassword"
                                                        type="text"
                                                        v-model="userInfo.userpwd"
                                                        disabled
                                                    />
                                                    <label for="inputPassword">Password</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <input
                                                        class="form-control"
                                                        id="inputJoindate"
                                                        type="text"
                                                        v-model="userInfo.joindate"
                                                        disabled
                                                    />
                                                    <label for="inputJoindate">가입일</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-4 mb-0">
                                            <div class="d-grid">
                                                <a class="btn btn-primary btn-block mb-2">Update</a>
                                            </div>
                                            <div class="d-grid">
                                                <a
                                                    class="btn btn-danger btn-block"
                                                    @click="movePage"
                                                    >Cancel</a
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

const memberStore = "memberStore";

export default {
    name: "MemberMyPage",
    components: {},
    computed: {
        ...mapState(memberStore, ["userInfo"]),
    },
    methods: {
        movePage() {
            this.$router.push({ name: "main" });
        },
    },
};
</script>

<style></style>
