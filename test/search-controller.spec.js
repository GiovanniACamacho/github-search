'use strict';

describe('SearchController', () => {
  
  let $scope;
  let deferred;
  let service;

  beforeEach(module('github-search'));

  beforeEach(inject(($controller, _$rootScope_, _$q_, _SearchService_) => {
    $scope = _$rootScope_.$new();
    deferred = _$q_.defer();

    service = _SearchService_;
    spyOn(service, 'search').and.returnValue(deferred.promise);

    $controller('SearchController', {
      $scope: $scope,
      SearchService: service
    });
  }));

  it('should have a title', () =>
    expect($scope.title).toContain('Github Search')
  );

  it('should have a search() defined', () => 
    expect($scope.search).toBeDefined()
  );

  describe('valid search', () => {
    beforeEach(() => {
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
    });

    it('should have a user defined', () => 
      expect($scope.user).toBeDefined()
    );
    it('should not have the notFound set', () =>
      expect($scope.notFound).toBe(false)
    );
    it('should not have an error', () =>
      expect($scope.err).not.toBeDefined()
    );
    it('should have the right login', () =>
      expect($scope.user.login).toBe('foo')
    );
  });

  describe('no matches found', () => {
    beforeEach(() => {
      // Resolve the search
      deferred.resolve({
        data: {
          total_count: 0,
          items: []
        }
      });
 
      $scope.search();
      $scope.$apply();
    });
    it('should not have a user', () =>
      expect($scope.user).toBe(null)
    );
    it('should have the notFound flag set', () =>
      expect($scope.notFound).toBe(true)
    );
    it('should not have an error', () =>
      expect($scope.err).not.toBeDefined()
    );
  });

  describe('a rejection', () => {
    let errorMsg;
    beforeEach(() => {
      errorMsg = 'random error';
      deferred.reject(errorMsg);
 
      $scope.search();
      $scope.$apply();
    });
    it('should not have a user', () =>
      expect($scope.user).toBe(null)
    );
    it('should have an error', () =>
      expect($scope.err).toEqual(errorMsg)
    );
  });

  it('should run a search when hitting the Enter key', () => {
    const ev = {
      keyCode: 13 // 'Enter'
    };

    spyOn($scope, 'search');
    $scope.handleKey(ev);
    expect($scope.search).toHaveBeenCalled();
  });

  it('should not run a search when hitting any other key', () => {
    const ev = {
      keyCode: 23 // Not 'Enter'
    };

    spyOn($scope, 'search');
    $scope.handleKey(ev);
    expect($scope.search).not.toHaveBeenCalled();
  });

  it('should pick the best match', () => {
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

  it('should pick the first match if no good matches are found', () => {
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
