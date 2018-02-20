<template>
  <div id='app'>
    <div id="button" @click="showAudioList">Audio</div>
    <div id="button" @click="showVideoList">Video</div>
    <ul v-if="showVideo">
      <li v-for="video in videos" :key="video.name">
        <videoplayer :src="video.videoSrc" :name="video.name" />
      </li>
    </ul>
    <ul v-if="showAudio">
      <li v-for="audio in audios" :key="audio.name">
        <audioplayer :src="audio.audioSrc" :name="audio.name" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import VideoPlayer from "./components/VideoPlayer";
import AudioPlayer from "@/components/AudioPlayer";

export default {
  name: "App",
  data: () => {
    return {
      videos: [],
      audios: [],
      showAudio: false,
      showVideo: false
    };
  },
  components: {
    videoplayer: VideoPlayer,
    audioplayer: AudioPlayer
  },
  methods: {
    getAllVideos() {
      axios
        .get("http://localhost:3000/video")
        .then(res => res.data.map(data => this.videos.push(data)))
        .catch(err => err);
    },
    getAllAudios() {
      axios
        .get("http://localhost:3000/audio")
        .then(res => res.data.map(data => this.audios.push(data)))
        .catch(err => err);
    },
    showAudioList() {
      this.showVideo = false;
      this.showAudio = !this.showAudio;
    },
    showVideoList() {
      this.showAudio = false;
      this.showVideo = !this.showVideo;
    }
  },
  created() {
    this.getAllVideos();
    this.getAllAudios();
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app ul {
  list-style: none;
}
#app ul li h3 {
  cursor: pointer;
}
#button {
  border: 2px solid #333;
  display: inline-block;
  padding: 5px;
  cursor: pointer;
}

#button:hover{
  background-color: #333;
  color: white;
}
</style>
