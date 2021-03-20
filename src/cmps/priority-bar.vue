<template>
  <section
    class="priority-bar-wrapper"
    v-if="priorities"
  >
    <div
      class="part-of-bar"
      v-for="(priority, idx) in prioritiesMap"
      :key="idx"
      :style="{ backgroundColor: priority.color, width: priority.count / tasks.length * 100 + '%' }"
      :data-title="`${priority.title}, ${(priority.count / tasks.length * 100).toFixed(0)}%`"
    >
    </div>
  </section>
</template>

<script>
export default {
  props: {
    priorities: {
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
      prioritiesMap: null,

    }
  },
  methods: {
    createTasksMap() {
      this.prioritiesMap = JSON.parse(JSON.stringify(this.priorities))
      this.prioritiesMap.forEach(task => task.count = 0)
      this.prioritiesMap.forEach(priority => {
        this.tasks.forEach(task => {
          if (task.priorityId === priority.id) priority.count++;
        })
      })

    },

  },
  computed: {

  },
  watch: {
    tasks: {
      deep: true,
      handler() {
        this.createTasksMap()
      }
    }
  },
  created() {
    this.createTasksMap()

  }
}
</script>