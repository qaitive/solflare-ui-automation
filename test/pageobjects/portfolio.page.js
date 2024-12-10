const { $, expect} = require('@wdio/globals')
const Page = require('./page');
import logger from "../../logger";

/**
 * Portfolio page containing specific selectors and method to enter Solflare menagment page
 */
class PortfolioPage extends Page {
    /**
     * define selectors using getter methods
     */

    get btnAvatar () {
        return $('//*[@id=":r3:"]/..');
    }

    // Click -> Avatar
    async clickOnAvatar (){
        await this.btnAvatar.waitForClickable({ timeout: 8000 });
        await this.btnAvatar.click();
        logger.info("Url:" + await browser.getUrl());
    }

}

module.exports = new PortfolioPage();
