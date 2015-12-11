'use strict';

// Creates the controller for the main section of the web-app, adds authentication functionality
angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }
]);
