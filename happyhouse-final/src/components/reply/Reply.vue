<template>
  <div class="container .bg-primary">
    <div class="card mb-4">
      <div class="card-header"><b>댓글</b></div>
      <div class="card-body">
        <table class="table table-hover">
          <thead>
            <th>작성자</th>
            <th>내용</th>
            <th>평점</th>
            <th>작성일자</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in replyList" :key="index">
              <td>dd</td>
              <td>dd</td>
              <td>dd</td>
              <td>dd</td>
            </tr>
            <tr>
              <td>dd</td>
              <td>dd</td>
              <td>dd</td>
              <td>dd</td>
              </tr>
          </tbody>
             <!-- <div style="display: none">
              {{ aptDealList.aptInfoDto.aptName }}
            </div>  -->
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["aptDealList"],
  data() {
    return {
      replyList: [],
      name: "",
    };
  },
  created() {
    console.log("reply.vue created")
  },
  updated() {
    // console.log("aptInfo.vue updated");
    let { replyList } = this.aptDealList;
    this.replyList = replyList;
  },
};
<style>
</style>
