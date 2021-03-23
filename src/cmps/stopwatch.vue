<template>
  <div class="stopwatch">
    <div
      v-if="!isCounting"
      class="el-icon-video-play btn-stopwatch"
      @click="startTime"
    ></div>
    <div
      v-else
      class="el-icon-video-pause btn-stopwatch"
      @click="pauseTime"
    >
    </div>
      <p>{{timeToShow}}</p>
  </div>
</template>

<script>
export default {
  name: "stopwatch",
  props: {
    secondsWorkedOn: {
      type: Number,
      // required: true,
    },
  },
  data() {
    return {
      isCounting: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      timer: null,
    };
  },
  methods: {
    toggleTimer() {
      this.isCounting = !this.isCounting;
    },
    startTime() {
      this.toggleTimer()
      this.timer = setInterval(() => this.timeAdd(), 1000);
    },
    pauseTime() {
      this.toggleTimer()
      clearInterval(this.timer);
      this.$emit('addTimeToTask', { totalSeconds: this.totalSeconds })
    },
    timeAdd() {
      this.totalSeconds++
      this.seconds++;
      if (this.seconds >= 60) {
        this.seconds = 0;
        this.minutes++;
        if (this.minutes >= 60) {
          this.minutes = 0;
          this.hours++;
        }
      };
    },
  },
  computed: {
    timeToShow() {
      return new Date(this.totalSeconds * 1000).toISOString().substr(11, 8)
    },
  },
  created() {
    this.totalSeconds = this.secondsWorkedOn
  }
}
</script>
