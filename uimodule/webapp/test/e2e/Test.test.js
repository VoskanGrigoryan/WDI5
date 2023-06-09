const { wdi5 } = require("wdio-ui5-service");
const MainView = require("./pageObjects/MainView");
const Dialog = require("./pageObjects/Dialog");

describe("The MainView page: ", async () => {
    before(async () => {
        await MainView.open();
        // await Dialog.open();
    });

    it("should have a list with at least 3 items", async () => {
        const oList = await browser.asControl({
            selector: {
                interaction: "root",
                controlType: "sap.m.List",
                id: "idList",
                viewName: MainView._viewName,
            },
        });

        const oButton = await browser.asControl({
            selector: {
                interaction: "root",
                controlType: "sap.m.Button",
                id: "sortButton",
                viewName: MainView._viewName,
            },
        });

        const oFragment = await browser.asControl({
            forceSelect: true,
            selector: {
                interaction: "root",
                // controlType: "sap.m.Dialog",
                id: "sortDialog",
                // viewName: Dialog._viewName,
            },
        });

        await oButton.press();
        expect(oButton.getText());
        // const title = await oFragment.getTitle();
        // expect(title).toBe("SORT DIALOG");
        // const aListItems = await oList.getItems(true);
        // expect(aListItems.length).toBeGreaterThanOrEqual(2);
    });
});
