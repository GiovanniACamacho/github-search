describe('Github Search - E2E', function() {
  
  beforeEach(function() {
   browser.get('/index.html');
  });

  describe('search', function() {
    var user;
    var input;

    beforeEach(function() {
      input = element(by.model('searchTerm'));
      input.sendKeys('google', protractor.Key.ENTER);
      user = element(by.css('.github-user'));
    });
    it('should search onEnter', function() {
      expect(user.isPresent()).toBe(true); 
    });
    it('should clear the user section onInput', function() {
      input.clear();
      input.sendKeys(protractor.Key.ENTER);
      expect(user.isPresent()).not.toBe(true); 
    });
  });

  describe('repos', function() {
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
      expect(items.count()).toBeGreaterThan(1);
    });
    it('should linkable', function() {
      var item = repos.$$('div').get(0);
      var a = item.$$('a');
      expect(a.getAttribute('href')).toMatch(/https:\/\/github\.com/);
    });
  });

  describe('gists', function() {
    var gists;
    beforeEach(function() {
      var input = element(by.model('searchTerm'));
      input.sendKeys('kilosilveira', protractor.Key.ENTER);
      gists = element(by.css('.gists-list'));
    });
    it('should be visible', function() {
      expect(gists.isPresent()).toBe(true); 
    });
    it('should be populated with data', function() {
      var items = gists.$$('div');
      expect(items.count()).toBeGreaterThan(1);
    });
    it('should linkable', function() {
      var item = gists.$$('div').get(0);
      var a = item.$$('a');
      expect(a.getAttribute('href')).toMatch(/https:\/\/gist.github\.com/);
    });
  });

  describe('no gists', function() {
    var gists;
    beforeEach(function() {
      var input = element(by.model('searchTerm'));
      input.sendKeys('google', protractor.Key.ENTER);
      gists = element(by.css('.gists-list'));
    });
    it('should display a message', function() {
      var div = gists.$$('div');
      expect(div.getText()).toMatch(/No gists found/);
    });
  });

});
