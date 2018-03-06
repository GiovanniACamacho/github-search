describe('Github Search - E2E', function() {
  
  beforeEach(function() {
   browser.get('/index.html');
  });

  it('should search onEnter', function() {
    var input = element(by.model('searchTerm'));
    input.sendKeys('google', protractor.Key.ENTER);
    var user = element(by.css('.github-user'));
    expect(user.isPresent()).toBe(true); 
  });

  describe('user repos', function() {
    var repos;
    beforeEach(function() {
      var input = element(by.model('searchTerm'));
      input.sendKeys('google', protractor.Key.ENTER);
      repos = element(by.css('.repos-list'));
    });
    it('should be visible', function() {
      expect(repos.isPresent()).toBe(true); 
    });
    it('should be populated with data', function() {
      var items = repos.$$('div');
      expect(items.count()).toBeGreaterThan(0);
    });
    it('should linkable', function() {
      var item = repos.$$('div').get(0);
      var a = item.$$('a');
      expect(a.getAttribute('href')).toMatch(/https:\/\/github\.com/);
    });
  });

  describe('user gists', function() {
    var gists;
    beforeEach(function() {
      var input = element(by.model('searchTerm'));
      input.sendKeys('xtea', protractor.Key.ENTER);
      gists = element(by.css('.gists-list'));
    });
    it('should be visible', function() {
      expect(gists.isPresent()).toBe(true); 
    });
    it('should be populated with data', function() {
      var items = gists.$$('div');
      expect(items.count()).toBeGreaterThan(0);
    });
    it('should linkable', function() {
      var item = gists.$$('div').get(0);
      var a = item.$$('a');
      expect(a.getAttribute('href')).toMatch(/https:\/\/gist.github\.com/);
    });
  });

});
