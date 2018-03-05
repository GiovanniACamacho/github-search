describe('Github Search - E2E', function() {
  it('should have the right title', function() {
    browser.get('index.html');
    expect(element(by.binding('title')).getText()).toContain('Github Search');
  });
});
