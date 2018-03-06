describe('Github Search - E2E', () => {
  
  beforeEach(() => 
   browser.get('/index.html')
  );

  describe('search', () => {
    let user;
    let input;

    beforeEach(() => {
      input = element(by.model('searchTerm'));
      input.sendKeys('google', protractor.Key.ENTER);
      user = element(by.css('.github-user'));
    });
    it('should search onEnter', () =>
      expect(user.isPresent()).toBe(true) 
    );
    it('should clear the user section onInput', () => {
      input.clear();
      input.sendKeys(protractor.Key.ENTER);
      expect(user.isPresent()).not.toBe(true); 
    });
  });

  describe('repos', () => {
    let repos;
    beforeEach(() => {
      let input = element(by.model('searchTerm'));
      input.sendKeys('google', protractor.Key.ENTER);
      repos = element(by.css('.repos-list'));
    });
    it('should be visible', () =>
      expect(repos.isPresent()).toBe(true) 
    );
    it('should be populated with data', () => {
      let items = repos.$$('div');
      expect(items.count()).toBeGreaterThan(1);
    });
    it('should linkable', () => {
      let item = repos.$$('div').get(0);
      let a = item.$$('a');
      expect(a.getAttribute('href')).toMatch(/https:\/\/github\.com/);
    });
  });

  describe('gists', () => {
    let gists;
    beforeEach(() => {
      let input = element(by.model('searchTerm'));
      input.sendKeys('kaiosilveira', protractor.Key.ENTER);
      gists = element(by.css('.gists-list'));
    });
    it('should be visible', () =>
      expect(gists.isPresent()).toBe(true) 
    );
    it('should be populated with data', () => {
      let items = gists.$$('div');
      expect(items.count()).toBeGreaterThan(1);
    });
    it('should linkable', () => {
      let item = gists.$$('div').get(0);
      let a = item.$$('a');
      expect(a.getAttribute('href')).toMatch(/https:\/\/gist.github\.com/);
    });
  });

  describe('no gists', () => {
    let gists;
    beforeEach(() => {
      let input = element(by.model('searchTerm'));
      input.sendKeys('google', protractor.Key.ENTER);
      gists = element(by.css('.gists-list'));
    });
    it('should display a message', () => {
      let div = gists.$$('div');
      expect(div.getText()).toMatch(/No gists found/);
    });
  });

});
