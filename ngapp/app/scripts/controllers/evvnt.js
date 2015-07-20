'use strict';

/**
 * @ngdoc function
 * @name evvntApp.controller:EvvntCtrl
 * @description
 * # EvvntCtrl
 * Controller of the evvntApp
 */
angular.module('evvntApp')
  .controller('EvvntCtrl', ['$scope', '$log', '$mdSidenav', 'evvntService', function ($scope, $log, $mdSidenav, $evvntService) {

    $scope.selectedEvent = null;
    $scope.selectedVenue = null;

    $scope.events = [];
    $scope.totalEvents = 0;
    $scope.eventsPerPage = 10;

    function toggleSidenav(name) {
      $mdSidenav(name).toggle();
    }

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

    $scope.selectEvent = function(e) {
      $scope.selectedEvent = e;
      toggleSidenav('left');
    };

    $scope.searchByKeyword = function(q) {
      $evvntService.search(q).then(
        function(response) {
          $scope.events = response;
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

    $scope.querySearch = function(query) {
      return $evvntService.search(query);
    };

    $scope.searchTextChange = function(text) {
      $log.info('Text changed to ' + text);
    };

    $scope.selectedItemChange = function(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    };

  }]);
