<template>
  <section>
    <el-button
      class="add-view-btn"
      size="small"
      @click="backToBoard"
    >Back</el-button>
    <div class="charts-main-container">
      <el-card class="num-group"><i class="el-icon-finished" />Total Number of Groups: {{currBoard.groups.length}}</el-card>
      <el-card class="num-task"><i class="el-icon-s-data" />Total Number of Tasks: {{taskNumber}}</el-card>
      <el-card class="num-member"><i class="el-icon-user-solid" />Total Number of Members: {{currBoard.members.length}}</el-card>
      <el-card class="num-member2"><i class="el-icon-star-on" />Finished Tasks: {{currBoard.members.length}}</el-card>
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
  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
    },
    taskNumber() {
      var taskNumber = 0
      this.currBoard.groups.forEach(group => {
        taskNumber += group.tasks.length
      })
      return taskNumber
    }
  },
  components: {
    chartPriorityTotal,
    chartStatusTotal,
    chartTimePerTask,
  },
}
</script>

