const {$} = require('@wdio/globals')
const Page = require('./page');
import logger from '../../logger'

/**
 * OnboardPage page contains specific selectors and methods to set passhprase, password
 * and to Enter Solflare portfolio Page
 */
class OnboardPage extends Page {
    /**
     * define selectors using getter methods
     */

    get btnNewWallet() {
        return $('button[data-id="i_need_a_wallet_button"]');
    }

    get btnSavedRecoveryPhrase() {
        return $('//button[contains(text(),"SAVED")]');
    }

    get btnContinue() {
        return $('button[data-id="continue_button"]');
    }

    get btnSubmit() {
        return $('button[type="Submit"]');
    }

    get inputPassword() {
        return $('input[name="password"]');
    }

    get inputRepeatPassword() {
        return $('input[name="password2"]');
    }

    get btnEnterSolana() {
        return $('//span[contains(text(),"Solana")]');
    }

    async clickOnNewWallet() {
        await this.btnNewWallet.click();
        logger.info("Url:" + await browser.getUrl());
    }

    async clickSavedRecoveryPhrase() {
        await this.btnSavedRecoveryPhrase.click();
    }

    async clickContinue() {
        await this.btnContinue.click();
    }

    async clickEnterSolana() {
        await this.btnEnterSolana.click();
        logger.info("Url:" + await browser.getUrl());
    }

    //Store text from all paragraphs into recoveryphraseArray
    async storeRecoveryphrase() {
        const maxIndex = 12;
        let recoveryphraseArray = []
        for (let i = 1; i <= maxIndex; i++) {
            const selector = `p[data-index="${i}"]`;
            const textArray = await $(selector).getText();
            recoveryphraseArray.push(textArray)
        }
        return recoveryphraseArray
    }

    //Set value of each element to Enter recovery phrase
    async enterPassphrase(recoveryphrase) {
        const maxIndex = recoveryphrase.length;
        for (let i = 0; i < maxIndex; i++) {
            const selector = `#mnemonic-input-${i}`;
            await $(selector).setValue(recoveryphrase[i]);
        }
    }

    // Set New Password
    async setPassword(password) {
        await this.inputPassword.setValue(password);
        await this.inputRepeatPassword.setValue(password);
        await this.btnSubmit.click();
    }

}

module.exports = new OnboardPage();
