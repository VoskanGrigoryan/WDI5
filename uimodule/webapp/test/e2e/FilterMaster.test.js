const MainView = require("./pageObjects/MainView");
const { MasterSelector } = require("./utils/MasterSelectors");

let oMasterSelector;
describe("The MainView page: ", async () => {
    before(async () => {
        await MainView.open();

        // oMasterSelector = await MasterSelector(MainView._viewName);
    });

    // it("should filter the list of invoice by business partner name", async () => {
    // const oFilterButton = await browser.asControl({
    //     selector: {
    //         interaction: "root",
    //         controlType: "sap.m.OverflowToolbar",
    //         id: "filterButtonBillingDocs",
    //         viewName: MainView._viewName,
    //     },
    // });

    //     // const oDialogFilter = await browser.asControl({
    //     //     forceSelect: true,
    //     //     selector: {
    //     //         interaction: "root",
    //     //         controlType: "sap.m.Dialog",
    //     //         id: "DialogId",
    //     //         // viewName: MainView._viewName,
    //     //     },
    //     // });

    //     // const oList = await browser.asControl({
    //     //     selector: {
    //     //         interaction: "root",
    //     //         controlType: "sap.m.List",
    //     //         id: "idList",
    //     //         // viewName: MainView._viewName,
    //     //     },
    //     // });

    //     // const dialogSelector = {
    //     //     forceSelect: true,
    //     //     selector: {
    //     //         id: "Dialog",
    //     //         controlType: "sap.m.Dialog",
    //     //         interaction: "root",
    //     //     },
    //     // };

    //     const items = oDialogFilter.getFilterItems();
    //     expect(items.length).toBeGreaterThanOrEqual(1);

    //     // const openButtonSelector = {
    //     //     forceSelect: true, // make sure we're retrieving from scratch
    //     //     selector: {
    //     //         id: idRegex
    //     //     }
    //     // }

    //     // const dialogSelector = {
    //     //     forceSelect: true,
    //     //     selector: {
    //     //         id: "Dialog",
    //     //         controlType: "sap.m.Dialog",
    //     //         interaction: "root"
    //     //     }
    //     // }

    //     // await browser.asControl(openButtonSelector).press()

    //     // const popup = await browser.asControl(dialogSelector)
    //     // await expect(await popup.getVisible()).toBeTruthy()

    //     // expect(oDialogFilter).toBeDefined();
    //     // await oFilterButton.press();

    //     // const filterItems = oDialogFilter.getGroupItems();
    //     // console.log(filterItems);
    // });

    it("should show info from fragment", async () => {
        // const oSortDialog = await browser.asControl(oMasterSelector.oDialog);

        const oFilterButton = await browser.asControl({
            selector: {
                interaction: "root",
                controlType: "sap.m.OverflowToolbar",
                id: "filterButtonBillingDocs",
                viewName: MainView._viewName,
            },
        });

        expect(oFilterButton.getText()).toBe("filter");

        // expect(oSortDialog._domId).toBeTruthy();
    });
});
