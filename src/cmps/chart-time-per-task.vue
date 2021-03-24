

<script>
import { Bar } from "vue-chartjs";
// import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";

export default {
  extends: Bar,
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        pieceLabel: {
          mode: "percentage",
          precision: 1,
        },
      },
      timePerGroupMap: {},
    };
  },
  methods: {
    createTimePerGroupMap() {
      this.currBoard.groups.forEach((group) => {
        this.timePerGroupMap[group.title] = 0;
        group.tasks.forEach((task) => {
          this.timePerGroupMap[group.title] += +(
            task.secondsWorkedOn / 3600
          ).toFixed(2);
        });
      });
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
    },
    titles() {
      return Object.keys(this.timePerGroupMap);
    },
    hours() {
      return Object.values(this.timePerGroupMap);
    },
    colors() {
      return this.titles.map(() => {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      });                   //to put in service
    },
  },
  mounted() {
    const chartdata = {
      labels: this.titles,
      datasets: [
        {
          label: "Total Time Per Task in Hours",
          backgroundColor: this.colors,
          data: this.hours,
        },
      ],
    };

    this.renderChart(chartdata, this.options);
  },
  created() {
    this.createTimePerGroupMap();
    console.log(this.timePerGroupMap);
  },
};
</script>

