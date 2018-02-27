'use strict';

/* global $ */

// eslint-disable-next-line no-unused-vars
const api = (function(){
  const API_KEY = 'AIzaSyCLePqvqfba35noWou1wZtHtAejY2Zcs_U';
  
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  const fetchVideos = function (searchTerm, pageToken, callback) {
    const query = {
      q: `${searchTerm}`,
      maxResults: 5,
      key: API_KEY,
      part: 'snippet',
      pageToken
    };
  
    $.getJSON(BASE_URL, query, callback);

  
  
  };
  const decorateResponse = function (response) {
    const responseArray = response.items.map(element => {
      return {
        id: element.id.videoId,
        title: element.snippet.title,
        thumbnail: element.snippet.thumbnails.default.url,
        isVideoShowing: false 
      };
    });
    store.nextPageToken = response.nextPageToken;
    store.prevPageToken = response.prevPageToken;
    return responseArray;
  };

  return {
    BASE_URL,
    fetchVideos,
    decorateResponse
  };

}());