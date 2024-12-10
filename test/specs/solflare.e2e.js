const {expect} = require('@wdio/globals')
const HomePage = require('../pageobjects/home.page')
const OnboardPage = require('../pageobjects/onboard.page')
const PortfolioPage = require('../pageobjects/portfolio.page')
const ManagementPage = require('../pageobjects/management.page')
const {data} = require("../testdata/testData");


describe('Solflare Wallet e2e flow tests', () => {
    it('Should be able to create new wallet, get, enter, passphrase, set password and verify recovery phrase list of wallets ', async () => {
        //Go to Solflare home page and click on Access Wallet
        await HomePage.open()
        await HomePage.clickOnAccessWallet()

        //Create a new Solflare wallet,get and enter recoveryphrase
        await OnboardPage.clickOnNewWallet()
        const recoveryphrase = await OnboardPage.storeRecoveryphrase()
        await OnboardPage.clickSavedRecoveryPhrase()
        await OnboardPage.enterPassphrase(recoveryphrase)
        await OnboardPage.clickContinue() // Go to Set password

        //Set new password and click 'Enter Solana' to go to Portfolio page
        await OnboardPage.setPassword(data.password)
        await OnboardPage.clickEnterSolana()

        //Click on button Wallet management (Avatar) on Portfolio page
        await PortfolioPage.clickOnAvatar()

        //Verify MainWallet is displayed and verify text "Main Wallet"
        expect(await ManagementPage.mainWallet).toBeDisplayed();
        expect(await ManagementPage.getMainWalletText()).toEqual(data.mainWalletText);

        await ManagementPage.clickOnIconPlus()
        await ManagementPage.clickOnBtnManageRecoveryPhrase()

        //Verify if 1st toggle button from Recovery Phrase list is disabled
        const isFirstToggleBtnEnabled = await ManagementPage.getFirstToggleBtnIsEnabled();
        expect(isFirstToggleBtnEnabled).toBe(data.firstToggleBtnEnabled);

        //Verify if 1st toggle button from Recovery Phrase list is on
        const isFirstToggleBtnOn = await ManagementPage.getFirstToggleBtnByAttribute()
        expect(isFirstToggleBtnOn).toBe(data.firstToggleBtnCheckedAttrValue);

        // Select 3rd,4th Recovery Phrase list item
        await ManagementPage.selectRecoveryPhraseListByIndex(data.idxThirdToggle, data.idxFourthToggle)

        //Verify updated recovery phrase list of wallets
        const numberofCheckedItems = await ManagementPage.checkedListItems.length
        await ManagementPage.clickOnBtnSave() //Click on button Save
        const originalWalletText = await ManagementPage.getTextFromFirstRecoveryPhaseListItem()
        expect(originalWalletText).toEqual(data.mainWalletText);
        const numberOfRecoveryPhraseListItems = await ManagementPage.recoveryPhraseList.length
        expect(numberofCheckedItems).toEqual(numberOfRecoveryPhraseListItems);

    })
})

