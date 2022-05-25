<template>
  <div class="col-lg-6">
    <div class="card mb-4">
      <div class="card-header">
        <div class="row">
          <div class="col">
            <i class="fas fa-chart-pie me-1"></i>
            내 자산 관리
          </div>
          <div class="col text-right">
            <b>전체 자산:</b> {{ Assets.total | moneyFormat }}
          </div>
        </div>
      </div>
      <div class="card-body">
        <canvas
          :Assets="Assets"
          id="myPieChart"
          width="100%"
          height="50"
        ></canvas>
      </div>
      <div class="card-footer small text-muted">
        Updated yesterday at 11:59 PM
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["Assets"],
  data() {
    return {};
  },
  filters: {
    moneyFormat: function (value) {
      if (!value) return "";
      let eok = Math.floor(value / 10000);
      let man = value % 10000;
      return (eok > 0 ? eok + "억 " : "") + man + "만원";
    },
  },
  watch: {
    Assets: function (newVal, oldVal) {
      // console.log("Prop changed: ", newVal, " | was: ", oldVal);
      // console.log("chart updated called");
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
              data: [newVal.bds, newVal.cash, newVal.deposit, newVal.loan],
              backgroundColor: ["#007bff", "#ffc107", "#28a745", "#dc3545"],
            },
          ],
        },
      });
    },
  },
  async updated() {},
  mounted() {},
};
</script>

<style></style>
