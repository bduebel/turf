import {BASE_URL, BASE_DELAY} from '../config/index';
import {Buttons} from '../config/locators';

export class Page {
    static get browser() {
        return browser;
    }

    static open(path = "") {
        this.browser.url(`${BASE_URL}${path}`);
    }

    static get pageTitle() {
        return this.browser.getTitle();
    }

    static pause(timer = 1000) {
        return this.browser.pause(timer);
    }

    static waitForVisible(selector) {
        return this.browser.waitForVisible(selector);
    }

    static click(selector) {
        this.waitForVisible(selector);
        return this.browser.click(selector);
    }

    static getText(selector) {
        this.waitForVisible(selector);
        return this.browser.getText(selector);
    }

    static setValue(selector, value) {
        return this.browser.setValue(selector, value);
    }

    static get checkDocument() {
        return this.browser.checkDocument();
    }

    static find(selector) {
        return this.browser.$(selector);
    }

    static submit(parentSelector = "") {
        this.browser.click(parentSelector + Buttons.submit);
    }
}
