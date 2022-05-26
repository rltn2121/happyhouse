<template>
    <div class="container">
        <h1 class="mt-4 font-weight-bold">글수정</h1>
        <board-input-item type="modify" />
    </div>
</template>

<script>
import BoardInputItem from "@/components/board/item/BoardInputItem.vue";

export default {
    name: "BoardModify",
    components: {
        BoardInputItem,
    },
};
</script>

<style></style>
