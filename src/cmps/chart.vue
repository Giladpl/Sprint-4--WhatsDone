<template>
  <section>
    <div class="charts-main-container">
      <el-card class="num-group"><span>Groups:</span><i class="el-icon-finished" />{{currBoard.groups.length}}</el-card>
      <el-card class="num-task"><span>Tasks:</span><i class="el-icon-s-data" />{{taskNumber}}</el-card>
      <el-card class="num-member"><span>Members:</span><i class="el-icon-user-solid" />{{currBoard.members.length}}</el-card>
      <el-card class="num-done"><span>Done:</span><i class="el-icon-star-on" />{{totalDoneTasks.length}}</el-card>
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

  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
    },
    taskNumber() {
      var taskNumber = 0
      this.currBoard.groups.forEach(group => {
        taskNumber += group.tasks.length
      });
      return taskNumber;
    },
    totalDoneTasks() {
      var res = this.currBoard.groups.map(group => {
        return group.tasks.filter(task => {
          return task.statusId === 's101'
        });
      });
      return res;
    }
  },
  
  components: {
    chartPriorityTotal,
    chartStatusTotal,
    chartTimePerTask,
  },
}
</script>

