describe('Github Search - E2E', function() {
  
  beforeEach(function() {
   browser.get('/index.html');
   browser.waitForAngular();
  });

  it('should have the right title', function() {
    expect(element(by.binding('title')).getText()).toContain('Github Search');
  });
  
  xit('should search onEnter', function() {
    var input = element(by.model('searchTerm'));
    input.sendKeys('google', protractor.Key.ENTER);
    expect(element(by.css('.github-user')).isPresent()).toBe(true);
  });
});
