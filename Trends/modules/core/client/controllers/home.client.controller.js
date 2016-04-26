'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    var states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
    $scope.createDummyData = function () {
      var dataTemp = {};
      angular.forEach(states, function (state, key) {
        dataTemp[state] = { value: Math.random()*100 };
      });
      $scope.dummyData = dataTemp;
    };
    $scope.createDummyData();

    $scope.changeHoverRegion = function (region) {
      $scope.hoverRegion = region;
    };

    $scope.options = {};
    $scope.data = {};
  }
]);

angular.module('core').directive('svgmap', ['$compile', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'modules/core/client/img/map/Blank_US_Map.svg',
    link: function (scope, element, attrs) {
      var regions = element[0].querySelectorAll('.state');
      angular.forEach(regions, function (path, key) {
        var regionElement = angular.element(path);
        regionElement.attr('region', '');
        regionElement.attr('dummy-data', 'dummyData');
        regionElement.attr('hover-region', 'hoverRegion');
        $compile(regionElement)(scope);
      });
    }
  };
}]);

angular.module('core').directive('region', ['$compile', function ($compile) {
  return {
    restrict: 'A',
    scope: {
      dummyData: '=',
      hoverRegion: '='
    },
    link: function (scope, element, attrs) {
      scope.elementId = element.attr('id');
      scope.regionClick = function () {
        alert(scope.dummyData[scope.elementId].value);
      };
      scope.regionMouseOver = function () {
        scope.hoverRegion = scope.elementId;
        element[0].parentNode.appendChild(element[0]);
      };
      element.attr('ng-click', 'regionClick()');
      element.attr('ng-attr-fill', '{{dummyData[elementId].value/100 | map_colour}}');
      element.attr('ng-mouseover', 'regionMouseOver()');
      element.attr('ng-class', '{active:hoverRegion==elementId}');
      element.removeAttr('region');
      $compile(element)(scope);
    }
  };
}]);

angular.module('core').filter('map_colour', [function () {
  return function (input) {
    var b = 255 - Math.floor(input * 255);
    var g = Math.floor(input * 255);
    return 'rgba(255,' + g + ',' + b + ',1)';
  };
}]);

angular.module('core').controller('GraphController',
  function ($scope) {
    $scope.labels = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
                     'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD',
                     'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH',
                     'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
                     'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];
    $scope.series = ['Series A'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40, 33, 90, 14,
       15, 29, 34, 73, 53, 55, 40, 33, 90, 14,
       65, 59, 80, 81, 56, 55, 40, 33, 90, 14,
       65, 59, 80, 81, 56, 55, 40, 33, 90, 14,
       65, 59, 80, 81, 56, 55, 40, 33, 90, 14]
    ];
  });


