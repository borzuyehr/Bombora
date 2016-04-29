'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.trendoptions = {
      trend1 : 'Database Development',
      trend2 : 'Wireless Service Provider',
      trend3 : 'Health Analytics',
      trend4 : 'IT management',
      trend5 : 'Anti Virus'
    };
    $scope.selectedtrend = $scope.trendoptions.trend1;

    var states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];
    $scope.chartData = [[50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50]];
    $scope.createDummyData = function () {
      var dataTemp = {};
      
      angular.forEach(states, function (state, key) {
        dataTemp[state] = { value: Math.round(Math.random()*100) };
      });
      $scope.dummyData = dataTemp;
      $scope.chartData = [[$scope.dummyData.AK.value, $scope.dummyData.AL.value, $scope.dummyData.AR.value, $scope.dummyData.AZ.value, $scope.dummyData.CA.value, $scope.dummyData.CO.value, $scope.dummyData.CT.value, $scope.dummyData.DE.value, $scope.dummyData.FL.value, $scope.dummyData.GA.value,
                           $scope.dummyData.HI.value, $scope.dummyData.IA.value, $scope.dummyData.ID.value, $scope.dummyData.IL.value, $scope.dummyData.IN.value, $scope.dummyData.KS.value, $scope.dummyData.KY.value, $scope.dummyData.LA.value, $scope.dummyData.MA.value, $scope.dummyData.MD.value,
                           $scope.dummyData.ME.value, $scope.dummyData.MI.value, $scope.dummyData.MN.value, $scope.dummyData.MO.value, $scope.dummyData.MS.value, $scope.dummyData.MT.value, $scope.dummyData.NC.value, $scope.dummyData.ND.value, $scope.dummyData.NE.value, $scope.dummyData.NH.value,
                           $scope.dummyData.NJ.value, $scope.dummyData.NM.value, $scope.dummyData.NV.value, $scope.dummyData.NY.value, $scope.dummyData.OH.value, $scope.dummyData.OK.value, $scope.dummyData.OR.value, $scope.dummyData.PA.value, $scope.dummyData.RI.value, $scope.dummyData.SC.value,
                           $scope.dummyData.SD.value, $scope.dummyData.TN.value, $scope.dummyData.TX.value, $scope.dummyData.UT.value, $scope.dummyData.VA.value, $scope.dummyData.VT.value, $scope.dummyData.WA.value, $scope.dummyData.WI.value, $scope.dummyData.WV.value, $scope.dummyData.WY.value]];
      $scope.pieData = [$scope.dummyData.AK.value, $scope.dummyData.AL.value, $scope.dummyData.AR.value, $scope.dummyData.AZ.value, $scope.dummyData.CA.value, $scope.dummyData.CO.value, $scope.dummyData.CT.value, $scope.dummyData.DE.value, $scope.dummyData.FL.value, $scope.dummyData.GA.value,
                           $scope.dummyData.HI.value, $scope.dummyData.IA.value, $scope.dummyData.ID.value, $scope.dummyData.IL.value, $scope.dummyData.IN.value, $scope.dummyData.KS.value, $scope.dummyData.KY.value, $scope.dummyData.LA.value, $scope.dummyData.MA.value, $scope.dummyData.MD.value,
                           $scope.dummyData.ME.value, $scope.dummyData.MI.value, $scope.dummyData.MN.value, $scope.dummyData.MO.value, $scope.dummyData.MS.value, $scope.dummyData.MT.value, $scope.dummyData.NC.value, $scope.dummyData.ND.value, $scope.dummyData.NE.value, $scope.dummyData.NH.value,
                           $scope.dummyData.NJ.value, $scope.dummyData.NM.value, $scope.dummyData.NV.value, $scope.dummyData.NY.value, $scope.dummyData.OH.value, $scope.dummyData.OK.value, $scope.dummyData.OR.value, $scope.dummyData.PA.value, $scope.dummyData.RI.value, $scope.dummyData.SC.value,
                           $scope.dummyData.SD.value, $scope.dummyData.TN.value, $scope.dummyData.TX.value, $scope.dummyData.UT.value, $scope.dummyData.VA.value, $scope.dummyData.VT.value, $scope.dummyData.WA.value, $scope.dummyData.WI.value, $scope.dummyData.WV.value, $scope.dummyData.WY.value];
    };
    $scope.createDummyData();
    

    $scope.changeHoverRegion = function (region) {
      $scope.hoverRegion = region;
    };

    $scope.options = {
      scaleLabel : function (label) {
        return ' ' + label.value;  
      } 

    };
    $scope.labels = states;
    $scope.series = ['Composite Score'];    
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
        alert(scope.elementId + ' Composite Score: ' + scope.dummyData[scope.elementId].value);
      };
      scope.regionMouseOver = function () {
        scope.hoverRegion = scope.elementId;
        element[0].parentNode.appendChild(element[0]);
      };
      scope.regionMouseLeave = function() {
        scope.hoverRegion = 0;
      };
      element.attr('ng-click', 'regionClick()');
      element.attr('ng-attr-fill', '{{dummyData[elementId].value/100 | map_colour}}');
      element.attr('ng-mouseover', 'regionMouseOver()');
      element.attr('ng-mouseleave', 'regionMouseLeave()');
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