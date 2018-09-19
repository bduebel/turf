import {Page} from './';
import {LoginPageLocators, Buttons} from '../config/locators';

export class MainPage extends Page {


    static get welcomeMessage() {
        return this.getText(LoginPageLocators.welcomeMessage)
    }

}