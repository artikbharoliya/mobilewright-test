const { defineConfig } = require('mobilewright');

module.exports = defineConfig({
  testDir: './tests',
  platform: 'android',
  bundleId: 'ca.paymentsource.paysimplymobile',
  reporter: 'html',
});
