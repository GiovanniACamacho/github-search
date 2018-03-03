(function(angular) {
  'use strict';

  angular.module('github-search')
    .service('SearchService', ['$http', function($http) {

      // Local variables
      const url = 'https://api.github.com';
      const searchUrl = `${url}/search/users?q=`;
      const userUrl = `${url}/users`;

      /**
       * Perform a ajax call to search github users
       * @param {string} searchTerm
       * @returns Promise
       */
      const search = (searchTerm = '') => {
        if (searchTerm) {
          return $http.get(`${searchUrl}${searchTerm}`);
        }
      };

      /**
       * Peform a ajax call to fetch the user's Repositories
       * @param {string} repoUrl
       * @returns Promise
       */
      const fetchRepos = (repoUrl) => $http.get(repoUrl);

      /**
       * Peform a ajax call to fetch the user's gists
       * @param {string} login
       * @returns Promise
       */
      const fetchGists = (login) => $http.get(`${userUrl}/${login}/gists`);

      // Public API
      return {
        search,
        fetchRepos,
        fetchGists
      }

    }
  ]);

})(angular);
