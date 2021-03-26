<template>
  <section>
    <el-button
      class="add-view-btn"
      size="small"
      @click="backToBoard"
    >Back</el-button>
    <div class="charts-main-container">
      <el-card>Board Members:</el-card>
      <el-card>Board Groups:</el-card>
      <el-card>Board Tasks:</el-card>
      <el-card class="priority-chart-container">
        <h4>Board Priorities by Percentages:</h4>
        <chartPriorityTotal class="chart priority-chart" />
      </el-card>
      <el-card class="status-chart-container">
        <h4>Board Statuses by Percentages:</h4>
        <chartStatusTotal class="chart status-chart" />
      </el-card>
      <el-card class="lower-chart-container">
        <h4>Total Work Time per Task:</h4>
        <chartTimePerTask class="chart time-chart" />
      </el-card>
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

