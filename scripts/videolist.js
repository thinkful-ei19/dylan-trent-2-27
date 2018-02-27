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
        console.log(response);
        const videos = api.decorateResponse(response);
        store.setVideos(videos);
        render();
      });
    });
  };

  const addYoutubeVideo = function(video){
    $(`#${video.id}`).html(`<p>${video.title}</p>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id}" 
    frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    <button>Cancel</button>`);
  };


  //listen for when user clicks on thumbnail
  //add iframe html to DOM
  //maybe some toggle button to close out of embedded youtube video

  const bindEventListeners = function(){
    handleFormSubmit();
  };
  
  return {
    bindEventListeners,
    addYoutubeVideo
  };


}());

let obj = {
  id: 'gjNukU-3jPk',
  title: 'test1'
};