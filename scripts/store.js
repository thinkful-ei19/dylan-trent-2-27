'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function(){
  const videos = [];

  function setVideos(videos) {
    this.videos = videos;
  }
  return {
    videos,
    setVideos
  };
  
}());
