'use strict';

// Setting up route
angular.module('trends').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('trends', {
        abstract: true,
        url: '/trends',
        template: '<ui-view/>'
      })
      .state('trends.list', {
        url: '',
        templateUrl: 'modules/trends/client/views/list-trends.client.view.html'
      })
      .state('trends.create', {
        url: '/create',
        templateUrl: 'modules/trends/client/views/create-trend.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('trends.view', {
        url: '/:trendId',
        templateUrl: 'modules/trend/client/views/view-trend.client.view.html'
      })
      .state('trends.edit', {
        url: '/:trendId/edit',
        templateUrl: 'modules/trends/client/views/edit-trend.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
