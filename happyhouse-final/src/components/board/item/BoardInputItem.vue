<template>
    <div class="mb-1">
        <div style="text-align: left">
            <div class="card mt-4 left" style="height: 600px">
                <div class="card-header form-inline">
                    <div style="display: inline-block float: left; width: 100%;">
                        <button @click="onReset" class="btn btn-danger ml-3 float-right">
                            초기화
                        </button>

                        <button
                            @click="onSubmit"
                            class="btn btn-primary ml-3 float-right"
                            v-if="this.type === 'register'"
                        >
                            글작성
                        </button>
                        <button @click="onSubmit" class="btn btn-primary ml-3 float-right" v-else>
                            글수정
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> 이름 </span>
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
                        <input v-model="article.subject" type="text" class="form-control" />
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
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { writeArticle, getArticle, modifyArticle } from "@/api/board";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
    name: "BoardInputItem",
    data() {
        return {
            article: {
                articleno: 0,
                userid: "",
                subject: "",
                content: "",
            },
        };
    },
    props: {
        type: { type: String },
    },
    computed: {
        ...mapState(memberStore, ["userInfo"]),
    },
    created() {
        if (this.type === "modify") {
            getArticle(
                this.$route.params.articleno,
                ({ data }) => {
                    this.article = data;
                },
                (error) => {
                    console.log(error);
                }
            );
            this.isUserid = true;
            console.log(article);
        } else {
            this.article.userid = this.userInfo.userid;
        }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault();

            let err = true;
            let msg = "";
            !this.article.userid &&
                ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userid.focus());
            err &&
                !this.article.subject &&
                ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
            err &&
                !this.article.content &&
                ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

            if (!err) alert(msg);
            else this.type === "register" ? this.registArticle() : this.modifyArticle();
        },
        onReset(event) {
            event.preventDefault();
            this.article.articleno = 0;
            this.article.subject = "";
            this.article.content = "";
            this.$router.push({ name: "boardList" });
        },
        registArticle() {
            writeArticle(
                {
                    userid: this.article.userid,
                    subject: this.article.subject,
                    content: this.article.content,
                },
                ({ data }) => {
                    let msg = "등록 처리시 문제가 발생했습니다.";
                    if (data === "success") {
                        msg = "등록이 완료되었습니다.";
                    }
                    alert(msg);
                    this.moveList();
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        modifyArticle() {
            modifyArticle(
                {
                    articleno: this.article.articleno,
                    userid: this.article.userid,
                    subject: this.article.subject,
                    content: this.article.content,
                },
                ({ data }) => {
                    let msg = "수정 처리시 문제가 발생했습니다.";
                    if (data === "success") {
                        msg = "수정이 완료되었습니다.";
                    }
                    alert(msg);
                    // 현재 route를 list로 변경.
                    this.$router.push({ name: "boardList" });
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        moveList() {
            this.$router.push({ name: "boardList" });
        },
    },
};
</script>

<style></style>
