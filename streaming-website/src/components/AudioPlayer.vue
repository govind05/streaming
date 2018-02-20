<template>
  <div class="hello">
    <h1 @click="showAudio">{{ $props.name}}</h1>
    <div v-if="show">
     <audio controls>
       <source :src="$props.src" type="audio/mp3" >
     </audio>
    </div>
  </div>
</template>

<script>
import videoplayer from "./VideoPlayer";

export default {
  name: "AudioPlayer",
  props: {
    name: {
      type: String
    },
    src: {
      type: String
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods:{
    showAudio(){
      this.show = !this.show;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  border: 2px solid red;
  margin: 10px;
}

div audio {
  padding: 0;
  margin: 0;
  border: 1px solid black;
}
.hello h1 {
  cursor: pointer;
}
</style>
