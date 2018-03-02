(function(angular) {
  'use strict';

  angular.module('github-search')
    .directive('githubUser', ['SearchService', function(SearchService) {
        return {
          restrict: 'E',
          templateUrl: 'user/user.directive.html',
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
            SearchService.fetchGists(scope.user.gists_url)
              .then(function(resp) {
                scope.gists = resp.data;
              }, function(err) {
                scope.gists = [];
                scope.gistError = err.statusText;
              });
          }
        }
    }]
  );
})(angular);
