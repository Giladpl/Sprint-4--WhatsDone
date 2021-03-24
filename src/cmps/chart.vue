<template>
  <div>
    <h2>Board Priorities by Percentages:</h2>
    <chartPriorityTotal />
    <h2>Board Statuses by Percentages:</h2>
    <chartStatusTotal />
  </div>
</template>

<script>
import chartPriorityTotal from "./chartPriorityTotal"
import chartStatusTotal from "./chartStatusTotal"
export default {

  components: {
    chartPriorityTotal,
    chartStatusTotal
  }
}
</script>

<style>
</style>