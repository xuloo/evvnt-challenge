'use strict';

/**
 * @ngdoc overview
 * @name evvntApp
 * @description
 * # evvntApp
 *
 * Main module of the application.
 */
angular
  .module('evvntApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularUtils.directives.dirPagination'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/evvnt.html',
        controller: 'EvvntCtrl',
        controllerAs: 'evvnt'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
