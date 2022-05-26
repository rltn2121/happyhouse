<template>
    <div class="container">
        <h1 class="mt-4 font-weight-bold">글보기</h1>

        <div id="index_section ">
            <div class="card mt-4 left" style="height: 600px">
                <div class="card-header form-inline">
                    <div style="display: inline-block float: left; width: 50%;">
                        <button class="btn btn-primary ml-3" @click="listArticle">목록</button>
                    </div>
                    <div style="display: inline-block float: left; width: 50%;">
                        <button class="btn btn-danger ml-3 float-right" @click="deleteArticle">
                            글삭제
                        </button>
                        <button class="btn btn-primary ml-3 float-right" @click="moveModifyArticle">
                            글수정
                        </button>
                    </div>
                </div>

                <div class="card-body">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">이름</span>
                        </div>
                        <input
                            v-model="article.userid"
                            type="text"
                            class="form-control"
                            disabled
                            readonly
                        />
                    </div>

                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">제목</span>
                        </div>
                        <input
                            v-model="article.subject"
                            type="text"
                            class="form-control"
                            disabled
                            readonly
                        />
                    </div>

                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">내용</span>
                        </div>
                        <textarea
                            v-model="article.content"
                            class="form-control h-25"
                            rows="17"
                            aria-label="With textarea"
                            disabled
                            readonly
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import moment from "moment";
import { getArticle, deleteArticle } from "@/api/board";

export default {
    name: "BoardDetail",
    data() {
        return {
            article: {},
        };
    },
    computed: {
        subject() {
            if (this.article.subject) return this.article.subject.split("\n").join("<br>");
            return "";
        },
        message() {
            if (this.article.content) return this.article.content.split("\n").join("<br>");
            return "";
        },
    },
    created() {
        getArticle(
            this.$route.params.articleno,
            (response) => {
                this.article = response.data;
            },
            (error) => {
                console.log("삭제시 에러발생!!", error);
            }
        );
    },
    methods: {
        listArticle() {
            this.$router.push({ name: "boardList" });
        },
        moveModifyArticle() {
            this.$router.replace({
                name: "boardModify",
                params: { articleno: this.article.articleno },
            });
            //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
        },
        deleteArticle() {
            if (confirm("정말로 삭제하시겠습니까?")) {
                deleteArticle(this.article.articleno, () => {
                    this.$router.push({ name: "boardList" });
                });
            }
        },
    },
    // filters: {
    //   dateFormat(regtime) {
    //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
    //   },
    // },
};
</script>

<style></style>
