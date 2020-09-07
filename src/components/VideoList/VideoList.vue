<template>
    <div>
            <h2>Videos</h2>
    <VideoListViewer 
      :display="display"
      @close="onClose"
      :src="videoSrc" 
      :thumbnail="thumbnail"
     
      />
    <div class="video-list-container">
      <div class="video-item" v-for="(video,index) in videos" :key="video.videoId + index" @click="onOpenClick(video.videoId)">
        <img class="video-image" :src="imageBasewUrl + video.videoId + imageBasewUrlEnd" alt="" />
      </div>
    </div>
    </div>
</template>

<script>
import VideoListViewer from "../VideoListViewer/VideoListViewer";



const initialVideos = [
  {
    videoId: "7EjxruIJvmI",
  },
  {
    videoId: "dqQ2YtE0la8",
  },
  {
    videoId: "J9fAvi1T-e4",

  },
];

export default {
  name: "VideoList",
  components: {
    VideoListViewer,
  },
  data() {
    return {
      previewImageSize: "maxresdefault",
      display: false,
      videos: initialVideos,
      thumbnail:'',
      videoSrc: '',
      embdedBaseUrl: 'https://www.youtube.com/embed/',
      imageBasewUrl: 'http://img.youtube.com/vi/',
      imageBasewUrlEnd: '/0.jpg'
    };
  },
  methods: {
    onOpenClick(id) {
      this.display = true;
      const videoSrc = this.embdedBaseUrl + id
      this.thumbnail = {
         webp: this.imageBasewUrl + id  + this.imageBasewUrlEnd,
         jpg: this.imageBasewUrl + id + this.imageBasewUrlEnd
      } 
      this.imageBasewUrl + id +this.imageBasewUrlEnd

      this.$set(this,'videoSrc',videoSrc)
      console.log(id)
    },
    onClose() {
      this.display = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .video-list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  .video-item {
    width: 300px;
    cursor: pointer;
    img{
      width: 100%;
    }
  }

  }
</style>