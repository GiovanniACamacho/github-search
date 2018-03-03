'use strict';

describe('SearchService', function() {

  beforeEach(module('github-search'));

  var service;
  beforeEach(inject(function(_SearchService_) {
    service = _SearchService_;
  }));

  it('should search by search term', function() {
    expect(service.search).toBeDefined();
  });
  
});
