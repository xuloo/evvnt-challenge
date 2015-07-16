'use strict';

/**
 * @ngdoc service
 * @name evvntApp.evvntService
 * @description
 * # evvntService
 * Service in the evvntApp.
 */
angular.module('evvntApp')
  .service('evvntService', function ($q, $http, $log) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {

      all: function() {
        var deferred = $q.defer();

        $http.get('/api/events').then(
          function(response) {
            deferred.resolve(response.data);
          },
          function(error) {
            deferred.reject(error);
          }
        )
      }

    };
  });
