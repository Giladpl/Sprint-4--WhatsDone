<template>
  <section class="record-msg">
    <vue-record-audio class="audio-recorder" @result="onResult"></vue-record-audio>
     <ul v-if="sounds.length > 0" class="clean-list">
         <li v-for="sound in sounds" :key="sound.id" class="flex">
            <i class="el-icon-video-play" @click="playSound(sound)">Play</i>
            <i class="el-icon-video-pause" @click="pauseSound(sound)">Pause</i>
         </li>
     </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      sounds: null,
    };
  },
  methods: {
    onResult(data) {
      console.log("The blob data:", data);
      console.log("Downloadable audio", window.URL.createObjectURL(data));
    // this.sounds.push(datwindow.URL.createObjectURL(data));
    },
    playSound(sound) {
        console.log(sound);
       sound.play();
    },
    pausePlay(sound) {
       sound.pause();
    }
  },
  created() {
      this.sounds = [];
  }
};
</script>
