<template>
  <div class="col-lg-6">
    <div class="card mb-4">
      <div class="card-header">
        <div class="row">
          <div class="col">
            <i class="fas fa-chart-pie me-1"></i>
            내 자산 관리
          </div>
          <div class="col text-right"><b>전체 자산:</b> {{ total }}만원</div>
        </div>
      </div>
      <div class="card-body">
        <canvas id="myPieChart" width="100%" height="50"></canvas>
      </div>
      <div class="card-footer small text-muted">
        Updated yesterday at 11:59 PM
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/common/axios.js";
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      bds: 0,
      loan: 0,
      deposit: 0,
      cash: 0,
      days: 0,
      total: 0,
    };
  },
  async created() {
    let decode_token = jwt_decode(sessionStorage.getItem("access-token"));
    let userSeq = decode_token.user_seq;
    let { data } = await http.get("/banks/assets/" + userSeq);

    console.log(data.bds);
    console.log(data.loan);
    console.log(data.cash);

    this.bds = data.bds;
    this.loan = data.loan;
    this.deposit = data.deposit;
    this.cash = data.cash;
    this.days = data.days;
    this.total = this.bds + this.cash + this.deposit - this.loan;

    console.log(this.bds);
    console.log(this.loan);
    console.log(this.cash);
    // Set new default font family and font color to mimic Bootstrap's default styling
    Chart.defaults.global.defaultFontFamily =
      '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = "#292b2c";

    // Pie Chart Example
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["부동산", "현금", "예금", "대출"],
        datasets: [
          {
            data: [this.bds, this.cash, this.deposit, this.loan],
            backgroundColor: ["#007bff", "#ffc107", "#28a745", "#dc3545"],
          },
        ],
      },
    });
  },
  mounted() {},
};
</script>

<style></style>
