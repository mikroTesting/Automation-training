import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";
export class PulpitPage {
    constructor(private page: Page) {

    }
    sideMenu = new SideMenuComponent(this.page)

    messageText = this.page.locator("#show_messages")
    moneyValueText = this.page.locator('#money_value')

    transferRecieverInput = this.page.locator("#widget_1_transfer_receiver")
    transferAmountInput = this.page.locator("#widget_1_transfer_amount")
    transferTitleInput = this.page.locator("#widget_1_transfer_title")
    transferButton = this.page.getByRole("button", { name: "wykonaj" })
    
    topupRecieverInput = this.page.locator("#widget_1_topup_receiver")
    topupAmonutInput = this.page.locator("#widget_1_topup_amount")
    topupAgreementCheckbox = this.page.locator("#uniform-widget_1_topup_agreement span")
    topupButton = this.page.getByRole("button", { name: "doładuj telefon" })
    
    closeButton = this.page.getByTestId("close-button")
    usernameText = this.page.getByTestId("user-name")

    async makeTransfer(recieverId: string, transferAmount: string, transferTitle: string): Promise<void>{
        await this.transferRecieverInput.selectOption(recieverId);
        await this.transferAmountInput.fill(transferAmount);
        await this.transferTitleInput.fill(transferTitle);
        await this.transferButton.click();
        await this.closeButton.click();
    }
    async makeTopup(topupRevieverNumber: string, topupAmount: string): Promise<void>{
        await this.topupRecieverInput.selectOption(topupRevieverNumber);
        await this.topupAmonutInput.fill(topupAmount);
        await this.topupAgreementCheckbox.click();
        await this.topupButton.click();
        await this.closeButton.click();
    }

}