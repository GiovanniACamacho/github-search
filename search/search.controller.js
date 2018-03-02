(function(angular) {
  'use strict';

  angular.module('github-search')
    .controller('SearchController', ['$scope', 'SearchService', function($scope, SearchService) {
        $scope.title = 'DiscoverOrg\'s Github Search';

        /**
         * Main search function
         */
        $scope.search = () => {
           $scope.user = null;
           SearchService.search($scope.searchTerm)
            .then((resp) => {
              if (resp.data.total_count > 0) {
                let user = resp.data.items.find(item =>
                   item.login.toLowerCase().startsWith($scope.searchTerm.toLowerCase())
                );
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
            }, (err) => {
              $scope.err = err;
              $scope.user = null;
            });
        };

        /**
         * Run the search when the user presses "Enter"
         */
        $scope.handleKey = (event) => {
          if (event.keyCode === 13) {
            $scope.search();
          }
        };
    }
  ]);

})(angular);
