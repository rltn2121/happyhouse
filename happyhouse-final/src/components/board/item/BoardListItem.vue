<template>
    <tr>
        <td>{{ articleno }}</td>
        <th class="text-left">
            <router-link :to="{ name: 'boardDetail', params: { articleno: articleno } }">{{
                subject
            }}</router-link>
        </th>
        <td>{{ userid }}</td>
        <td>{{ regtime | dateFormat }}</td>
    </tr>
</template>

<script>
import moment from "moment";

export default {
    name: "BoardListItem",
    props: {
        articleno: Number,
        userid: String,
        subject: String,
        hit: Number,
        regtime: String,
        userSeq: Number,
    },
    filters: {
        dateFormat(regtime) {
            return moment(new Date(regtime)).format("YY.MM.DD");
        },
    },
};
</script>

<style></style>
