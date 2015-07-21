'use strict';

/**
 * @ngdoc service
 * @name evvntApp.evvntService
 * @description
 * # evvntService
 * Service in the evvntApp.
 */
angular.module('evvntApp')
  .service('evvntService', function ($q, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {

      /**
       * Returns all the results, unfiltered.
       * optional 'p' argument specifies the page of results to return
       * (uses elasticsearch's default of 10 results per page).
       */
      all: function(p) {
        // default to showing the first page of results.
        if (typeof(p) === 'undefined') { p = 1; }

        var deferred = $q.defer();

        $http.get('/api/events', {params: {p: p}}).then(
          function(response) {
            deferred.resolve(response.data);
          },
          function(error) {
            deferred.reject(error);
          }
        );

        return deferred.promise;
      },

      search: function(q) {
        var deferred = $q.defer();

        $http.get('/api/events/search', {params: {q: q}}).then(
          function(response) {
            deferred.resolve(response.data);
          },
          function(error) {
            deferred.reject(error);
          }
        );

        return deferred.promise;
      },

      /**
       * Returns a search of results for events that are 'like' the one
       * supplied as an argument.
       * Here 'like' means similar category_id.
       */
      forVenue: function(v) {
        var deferred = $q.defer();

        $http.get('/api/events/forvenue/', {params: {v: v}}).then(
          function(response) {
            deferred.resolve(response.data);
          },
          function(error) {
            deferred.reject(error);
          }
        );

        return deferred.promise;
      },

      venues: function() {
        var deferred = $q.defer();

        $http.get('/api/venues').then(
          function(response) {
            deferred.resolve(response.data);
          },
          function(error) {
            deferred.reject(error);
          }
        );

        return deferred.promise;
      },

      after: function(date) {
        var deferred = $q.defer();

        $http.get('/api/events/after', {params: {after: date}}).then(
          function(response) {
            deferred.resolve(response);
          },
          function(error) {
            deferred.reject(error);
          }
        );

        return deferred.promise;
      }

    };
  });
