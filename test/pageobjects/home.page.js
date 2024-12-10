const { $ } = require('@wdio/globals')
const Page = require('./page');
import logger from "../../logger";

/**
 * Home page contains specific selectors and methods to Access wallet
 */
class HomePage extends Page {


    /**
     * define selectors using getter methods
     */

    get btnAccessWallet () {
        return $('a[href="/access"]');
    }

    // Click -> Acess Wallet
    async clickOnAccessWallet (){
        await this.btnAccessWallet.click();
        logger.info("Url:" + await browser.getUrl());
    }

    open () {
        return super.open();
    }
}

module.exports = new HomePage();
