<template>
  <div class="stopwatch">
    <div class="el-icon-video-play" @click="start"></div>
    <p>{{formattedElapsedTime}}</p>
    <div class="el-icon-video-pause" @click="stop">Stop</div>
    <!-- <button @click="reset">Reset</button> -->
  </div>
</template>

<script>
export default {
  name: "stopwatch",
  data() {
    return {
      elapsedTime: 0,
      timer: null,
    };
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    }
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1;
      }, 1);
    },
    stop() {
      clearInterval(this.timer);
    },
    reset() {
      this.elapsedTime = 0;
    }
  }
};
</script>

<style scoped>
.stopwatch {
  display: flex;
  width: 100px;
  background-color: inherit;
}
</style>