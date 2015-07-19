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

    getResultsPage(1);

    $scope.pagination = {
        current: 1
    };

    allVenues();

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

    $scope.eventsForVenue = function(venue) {
      $log.info("finding all events for venue '" + venue.name + "'");
      $evvntService.forVenue(venue).then(
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

    function allVenues() {
      $evvntService.venues().then(
        function(response) {
          $log.info(response);
          $scope.venues = response;
        },
        function(error) {
          $log.error(error);
        }
      )
    }
  }]);
