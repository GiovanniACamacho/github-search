(function(angular) {
  'use strict';

  angular.module('github-search')
    .controller('SearchController', ['$scope', 'SearchService', function($scope, SearchService) {
        $scope.title = 'DiscoverOrg\'s Github Search';

        /**
         * Main search function
         */
        $scope.search = function() {
           $scope.user = null;
           SearchService.search($scope.searchTerm)
            .then(function(resp) {
              if (resp.data.total_count > 0) {
                var user = resp.data.items.find(function(item) {
                  return item.login.toLowerCase().startsWith($scope.searchTerm.toLowerCase());
                });
                if (!user) {
                  user = resp.data.items[0];
                }
                $scope.user = user;
                $scope.notFound = false;
              } else {
                $scope.user = null;
                $scope.notFound = true;
                $scope.notFoundTerm = $scope.searchTerm;
              }
            }, function(err) {
              $scope.err = err;
              $scope.user = null;
            });
        };

        /**
         * Run the search when the user presses "Enter"
         */
        $scope.handleKey = function(event) {
          if (event.keyCode === 13) {
            $scope.search();
          }
        };
    }
  ]);

})(angular);
