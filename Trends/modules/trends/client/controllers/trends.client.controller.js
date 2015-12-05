'use strict';

// Trends controller
angular.module('trends').controller('TrendsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Trends',
  function ($scope, $stateParams, $location, Authentication, Trends) {
    $scope.authentication = Authentication;

    // Create new Trend
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'trendForm');

        return false;
      }

      // Create new Trend object
      var trend = new Trends({
        topic: this.topic,
        state: this.state,
        strength: this.strength
      });

      // Redirect after save
      trend.$save(function (response) {
        $location.path('trends/' + response._id);

        // Clear form fields
        $scope.topic = '';
        $scope.state = '';
        $scope.strength = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Trend
    $scope.remove = function (trend) {
      if (trend) {
        trend.$remove();

        for (var i in $scope.trends) {
          if ($scope.trends[i] === trend) {
            $scope.trends.splice(i, 1);
          }
        }
      } else {
        $scope.trend.$remove(function () {
          $location.path('trends');
        });
      }
    };

    // Update existing Trend
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'trendForm');

        return false;
      }

      var trend = $scope.trend;

      trend.$update(function () {
        $location.path('trends/' + trend._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Trends
    $scope.find = function () {
      $scope.trends = Trends.query();
    };

    // Find existing Trend
    $scope.findOne = function () {
      $scope.trend = Trends.get({
        trendId: $stateParams.trendId
      });
    };
  }
]);