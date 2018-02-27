'use strict';

/* global $, store, api */

// eslint-disable-next-line no-unused-vars
const videoList = (function(){
  const generateListItem = function (video) {

    let imageClass = '';
    let iframeClass = 'hidden';

    if (video.isVideoShowing) {
      imageClass = 'hidden';
      iframeClass = '';
    }

    return `<li class="js-video-item" id='${video.id}'>
                  <p>${video.title}</p>
                  <a target="_blank" href="https://www.youtube.com/channel/${video.channelId}">${video.channelTitle}</a>
                  <img class="${imageClass}" src='${video.thumbnail}'>
                  <iframe class="${iframeClass}" width="560" height="315" src="https://www.youtube.com/embed/${video.id}" 
                  frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                  <button class="js-toggle-button">Toggle View</button>
                </li>`;

  };
  const render = function () {
    const videoHTML = store.videos.map(generateListItem);
    $('.results').html(videoHTML);
  };
  const handleFormSubmit = function () {
    $('form').submit(function(event) {
      event.preventDefault();
      const searchInput = $('#search-term');
      const searchTerm = searchInput.val();
      store.searchTerm = searchTerm;
      searchInput.val('');
      api.fetchVideos(searchTerm, '', function(response) {
        console.log(response);
        const videos = api.decorateResponse(response);
        store.setVideos(videos);
        render();
      });
    });
  };

  // const addYoutubeVideo = function(video){
  //   $(`#${video.id}`).html(`<p>${video.title}</p>
  //   <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id}" 
  //   frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  //   <button id="${video.id}">Cancel</button>`);
  // };

  const toggleIsVideoShowing = function(video) {
    video.isVideoShowing = !video.isVideoShowing;
  };

  const handleToggleYoutubeVideo = function() {
    $('.results').on('click', '.js-toggle-button', function(event) {
      const id = $(event.currentTarget).parent().attr('id');
      const video = store.videos.find(video => video.id === id);
      toggleIsVideoShowing(video);
      render();
    });
  };

  
  const handlePrevButton = function (){
    $('#previous-button').click(function(){
      api.fetchVideos(store.searchTerm, store.prevPageToken, function(response) {
        const videos = api.decorateResponse(response);
        store.setVideos(videos);
        render();
      });
    });
  };
  


  const handleNextButton = function (){
    $('#next-button').click(function(){
      api.fetchVideos(store.searchTerm, store.nextPageToken, function(response) {
        const videos = api.decorateResponse(response);
        store.setVideos(videos);
        render();
      });
    });
  };


  

  const bindEventListeners = function(){
    handleFormSubmit();
    handleToggleYoutubeVideo();
    handlePrevButton();
    handleNextButton();
  };
  
  return {
    bindEventListeners,
  };


}());

// let obj = {
//   id: 'gjNukU-3jPk',
//   title: 'test1'
// };