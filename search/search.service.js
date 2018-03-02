(function(angular) {
  'use strict';

  angular.module('github-search')
    .service('SearchService', ['$http', function($http) {

      // Local variables
      var url = 'https://api.github.com'
      var searchUrl = url + '/search/users?q=';
      var userUrl = url + '/users';

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
       * @param {string} login
       * @returns Promise
       */
      function fetchGists(login) {
        return $http.get(userUrl + '/' + login + '/gists');
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
