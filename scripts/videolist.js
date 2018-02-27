'use strict';

/* global $, store, api */

// eslint-disable-next-line no-unused-vars
const videoList = (function(){
  const generateListItem = function (video) {
    return `<li id='${video.id}'>
                  <p>${video.title}</p>
                  <img src='${video.thumbnail}'>
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
      searchInput.val('');
      api.fetchVideos(searchTerm, function(response) {
        const videos = api.decorateResponse(response);
        store.setVideos(videos);
        render();
      });
    });
  };

  const bindEventListeners = function(){
    handleFormSubmit();
  };
  
  return {
    bindEventListeners
  };


}());