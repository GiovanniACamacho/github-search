describe('Github Search - E2E', () => {
  
  beforeEach(() =>
   browser.get('/index.html')
  );

  it('should search onEnter', () => {
    var input = element(by.model('searchTerm'));
    var user = element(by.css('.github-user'));
    input.sendKeys('google', protractor.Key.ENTER);
    expect(user.isPresent()).toBe(true);
  });
});
