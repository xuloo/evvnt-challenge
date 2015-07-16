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

    $scope.event = null;

    $evvntService.all().then(
      function(response) {
        $log.info(response);
        $scope.events = response;
      },
      function(error) {
        $log.error(error);
      }
    );

    $scope.selectEvent = function(event) {
      $log.info("selected event " + event.id);
      $scope.event = event;
    };

    $scope.moreLike = function(event) {
      $log.info("finding more like " + event.id);
    }
  }]);
