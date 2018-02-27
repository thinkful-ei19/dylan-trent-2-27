'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function(){
  const videos = [];

  let nextPageToken = '';
  let prevPageToken = '';
  let searchTerm;

  function setVideos(videos) {
    this.videos = videos;
  }
  return {
    videos,
    setVideos,
    nextPageToken,
    prevPageToken
  };
  
}());
