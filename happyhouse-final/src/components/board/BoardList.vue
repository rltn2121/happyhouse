<template>
    <div class="container">
        <h1 class="mt-4 font-weight-bold">자유게시판</h1>
        <div id="index_section ">
            <div class="card mt-4 left" style="min-height: 850px">
                <div class="card-header form-inline">
                    <div style="display: inline-block float: left; width: 100%;">
                        <button @click="moveWrite()" class="btn btn-primary ml-3 float-right">
                            글쓰기
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="form-group form-inline justify-content-center"></div>
                    <table class="table table-hover">
                        <thead class="thead-dark">
                            <tr>
                                <th class="col-1">글번호</th>
                                <th class="col-5">제목</th>
                                <th class="col-2">작성자</th>
                                <th class="col-2">작성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            <board-list-item
                                v-for="article in articles"
                                :key="article.articleno"
                                v-bind="article"
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { listArticle } from "@/api/board.js";
import BoardListItem from "@/components/board/item/BoardListItem";

export default {
    name: "BoardList",
    components: {
        BoardListItem,
    },
    data() {
        return {
            articles: [],
        };
    },
    created() {
        let param = {
            pg: 1,
            spp: 20,
            key: null,
            word: null,
        };
        listArticle(
            param,
            (response) => {
                this.articles = response.data;
            },
            (error) => {
                console.log(error);
            }
        );
    },
    methods: {
        moveWrite() {
            this.$router.push({ name: "boardRegister" });
        },
    },
};
</script>

<style scope>
.tdClass {
    width: 50px;
    text-align: center;
}
.tdSubject {
    width: 300px;
    text-align: left;
}
</style>
