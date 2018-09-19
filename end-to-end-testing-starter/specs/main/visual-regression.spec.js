import {MainPage} from '../../pages/main.page';


describe('(Main Page) Visual Regression', () => {

    before(() => {
        MainPage.open();
    });

    it('Main Page Looks ', function () {
        MainPage.checkDocument.should.be.visualRegressionFree();
    });


});