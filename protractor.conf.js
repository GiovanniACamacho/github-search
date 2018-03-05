exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/app.spec.js'],
  baseUrl: 'file:///' + __dirname,
  capabilities: {
    browserName: 'chrome',
    args: ['allow-file-access-from-files']
  },
  onPrepare: function() {
    browser.resetUrl = 'file://';
  }
};
