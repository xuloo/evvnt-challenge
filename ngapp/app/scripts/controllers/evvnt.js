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

    $scope.events = [];
    $scope.totalEvents = 0;
    $scope.eventsPerPage = 10;

    getResultsPage(1);

    $scope.pagination = {
        current: 1
    };

    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage);
    };

    function getResultsPage(pageNumber) {
        $evvntService.all(pageNumber).then(
          function(response) {
            $log.info("received " + response.count + " responses for page " + pageNumber);
            $scope.events = response.events;
            $scope.totalEvents = response.total;
          },
          function(error) {
            $log.error(error);
          }
        )
    }

    $scope.selectEvent = function(event) {
      $log.info("selected event " + event.id);
      $scope.event = event;
    };

    $scope.moreLike = function(event) {
      $log.info("finding more like " + event.id);
    }

    $scope.searchByKeyword = function(q) {
      $log.info("searching for '" + q + "''");
      $evvntService.search(q). then(
        function(response) {
          $log.info(response);
          $scope.events = response;
        },
        function(error) {
          $log.error(error);
        }
      )
    }

    $scope.clearSearch = function() {
      $log.info("clearing search");
      showAll();
    }

    function showAll() {
      $evvntService.all().then(
        function(response) {
          $log.info(response);
          $scope.events = response;
        },
        function(error) {
          $log.error(error);
        }
      );
    }
  }]);
