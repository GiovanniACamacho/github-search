(function(angular) {
  'use strict';

  angular.module('github-search')
    .service('SearchService', ['$http', function($http) {

      // Local variables
      var searchUrl = "https://api.github.com/search/users?q=";

      /**
       * Perform a ajax call to search github users
       * @param {string} searchTerm
       * @returns Promise
       */
      function search(searchTerm) {
        if (searchTerm) {
          return $http.get(searchUrl + searchTerm);
        }
      }

      /**
       * Peform a ajax call to fetch the user's Repositories
       * @param {string} repoUrl
       * @returns Promise
       */
      function fetchRepos(repoUrl) {
        return $http.get(repoUrl);
      }

      /**
       * Peform a ajax call to fetch the user's gists
       * @param {string} gistUrl
       * @returns Promise
       */
      function fetchGists(gistUrl) {
        return $http.get(gistUrl);
      }


      // Public API
      return {
        search: search,
        fetchRepos: fetchRepos,
        fetchGists: fetchGists
      }

    }
  ]);

})(angular);
