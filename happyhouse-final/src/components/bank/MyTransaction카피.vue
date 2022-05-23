<template>
    <div class="container">
        은행업무
        <div class="card">
            <div class="card-header">내 거래내역</div>
            <div class="card-body">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">은행</th>
                            <th scope="col">예금</th>
                            <th scope="col">대출</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(board, index) in listGetters" :key="index">
                            <td>{{ board.boardId }}</td>
                            <td>{{ board.title }}</td>
                            <td>{{ board.userName }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MyTransaction",
    components: {},
    data() {
        return {};
    },
    computed: {
        // gttters 이용
        listGetters() {
            return this.$store.getters.getBoardList; // no getBoardList()
        },
    },
    methods: {
        boardList() {
            this.$store.dispatch("boardList");
        },
    },
    created() {
        this.boardList();
    },
};
</script>

<style></style>
