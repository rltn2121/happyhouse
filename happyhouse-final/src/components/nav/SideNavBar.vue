<template>
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div class="sb-sidenav-menu">
            <div class="nav">
                <div class="sb-sidenav-menu-heading">Core</div>
                <router-link to="/user" class="nav-link">
                    <div class="sb-nav-link-icon">
                        <i class="fas fa-tachometer-alt"></i>
                    </div>
                    마이페이지
                </router-link>
                <div class="sb-sidenav-menu-heading">Interface</div>
                <a
                    class="nav-link collapsed"
                    href="#"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseLayouts"
                    aria-expanded="false"
                    aria-controls="collapseLayouts"
                >
                    <div class="sb-nav-link-icon">
                        <i class="fas fa-columns"></i>
                    </div>
                    부동산거래
                    <div class="sb-sidenav-collapse-arrow">
                        <i class="fas fa-angle-down"></i>
                    </div>
                </a>
                <div
                    class="collapse"
                    id="collapseLayouts"
                    aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordion"
                >
                    <nav class="sb-sidenav-menu-nested nav">
                        <router-link to="/apt-search" class="nav-link">
                            <div class="sb-nav-link-icon">
                                <i class="fas fa-tachometer-alt"></i>
                            </div>
                            아파트 검색
                        </router-link>
                        <router-link to="/apt-trade" class="nav-link">
                            <div class="sb-nav-link-icon">
                                <i class="fas fa-tachometer-alt"></i>
                            </div>
                            부동산 매매
                        </router-link>
                    </nav>
                </div>

                <router-link to="/my-transaction" class="nav-link">
                    <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                    은행업무
                </router-link>
                <div class="sb-sidenav-menu-heading">Addons</div>
                <router-link to="/board" class="nav-link">
                    <div class="sb-nav-link-icon">
                        <i class="fas fa-tachometer-alt"></i>
                    </div>
                    커뮤니티
                </router-link>
                <router-link to="/introduce" class="nav-link">
                    <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                    Introduce
                </router-link>
            </div>
        </div>
        <div class="sb-sidenav-footer">
            <div class="small">Logged in as:</div>
            Start Bootstrap
        </div>
    </nav>
</template>

<script>
export default {};
</script>

<style></style>
