/* eslint-disable prefer-rest-params */
import {source} from 'axe-core';


/**
 * Normalizes context parameter with includes and excludes
 * @private
 * @param  {Array} include Array of selectors to include
 * @param  {Array} exclude Array of selectors to exclude
 * @return {Object}
 */

const normalizeContext = (include, exclude) => {
    if (!exclude.length) {
        if (!include.length) {
            return null;
        }

        return {
            include
        };
    }

    if (!include.length) {
        return {
            exclude
        };
    }

    return {
        include,
        exclude
    };
};


class AxeBuilder {

    /**
     * Constructor for chainable WebDriver API
     * @param {browser} browser WebDriverIO instance to analyze
     */

    constructor(browser) {
        this.driver = browser;
        this.source = source;
        this.includes = [];
        this.excludes = [];
        this.options = null;
        this.config = null;
    }

    /**
     * Selector to include in analysis
     * @param  {String} selector CSS selector of the element to include
     * @return {AxeBuilder}
     */

    include(selector) {
        if(selector) {
            this.includes.push(Array.isArray(selector) ? selector : [selector]);
        }
        console.log(selector, 'sss');
        return this;
    }


    /**
     * Selector to exclude in analysis
     * @param  {String} selector CSS selector of the element to exclude
     * @return {AxeBuilder}
     */
    exclude(selector) {
        this.excludes.push(Array.isArray(selector) ? selector : [selector]);
        return this;
    }

    /**
     * Options to directly pass to `axe.a11yCheck`.  See API documentation for axe-core for use.
     * Will override any other configured options, including calls to `withRules` and `withTags`.
     * @param  {Object} options Options object
     * @return {AxeBuilder}
     */
    options(options) {
        this.options = options;
        return this;
    }


    /**
     * Limit analysis to only the specified rules.  Cannot be used with `withTags`.
     * @param {Array|String} rules Array of rule IDs, or a single rule ID as a string
     * @return {AxeBuilder}
     */
    withRules(rules) {
        rules = Array.isArray(rules) ? rules : [rules];
        this.options = this.options || {};
        this.options.runOnly = {
            type: 'rule',
            values: rules
        };

        return this;
    }

    /**
     * Limit analysis to only the specified tags.  Cannot be used with `withRules`.
     * @param {Array|String} tags rules Array , or a single tag as a string
     * @return {AxeBuilder}
     */
    withTags(tags) {
        tags = Array.isArray(tags) ? tags : [tags];
        this.options = this.options || {};
        this.options.runOnly = {
            type: 'tag',
            values: tags
        };

        return this;
    }


    /**
     * Configure aXe before running analyze. *Does not chain.*
     * @param  {Object} config Configuration object to use in analysis
     */
    configure(config) {
        if (typeof config !== 'object') {
            throw new Error('AxeBuilder needs an object to configure. See axe-core configure API.');
        }

        this.config = config;
        return this;
    }


    /**
     * Perform analysis and retrieve results. *Does not chain.*
     * @param  {Function} callback Function to execute when analysis completes;
     * recieves one argument, the results object of analysis
     */
    analyze(callback) {
        const context = normalizeContext(this.includes, this.excludes);
        const driver = this.driver;
        const options = this.options;
        const config = this.config;


        this.inject(() => {
            const result = driver.executeAsync(function axeExecute(axeContext, axeOptions, axeConfig) {
                /* global document, axe */

                if (axeConfig !== null) {
                    axe.configure(axeConfig);
                }
                return axe.a11yCheck(axeContext || document, axeOptions, arguments[arguments.length - 1]);
            }, context, options, config);
            callback(result.value);
        });
    }


    /**
     *  inject aXe into  top level document, then execute a callback
     * @param  {Function} callback    Callback to execute when aXe has been injected
     */
    inject(callback) {
        const axeSource = this.source;
        const driver = this.driver;
        driver.frameParent();

        driver.execute((innerHTML) => (function axeInject() {
            if (typeof axe === "object" && axe.version) {
                return;
            }
            const s = document.createElement("script");
            // stringify so that quotes are properly escaped
            s.innerHTML = `${innerHTML};axe.configure({branding:{application:"webdriver.io"}});`;
            document.body.appendChild(s);
        }()), axeSource);
        driver.frameParent();
        callback();
    }
}


export default function (browser) {
    if (!(this instanceof AxeBuilder)) {
        return new AxeBuilder(browser);
    }
    return this;
}
