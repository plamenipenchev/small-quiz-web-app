// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
/* eslint-disable */

import { SpecReporter, StacktraceOption } from 'jasmine-spec-reporter';

export const config = {
  allScriptsTimeout: 11000,
  specs: ['./src/**/*.e2e-spec.ts'],
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {}
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    // eslint-disable-next-line no-undef
    jasmine.getEnv().addReporter(
      // @ts-ignore
      new SpecReporter({
        spec: {
          displayStacktrace: StacktraceOption.PRETTY
        }
      })
    );
  }
};
