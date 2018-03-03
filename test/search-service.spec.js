'use strict';

describe('SearchService', function() {

  beforeEach(module('github-search'));

  var service;
  var spy;

  beforeEach(inject(function(_SearchService_, _$http_) {
    service = _SearchService_;
    spy = _$http_;
    spyOn(spy, 'get');
  }));

  it('should have search() method defined', function() {
    expect(service.search).toBeDefined();
  });
 
  it('should not execute the search if search term is missing', function() {
    service.search();
    expect(spy.get).not.toHaveBeenCalled();
    service.search('foo');
    expect(spy.get).toHaveBeenCalled();
  });

  it('should have fetchRepos() defined', function() {
    expect(service.fetchRepos).toBeDefined();
  });

  it('should fetch user repos by url', function() {
    service.fetchRepos('repoUrl');
    expect(spy.get).toHaveBeenCalledWith('repoUrl');
  });
  
  it('should have fetchGists() defined', function() {
    expect(service.fetchGists).toBeDefined();
  });

  it('should fetch user gists by login name', function() {
    service.fetchGists('foo');
    expect(spy.get).toHaveBeenCalled();
    expect(spy.get).not.toHaveBeenCalledWith('foo');
  });

});
