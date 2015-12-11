'use strict';

// Module to control the view of the header
angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus',
  function ($scope, $state, Authentication, Menus) {
    
    // // Set up our canvas on the page before doing anything.
    // var myCanvas = document.createElement('canvas');
    // myCanvas.width = 1500;
    // myCanvas.height = 593;
    // document.getElementsByTagName('body') [0].appendChild(myCanvas);
      
    // // Get drawing context for the Canvas
    // var myCanvasContext = myCanvas.getContext('2d');
      
    // // Load up our image.
    // var source = new Image();
    // source.src = 'https://upload.wikimedia.org/wikipedia/commons/3/32/Blank_US_Map.svg';
    // source.width = '100%';
    // source.height = '100%';
    // // Render our SVG image to the canvas once it loads.
    // source.onload = function(){
    //     myCanvasContext.drawImage(source,170,0);
    // }

    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);
