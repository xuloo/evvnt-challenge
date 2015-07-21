'use strict';

/**
 * @ngdoc function
 * @name evvntApp.controller:EvvntCtrl
 * @description
 * # EvvntCtrl
 * Controller of the evvntApp
 */
angular.module('evvntApp')
  .controller('EvvntCtrl', ['$scope', '$log', '$mdSidenav', '$mdDialog', '$controller', 'evvntService', 'moment', function ($scope, $log, $mdSidenav, $mdDialog, $controller, $evvntService, $moment) {

    $scope.fromDate = null;

    function after() {
      $evvntService.after($moment($scope.fromDate).format("YYYY-MM-DD")).then(
        function(response) {
          $scope.events = response;
        },
        function(error) {
          $log.error(error);
        }
      )
    }

    $scope.$watch('fromDate', function() {
      if ($scope.fromDate) {
        after();
      }
    });

    $scope.toDate = null;

    $scope.selectedEvent = null;
    $scope.selectedVenue = null;

    $scope.$watch('selectedVenue', function() {
      if ($scope.selectedVenue) {
        $scope.eventsForVenue($scope.selectedVenue);
      }
    });

    $scope.events = [];
    $scope.totalEvents = 0;
    $scope.eventsPerPage = 10;

    $scope.toggleSidenav = function(name) {
      $log.info("toggling sidenav " + name);
      $mdSidenav(name).toggle();
    };

    function getResultsPage(pageNumber) {
        $evvntService.all(pageNumber).then(
          function(response) {
            $scope.events = response.events;
            $scope.totalEvents = response.total;
            //$scope.selectedItemChange($scope.events[0]);
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

    $scope.loadVenues = function() {
      $evvntService.venues().then(
        function(response) {
          $log.info(response);
          $scope.venues = response;
        },
        function(error) {
          $log.error(error);
        }
      );
    };

    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage);
    };

    $scope.selectEvent = function(e) {
      $scope.selectedEvent = e;
      $scope.toggleSidenav('left');
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
          $scope.selectedEvent = $scope.events[0];
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
      $log.info('Text changed to \'' + text + '\'');
      if (text !== '') {
        $scope.selectedVenue = null;
      }
    };

    $scope.selectedItemChange = function(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
      if (item) {
        $scope.selectedVenue = null;
        $scope.selectedEvent = item;
        getResultsPage(1);
      }
    };

    $scope.showFromDate = function(ev) {
      $mdDialog.show({
        controller: DateDialogController,
        templateUrl: 'views/fromDate.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
      })
      .then(function(from) {
        $scope.alert = 'from date: "' + from + '".';
        $scope.fromDate = from;
        if ($scope.selectedEvent) {
          $scope.selectedEvent = null;
        }
        if ($scope.selectedVenue) {
          $scope.selectedVenue = null;
        }
      }, function() {
        $scope.alert = 'You cancelled the dialog.';
      });
    };

    $scope.showToDate = function(ev) {
      $mdDialog.show({
        controller: DateDialogController,
        templateUrl: 'views/toDate.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
      })
      .then(function(to) {
        $scope.alert = 'to date: "' + to + '".';
        $scope.toDate = to;
        if ($scope.selectedEvent) {
          $scope.selectedEvent = null;
        }
        if ($scope.selectedVenue) {
          $scope.selectedVenue = null;
        }
      }, function() {
        $scope.alert = 'You cancelled the dialog.';
      });
    };

  }]);

  function DateDialogController($scope, $log, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.selectDate = function(from) {
      $log.info("closing window with date: " + from);
      $mdDialog.hide(from);
    };
  }
