'use strict';

describe('github-user', function() {

  var $compile;
  var element;
  var $scope;
  var service;
  var gistsDeferred;
  var reposDeferred;
  var isolatedScope;
  var $window;

  beforeEach(module('github-search'));
  beforeEach(module('templates'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _SearchService_, _$q_, _$window_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    gistsDeferred = _$q_.defer();
    reposDeferred = _$q_.defer();
    service = _SearchService_;
    $window = _$window_;
    spyOn(service, 'fetchRepos').and.returnValue(reposDeferred.promise);
    spyOn(service, 'fetchGists').and.returnValue(gistsDeferred.promise);
  }));

  beforeEach(function() {
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

  it('should render an avatar', function() {
    var img = element.find('img');
    expect(img.attr('src')).toEqual($scope.user.avatar_url);
  });

  it('should take you to the user github page', function() {
    var img = element.find('img');
    spyOn(isolatedScope, 'userHome');
    img.triggerHandler('click');
    expect(isolatedScope.userHome).toHaveBeenCalled();
  });

  it('should fetch repos and gists', function() {
    expect(service.fetchRepos).toHaveBeenCalled();
    expect(service.fetchGists).toHaveBeenCalled();
  });

  it('should render the repos', function() {
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
    expect(isolatedScope.repos.length).toEqual(3);
    var items = element[0].querySelector('.repos-list').querySelectorAll('div');
    expect(items.length).toEqual(3);
    expect(items[1].querySelector('a').innerHTML).toEqual('repo2');
  });

  it('should display a message if no repos are found', function() {
    reposDeferred.reject({statusText: 'Error'});
    $scope.$apply();
    expect(isolatedScope.repos.length).toEqual(0);
    expect(isolatedScope.repoError).toEqual('Error');
    expect(element[0].querySelector('.repos-list').querySelector('div').innerHTML).toContain('No repos found');    
  });

  it('should display a message if no gists are found', function() {
    gistsDeferred.resolve({
      data: []
    });
    $scope.$apply();
    expect(isolatedScope.gists.length).toEqual(0);
    expect(isolatedScope.gistError).not.toBeDefined();
    expect(element[0].querySelector('.gists-list').querySelector('div').innerHTML).toContain('No gists found');    
  });

  it('should render the gists', function() {
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
    expect(isolatedScope.gists.length).toEqual(4);
    var items = element[0].querySelector('.gists-list').querySelectorAll('div');
    expect(items.length).toEqual(4);
    expect(items[3].querySelector('a').innerHTML).toEqual('gist4');
  });

  it('should open the users github page on a new tab', function() {
    spyOn($window, 'open');
    isolatedScope.userHome();
    expect($window.open).toHaveBeenCalledWith('fooHtml', '_blank');
  });
});
