'use strict';

describe('SearchController', function() {
  
  var $scope;
  var deferred;
  var service;

  beforeEach(module('github-search'));

  beforeEach(inject(function($controller, _$rootScope_, _$q_, _SearchService_) {
    $scope = _$rootScope_.$new();
    deferred = _$q_.defer();

    service = _SearchService_;
    spyOn(service, 'search').and.returnValue(deferred.promise);

    $controller('SearchController', {
      $scope: $scope,
      SearchService: service
    });
  }));

  it('should have a title', function() {
    expect($scope.title).toContain('Github Search');
  });

  it('should have a search() defined', function() {
    expect($scope.search).toBeDefined();
  });

  it('should run a valid search', function() {
    $scope.searchTerm = 'foo';

    // Resolve the search
    deferred.resolve({
      data: {
        total_count: 1,
        items: [{
          login: 'foo'
        }]
      }
    });
 
    $scope.search();
    $scope.$apply();

    expect($scope.user).toBeDefined();
    expect($scope.notFound).toBe(false);
    expect($scope.err).not.toBeDefined();
    expect($scope.user.login).toBe('foo');
  });

  it('should know when no matches were found', function() {
    // Resolve the search
    deferred.resolve({
      data: {
        total_count: 0,
        items: []
      }
    });
 
    $scope.search();
    $scope.$apply();

    expect($scope.user).toBe(null);
    expect($scope.notFound).toBe(true);
    expect($scope.err).not.toBeDefined();
  });

  it('should handle a rejection', function() {
    var errorMsg = 'random error';
    deferred.reject(errorMsg);
 
    $scope.search();
    $scope.$apply();

    expect($scope.user).toBe(null);
    expect($scope.err).toEqual(errorMsg);
  });

  it('should run a search when hitting the Enter key', function() {
    var ev = {
      keyCode: 13 // 'Enter'
    };

    spyOn($scope, 'search');
    $scope.handleKey(ev);
    expect($scope.search).toHaveBeenCalled();
  });

  it('should not run a search when hitting any other key', function() {
    var ev = {
      keyCode: 23 // Not 'Enter'
    };

    spyOn($scope, 'search');
    $scope.handleKey(ev);
    expect($scope.search).not.toHaveBeenCalled();
  });

  it('should pick the best match', function() {
    $scope.searchTerm = 'foo';

    // Resolve the search
    deferred.resolve({
      data: {
        total_count: 3,
        items: [{
          login: 'notfoo'
        }, {
          login: 'some random foo'
        }, {
          login: 'foodelicious'
        }]
      }
    });
 
    $scope.search();
    $scope.$apply();

    expect($scope.user.login).toBe('foodelicious');
  });

  it('should pick the first match if no good matches are found', function() {
    $scope.searchTerm = 'foo';

    // Resolve the search
    deferred.resolve({
      data: {
        total_count: 3,
        items: [{
          login: 'notfoo'
        }, {
          login: 'some random foo'
        }, {
          login: 'iunotfoodelicious'
        }]
      }
    });
 
    $scope.search();
    $scope.$apply();

    expect($scope.user.login).toBe('notfoo');
  });

});
