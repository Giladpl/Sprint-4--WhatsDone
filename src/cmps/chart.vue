<template>
  <div>
    <h2>Board Priorities by Percentages:</h2>
    <chartPriorityTotal />
    <h2>Board Statuses by Percentages:</h2>
    <chartStatusTotal />
    <h2>Task per Hour:</h2>
    <chartTimePerTask />
  </div>
</template>

<script>
import chartPriorityTotal from "./chart-priority-total"
import chartStatusTotal from "./chart-status-total"
import chartTimePerTask from "./chart-time-per-task"
export default {

  components: {
    chartPriorityTotal,
    chartStatusTotal,
    chartTimePerTask
  }
}
</script>

<style>
</style>