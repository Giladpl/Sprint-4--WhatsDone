<template>
  <section>
    <el-button
      class="add-view-btn"
      size="small"
      @click="backToBoard"
    >Back</el-button>
    <div>Total Number of Groups: {{currBoard.groups.length}}</div>
    <div>Total Number of Tasks: {{taskNumber}}</div>
    <div>Total Number of Members: {{currBoard.members.length}}</div>
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

