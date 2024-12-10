import logger from "../../logger";

const {$} = require('@wdio/globals')
const Page = require('./page');
const assert = require("assert");
const {data} = require("../testdata/testData");

/**
 * ManagmentPage page contains specific selectors and methods to verify If Main Wallet is displayed and
 * to set and update recovery phrase list
 */
class ManagementPage extends Page {
    /**
     * define selectors using getter methods
     */
    get btnAvatar() {
        return $('//*[@id=":r3:"]/..');
    }

    get mainWallet() {
        return $('//div[@class="tliried"]//span[text()="Main Wallet"]')
    }

    get iconPlus() {
        return $('(//*[@data-icon="plus"])[2]');
    }

    get manageRecoveryPhrase() {
        return $('//span[text()="Manage recovery phrase"]')
    }

    get firstToogleBtn() {
        return $('button[data-disabled]');
    }

    get toogleButtons() {
        return $$('button[role="switch"]');
    }

    get checkedListItems() {
        return $$('button[data-state="checked"]');
    }

    get btnSave() {
        return $('//span[text()="Save"]')
    }

    get recoveryPhraseList() {
        return $$('//span[@class="_9rd95r0" and contains(text(), "Wallet")]')
    }

    // Returns "Main Wallet" text
    async getMainWalletText() {
        return await this.getText(await this.mainWallet);
    }

    async clickOnIconPlus() {
        await this.iconPlus.click();
    }

    async clickOnBtnManageRecoveryPhrase() {
        await this.manageRecoveryPhrase.click();
    }

    // Returns false If element is not enabled (disabled)
    async getFirstToggleBtnIsEnabled(index) {
        await this.firstToogleBtn.waitForDisplayed({timeout: 8000});
        return await this.firstToogleBtn.isEnabled()
    }

    // Get 1st toggle button by Attribute from Recovery Phrase list
    async getFirstToggleBtnByAttribute() {
        const toggleOn = await this.firstToogleBtn
        return await this.getAttribute(toggleOn, 'data-state');
    }

    //Select the 3rd and 4th list item
    async selectRecoveryPhraseListByIndex(...arg) {
        await this.toogleButtons[arg[0]].click()
        await this.toogleButtons[arg[1]].click()
    }

    //Click on button Save
    async clickOnBtnSave() {
        await this.btnSave.click();
    }

    //Get text from original wallet item
    async getTextFromFirstRecoveryPhaseListItem() {
        const firstElementText = await this.recoveryPhraseList[0]
        await firstElementText.waitForDisplayed({timeout: 8000});
        return await this.getText(firstElementText);
    }

}

module.exports = new ManagementPage();
