<template>
    <div class="container">
        <h1 class="mt-4 font-weight-bold">글쓰기</h1>
        <board-input-item type="register" />
    </div>
</template>

<script>
import BoardInputItem from "@/components/board/item/BoardInputItem.vue";

export default {
    name: "BoardWrite",
    components: {
        BoardInputItem,
    },
};
</script>

<style></style>
