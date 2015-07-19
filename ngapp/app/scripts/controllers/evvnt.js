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
    $scope.venue = null;

    $scope.events = [];
    $scope.totalEvents = 0;
    $scope.eventsPerPage = 10;

    function getResultsPage(pageNumber) {
        $evvntService.all(pageNumber).then(
          function(response) {
            $scope.events = response.events;
            $scope.totalEvents = response.total;
          },
          function(error) {
            $log.error(error);
          }
        );
    }

    getResultsPage(1);

    $scope.pagination = {
        current: 1
    };

    function allVenues() {
      $evvntService.venues().then(
        function(response) {
          $log.info(response);
          $scope.venues = response;
        },
        function(error) {
          $log.error(error);
        }
      );
    }

    allVenues();


    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage);
    };

    $scope.selectEvent = function(event) {
      $scope.event = event;
    };

    $scope.searchByKeyword = function(q) {
      $evvntService.search(q). then(
        function(response) {
          $scope.events = response.events;
          $scope.totalEvents = response.total;
        },
        function(error) {
          $log.error(error);
        }
      );
    };

    $scope.clearSearch = function() {
      showAll();
    };

    $scope.eventsForVenue = function(venue) {
      $evvntService.forVenue(venue).then(
        function(response) {
          $scope.events = response.events;
          $scope.totalEvents = response.total;
        },
        function(error) {
          $log.error(error);
        }
      );
    };

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
