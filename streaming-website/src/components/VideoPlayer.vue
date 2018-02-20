<template>
  <div class="hello">
    <h1 @click="showVideo">{{ $props.name}}</h1>
    <div v-if="show">
      <video controls height="340" width="480">
        <source :src="$props.src" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoPlayerControls",
  data() {
    return {
      show: false
    };
  },
  methods: {
    showVideo() {
      this.show = !this.show;
    }
  },
  props: {
    src: {
      type: String
    },
    name: {
      type: String
    }
  }
};
</script>

<style scoped>
.hello {
  border: 2px solid red;
  margin: 10px;
}

div video {
  padding: 0;
  margin: 0;
  border: 1px solid black;
}
.hello h1 {
  cursor: pointer;
}
</style>
