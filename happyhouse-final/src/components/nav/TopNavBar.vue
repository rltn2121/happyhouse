<template>
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <!-- Navbar Brand-->
        <router-link to="/" class="navbar-brand ps-3">Happy House</router-link>
        <!-- <a class="navbar-brand ps-3" href="index.html">Happy House</a> -->
        <!-- Sidebar Toggle-->
        <button
            class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
            href="#!"
        >
            <i class="fas fa-bars"></i>
        </button>

        <!-- Navbar-->
        <ul class="navbar-nav ms-auto me-0 me-md-3 my-2 my-md-0">
            <li class="nav-item">
                <a
                    class="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    ><i class="fas fa-user fa-fw"></i
                ></a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <span v-if="!this.isLogin">
                        <li>
                            <router-link to="/user/register" class="dropdown-item"
                                >Create Account</router-link
                            >
                        </li>
                        <li><hr class="dropdown-divider" /></li>
                        <li>
                            <router-link to="/user/signin" class="dropdown-item">Login</router-link>
                        </li>
                    </span>

                    <span v-else>
                        <li>
                            <router-link to="/user/mypage" class="dropdown-item"
                                >MyPage</router-link
                            >
                        </li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="#!">Logout</a></li>
                    </span>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script>
import { mapState } from "vuex";

const memberStore = "memberStore";
export default {
    computed: {
        ...mapState(memberStore, ["isLogin"]),
    },
};
</script>

<style></style>
