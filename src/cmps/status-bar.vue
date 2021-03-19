<template>
  <section
    v-if="statuses"
    class="status-bar-wrapper"
  >
    <div
      v-for="(status, idx) in statuses"
      :key="idx"
    ></div>
  </section>
</template>

<script>
export default {
  props: {
    statuses: {
      type: Array,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      statusesMap: null,
    }
  },
  methods: {
    createTasksMap() {
      this.statusesMap = JSON.parse(JSON.stringify(this.statuses))
      this.statusesMap.forEach(task => task.count = 0)
      this.statusesMap.forEach(status => {
        this.tasks.forEach(task => {
          if (task.statusId === status.id) status.count++;
        })
      })
      console.log(this.statusesMap);
    },

  },
  computed: {
    precentageCalc() {
      return this.status / this.statuses.length
    },
  },
  created() {

    this.createTasksMap()

  }
}
</script>