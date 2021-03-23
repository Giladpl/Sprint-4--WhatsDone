<template>
  <section class="record-msg">
    <audio-recorder
      upload-url="@/assets/sound/"
      :attempts="3"
      :time="2"
      :before-recording="callback"
      :pause-recording="callback"
      :after-recording="callback"
      :select-record="callback"
      :before-upload="callback"
      :successful-upload="callback"
      :failed-upload="callback"
    />
    <audio-player src="/demo/example.mp3" />
    <!-- <ul v-if="sounds.length > 0" class="clean-list">
         <li v-for="sound in sounds" :key="sound.id" class="flex">
            <i class="el-icon-video-play" @click="playSound(sound)">Play</i>
            <i class="el-icon-video-pause" @click="pauseSound(sound)">Pause</i>
         </li>
     </ul> -->
  </section>
</template>

      // :headers="headers"

<script>
export default {
  data() {
    return {
      sounds: null,
    };
  },
  methods: {
   async callback(data) {
      console.debug(data);
      const tmpSound = await data;
      // this.sounds.push(tmpSound[1]);
      console.log('sounds obj:', tmpSound);
      tmpSound.play();
    },

    playSound(sound) {
      console.log(sound);
      sound.play();
    },
    pausePlay(sound) {
      sound.pause();
    },
  },
  created() {
    this.sounds = [];
  },
};
</script>
