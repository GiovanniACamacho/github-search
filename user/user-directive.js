(function(angular) {
  'use strict';

  angular.module('github-search')
    .directive('githubUser', ['$window', 'SearchService', function($window, SearchService) {
        return {
          restrict: 'E',
          templateUrl: 'user/user-directive.html',
          scope: {
            user: '='
          },
          link: function(scope) {
            // Repos
            SearchService.fetchRepos(scope.user.repos_url)
              .then(function(resp) {
                scope.repos = resp.data;
              }, function(err) {
                scope.repos = [];
                scope.repoError = err.statusText;
              });

            // Gists
            SearchService.fetchGists(scope.user.login)
              .then(function(resp) {
                scope.gists = resp.data;
              }, function(err) {
                scope.gists = [];
                scope.gistError = err.statusText;
              });

            /**
             * Open a new tab to the user's Github page
             */
            scope.userHome = function() {
              $window.open(scope.user.html_url, '_blank');
            };
          }
        }
    }]
  );
})(angular);
