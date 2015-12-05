'use strict';

//Trends service used for communicating with the articles REST endpoints
angular.module('trends').factory('Trends', ['$resource',
  function ($resource) {
    return $resource('api/trends/:trendId', {
      trendId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
