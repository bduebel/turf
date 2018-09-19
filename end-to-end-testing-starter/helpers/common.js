Assertion.addMethod("accessibilityViolationsFree", function () {
    const AxeBuilder = require('./axe').default;
    const util = require('util');
    browser.timeouts('script',20000);
    AxeBuilder(this._obj)
        .include(this._obj.selector)
        .analyze((results) => {
            this.assert(results.violations.length === 0
                , 'expected Accessibility Violations to be zero, but found ' + results.violations.length + '\n'
                + util.inspect(results.violations, false, null)
                , 'expected Accessibility Violations  not to be greater zero '
            )
        });
});

Assertion.addMethod("visualRegressionFree", function () {
    const results = this._obj.filter((result) => !result.isExactSameImage);
    this.assert(results.length === 0
        , 'expected to have zero visual regression, but found ' + results.length + '\n'
        , 'expected visual regression not to be zero '
    )
});