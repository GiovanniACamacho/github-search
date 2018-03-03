'use strict';

describe('SearchService', () => {

  beforeEach(module('github-search'));

  let service;
  let spy;

  beforeEach(inject((_SearchService_, _$http_) => {
    service = _SearchService_;
    spy = _$http_;
    spyOn(spy, 'get');
  }));

  it('should have search() method defined', () => expect(service.search).toBeDefined());
 
  it('should not execute the search if search term is missing', () => {
    service.search();
    expect(spy.get).not.toHaveBeenCalled();
    service.search('foo');
    expect(spy.get).toHaveBeenCalled();
  });

  it('should have fetchRepos() defined', () => expect(service.fetchRepos).toBeDefined());

  it('should fetch user repos by url', () => {
    service.fetchRepos('repoUrl');
    expect(spy.get).toHaveBeenCalledWith('repoUrl');
  });
  
  it('should have fetchGists() defined', () => expect(service.fetchGists).toBeDefined());

  it('should fetch user gists by login name', () => {
    service.fetchGists('foo');
    expect(spy.get).toHaveBeenCalled();
    expect(spy.get).not.toHaveBeenCalledWith('foo');
  });

});
