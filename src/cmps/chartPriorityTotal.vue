

<script>

import { Pie } from 'vue-chartjs'
// import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";

export default {
  extends: Pie,
  data() {
    return {
      // chartdata: {
      //   labels: this.priorityLabels,
      //   datasets: [
      //     {
      //       label: 'Board Total Progress by Percentage',
      //       backgroundColor: this.priorityColors,
      //       data: this.priorityPercantages
      //     }
      //   ],
      // },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        pieceLabel: {
          mode: 'percentage',
          precision: 1,
        }
      },
      prioritiesMap: null,
      statusesMap: null,
      totalTasks: 0,
    }
  },
  methods: {
    createPrioritiesMap() {
      this.prioritiesMap = JSON.parse(JSON.stringify(this.currBoard.priorities))
      this.prioritiesMap.forEach(task => task.count = 0)
      this.prioritiesMap.forEach(priority => {
        this.currBoard.groups.forEach(group => {
          group.tasks.forEach(task => {
            if (task.priorityId === priority.id) {
              priority.count++
              this.totalTasks++
            }
          })
        })
      })
    },
    createStatusesMap() {
      this.statusesMap = JSON.parse(JSON.stringify(this.currBoard.statuses))
      this.statusesMap.forEach(task => task.count = 0)
      this.statusesMap.forEach(status => {
        this.currBoard.groups.forEach(group => {
          group.tasks.forEach(task => {
            if (task.statusId === status.id) status.count++
          })
        })
      })
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    priorityLabels() {
      return this.prioritiesMap.reduce((acc, priority) => {
        acc.push(priority.title)
        return acc
      }, [])
    },
    priorityColors() {
      return this.prioritiesMap.reduce((acc, priority) => {
        acc.push(priority.color)
        return acc
      }, [])
    },
    priorityPercantages() {
      return this.prioritiesMap.reduce((acc, priority) => {
        acc.push(priority.count / this.totalTasks * 100)
        return acc
      }, [])
    },
  },
  mounted() {
    const chartdata = {
      labels: this.priorityLabels,
      datasets: [
        {
          label: 'Board Total Progress by Percentage',
          backgroundColor: this.priorityColors,
          data: this.priorityPercantages
        }
      ]
    }

    this.renderChart(chartdata, this.options)

  },
  created() {
    this.createPrioritiesMap()
    this.createStatusesMap()
  },
}
</script>

