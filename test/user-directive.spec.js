'use strict';

describe('github-user', () => {

  let $compile;
  let element;
  let $scope;
  let service;
  let gistsDeferred;
  let reposDeferred;
  let isolatedScope;
  let $window;

  beforeEach(module('github-search'));
  beforeEach(module('templates'));

  beforeEach(inject((_$compile_, _$rootScope_, _SearchService_, _$q_, _$window_) => {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    gistsDeferred = _$q_.defer();
    reposDeferred = _$q_.defer();
    service = _SearchService_;
    $window = _$window_;
    spyOn(service, 'fetchRepos').and.returnValue(reposDeferred.promise);
    spyOn(service, 'fetchGists').and.returnValue(gistsDeferred.promise);
  }));

  beforeEach(() => {
    $scope.user = {
      login: 'foo',
      avatar_url: 'fooAvatar',
      repos_url: 'fooRepo',
      html_url: 'fooHtml'
    };
    element = $compile('<github-user user="user"></github-user>')($scope);
    $scope.$digest();
    isolatedScope = element.isolateScope();
  });

  it('should render an avatar', () => {
    const img = element.find('img');
    expect(img.attr('src')).toEqual($scope.user.avatar_url);
  });

  it('should take you to the user github page', () => {
    const img = element.find('img');
    spyOn(isolatedScope, 'userHome');
    img.triggerHandler('click');
    expect(isolatedScope.userHome).toHaveBeenCalled();
  });

  it('should fetch repos and gists', () => {
    expect(service.fetchRepos).toHaveBeenCalled();
    expect(service.fetchGists).toHaveBeenCalled();
  });

  describe('render the repos', () => {
    beforeEach(() => {
      reposDeferred.resolve({
        data: [{
          name: 'repo1',
          html_url: 'repo1Url'
        }, {
          name: 'repo2',
          html_url: 'repo2Url'
        }, {
          name: 'repo3',
          html_url: 'repo3Url'
        }]
       });
      $scope.$apply();
    });
    it('should have the items in the model', () =>
      expect(isolatedScope.repos.length).toEqual(3)
    );
    it('should render the items in a list', () => {
      const items = element[0].querySelector('.repos-list').querySelectorAll('div');
      expect(items.length).toEqual(3);
    });
    it('should have the right label', () => {
      const items = element[0].querySelector('.repos-list').querySelectorAll('div');
      expect(items[1].querySelector('a').innerHTML).toEqual('repo2');
    });
  });

  describe('No repos', () => {
    beforeEach(() => {
      reposDeferred.reject({statusText: 'Error'});
      $scope.$apply();
    });
    it('should have no repos in the model', () =>
      expect(isolatedScope.repos.length).toEqual(0)
    );
    it('should have an error', () =>
      expect(isolatedScope.repoError).toEqual('Error')
    );
    it('should display a message', () => 
      expect(element[0].querySelector('.repos-list').querySelector('div').innerHTML).toContain('No repos found')
    );
  });

  describe('No gists', () => {
    beforeEach(() => {
      gistsDeferred.resolve({
        data: []
      });
      $scope.$apply();
    });
    it('should have no gists in the model', () =>
      expect(isolatedScope.gists.length).toEqual(0)
    );
    it('should have no error', () =>
      expect(isolatedScope.gistError).not.toBeDefined()
    );
    it('should display a message', () => 
      expect(element[0].querySelector('.gists-list').querySelector('div').innerHTML).toContain('No gists found')    
    );
  });

  describe('render the gists', () => {
    beforeEach(() => {
      gistsDeferred.resolve({
        data: [{
          id: 'gist1',
          html_url: 'gist1Url'
        }, {
          id: 'gist2',
          html_url: 'gist2Url'
        }, {
          id: 'gist3',
          html_url: 'gist3Url'
        }, {
          id: 'gist4',
          html_url: 'gist4Url'
        }]
      });
      $scope.$apply();
    });
    it('should have the items in the model', () =>
      expect(isolatedScope.gists.length).toEqual(4)
    );
    it('should render the items in a list', () => {
      const items = element[0].querySelector('.gists-list').querySelectorAll('div');
      expect(items.length).toEqual(4);
    });
    it('should have the right label', () => {
      const items = element[0].querySelector('.gists-list').querySelectorAll('div');
      expect(items[3].querySelector('a').innerHTML).toEqual('gist4');
    });
  });

  it('should open the users github page on a new tab', () => {
    spyOn($window, 'open');
    isolatedScope.userHome();
    expect($window.open).toHaveBeenCalledWith('fooHtml', '_blank');
  });
});
