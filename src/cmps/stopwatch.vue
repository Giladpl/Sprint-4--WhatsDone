<template>
  <div class="stopwatch">
    <div
      class="el-icon-video-play"
      @click="start"
    ></div>
    <p>{{timeToShow}}</p>
    <div
      class="el-icon-video-pause"
      @click="stop"
    ></div>
    <!-- <button @click="reset">Reset</button> -->
  </div>
</template>

<script>
export default {
  name: "stopwatch",
  data() {
    return {
      elapsedTime: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      timer: null,
    };
  },
  methods: {
    start() {
      this.timer = setInterval(() => this.timeAdd(), 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
    reset() {
      this.elapsedTime = 0;
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
      var secToShow = this.seconds
      var minToShow = this.minutes
      var hoursToShow = this.hours

      if (this.seconds < 10) secToShow = this.seconds.toString().padStart(2, '0');
      if (this.minutes < 10) minToShow = this.minutes.toString().padStart(2, '0');
      if (this.hours < 10) hoursToShow = this.hours.toString().padStart(2, '0');

      return `${hoursToShow}:${minToShow}:${secToShow}`
    },
  }
}
</script>

<style scoped>
.stopwatch {
  display: flex;
  width: 100px;
  background-color: inherit;
}
</style>