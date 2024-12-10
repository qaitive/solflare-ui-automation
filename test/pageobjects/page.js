const { browser } = require('@wdio/globals')

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open () {
        return browser.url('')

    }

    //Get text from element
    async getText(selector) {
        return await $(selector).getText();
    }

    //Get attribute value from element
    async getAttribute(selector, attribute) {
        return await $(selector).getAttribute(attribute);;
    }



}
