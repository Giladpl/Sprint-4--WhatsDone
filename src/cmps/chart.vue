<template>
  <section>
    <el-button
      class="add-view-btn"
      size="small"
      @click="backToBoard"
    >Back</el-button>
    <div class="charts-main-container">
      <div class="priority-chart">
        <h2>Board Priorities by Percentages:</h2>
        <chartPriorityTotal class="chart chart-priority" />
      </div>
      <div class="status-chart">
        <h2>Board Statuses by Percentages:</h2>
        <chartStatusTotal class="chart chart-status" />
      </div>
      <div class="lower-chart">
        <h2>Total Work Time per Task:</h2>
        <chartTimePerTask class="chart chart-time" />
      </div>
    </div>
  </section>
</template>

<script>
import chartPriorityTotal from "./chart-priority-total";
import chartStatusTotal from "./chart-status-total";
import chartTimePerTask from "./chart-time-per-task";
export default {

  methods: {
    backToBoard() {
      this.$emit('backToBoard')
    }
  },
  components: {
    chartPriorityTotal,
    chartStatusTotal,
    chartTimePerTask,
  },
}
</script>

