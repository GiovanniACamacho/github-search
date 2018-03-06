exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/app.spec.js'],
  baseUrl: 'file:///' + __dirname,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        'allow-file-access-from-files',
        '--headless',
        '--disable-gpu',
        '--window-size=800,600'
      ]
    }
  },
  onPrepare: function() {
    browser.resetUrl = 'file://';
  }
};
