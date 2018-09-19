import {MainPage} from '../../pages/main.page';


describe('Main Page', () => {

    before(() => {
        MainPage.open();
    });

    it('should have the right title', () => {
        MainPage.pageTitle.should.be.equal('Express Scripts - Member Experience Gateway');
    });


});

