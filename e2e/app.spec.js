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
});
