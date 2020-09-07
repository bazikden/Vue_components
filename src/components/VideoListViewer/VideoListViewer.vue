<template>
  <div class="viewer-container" :class="{'visible':display}">
    <div class="wrapper" @click="onContainerClick"></div>
    <div class="video-container" :class="{'opened':opened}">
      <LazyYoutubeVideo
        v-if="opened"
        :thumbnailListeners="thumbnailListeners"
        :src="src" 
        preview-image-size="maxresdefault" 
        :thumbnail="thumbnail" 
        :iframeAttributes="iframeAttributes"
      />
    </div>
  </div>
</template>

<script>
import LazyYoutubeVideo from "vue-lazy-youtube-video";
import "vue-lazy-youtube-video/dist/style.css";
export default {
  name: "VideoListViewer",
  components: { LazyYoutubeVideo },
  props: {
    display: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  data() {
    return {
      iframeAttributes:{ allowfullscreen: true, frameborder: 0, allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' },
      thumbnailListeners:{foo:() => {}},
      opened: false,
    };
  },
  watch: {
    display: function (value) {
      if (value === true) {
        setTimeout(() => {
          this.opened = true;
        }, 100);
      } else {
        this.opened = false;
      }
    },
  },

  methods: {
    onContainerClick() {
      this.opened = false;
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.viewer-container {
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  transition: 1s ease-in;
  .wrapper {
    position: fixed;
    width: 100%;
    height: 100vh;
    background: black;
    opacity: 0.6;
  }
  .video-container {
    position: relative;
    width: 50%;
    background: #fff;
    border-radius: 20px;
    transform: scale(0);
    transition: transform 1s ease-in-out;
    padding: 20px;
    z-index: 10;
  }
  .opened {
    transform: scale(1);
  }
}
.visible {
  display: flex;
}
.y-video__inner {
  padding: 0;
  width: 100%;
  height: 100%;
}

@media (max-width: 1024px)  {
  .viewer-container{
    .video-container{
      width: 90%;
    }

  }
}
</style>