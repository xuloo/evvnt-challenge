'use strict';

/**
 * @ngdoc function
 * @name evvntApp.controller:EvvntCtrl
 * @description
 * # EvvntCtrl
 * Controller of the evvntApp
 */
angular.module('evvntApp')
  .controller('EvvntCtrl', ['$scope', '$log', 'evvntService', function ($scope, $log, $evvntService) {

    $evvntService.all().then(
      function(response) {
        $scope.events = response;
      },
      function(error) {
        $log.error(error);
      }
    )
  }]);
