'use strict';

/* global $, store, api */

// eslint-disable-next-line no-unused-vars
const videoList = (function(){
  const generateListItem = function (video) {
    return `<li class="js-video-item" id='${video.id}'>
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
    <button id="${video.id}">Cancel</button>`);
  };

  const handleAddYoutubeVideo = function() {
    $('.results').on('click', '.js-video-item', function(event) {
      const id = $(event.currentTarget).attr('id');
  
      const video = store.videos.find(video => video.id === id);
      addYoutubeVideo(video);

      
    });
  };  

  // const handleCancelButton = function (){
  //   $('ul').on('click', 'button', function(event){
  //     console.log(event.currentTarget);
  //   })
  // }

  
  //listen for when user clicks on thumbnail
  //add iframe html to DOM x 
  //maybe some toggle button to close out of embedded youtube video

  const bindEventListeners = function(){
    handleFormSubmit();
    handleAddYoutubeVideo();
  };
  
  return {
    bindEventListeners,
  };


}());

// let obj = {
//   id: 'gjNukU-3jPk',
//   title: 'test1'
// };