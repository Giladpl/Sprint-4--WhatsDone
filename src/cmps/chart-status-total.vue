

<script>

import { Doughnut } from 'vue-chartjs'
// import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";

export default {
  extends: Doughnut,
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        pieceLabel: {
          mode: 'percentage',
          precision: 1,
        }
      },
      statusesMap: null,
      totalTasks: 0,
    }
  },
  methods: {
    createStatusesMap() {
      this.statusesMap = JSON.parse(JSON.stringify(this.currBoard.statuses))
      this.statusesMap.forEach(task => task.count = 0)
      this.statusesMap.forEach(status => {
        this.currBoard.groups.forEach(group => {
          group.tasks.forEach(task => {
            if (task.statusId === status.id) {
              status.count++
              this.totalTasks++
            }
          })
        })
      })
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    statusLabels() {
      return this.statusesMap.reduce((acc, status) => {
        acc.push(status.title)
        return acc
      }, [])
    },
    statusColors() {
      return this.statusesMap.reduce((acc, status) => {
        acc.push(status.color)
        return acc
      }, [])
    },
    statusPercantages() {
      return this.statusesMap.reduce((acc, status) => {
        acc.push(status.count / this.totalTasks * 100)
        return acc
      }, [])
    },
  },
  mounted() {
    const chartdata = {
      labels: this.statusLabels,
      datasets: [
        {
          label: 'Board Total status by Percentage',
          backgroundColor: this.statusColors,
          data: this.statusPercantages
        }
      ]
    }

    this.renderChart(chartdata, this.options)

  },
  created() {
    this.createStatusesMap()
    // console.log(this.totalTasks);
    // console.log(this.statusPercantages);

  },
}
</script>

