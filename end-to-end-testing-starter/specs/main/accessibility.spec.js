import {MainPage} from '../../pages/main.page';

describe('(Main Page) Accessibility', () => {

    before(() => {
        MainPage.open();
    });

    it('should not have accessibility issue', () => {
        MainPage.browser.should.be.accessibilityViolationsFree();
    });

});