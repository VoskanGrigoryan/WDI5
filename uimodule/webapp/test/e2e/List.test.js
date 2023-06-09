const MainView = require("./pageObjects/MainView");

describe("The MainView page: ", async () => {
    before(async () => {
        await MainView.open();
    });

    it("should have a list that can sort ascendingly", async () => {
        const oSortButton = await browser.asControl({
            selector: {
                interaction: "root",
                controlType: "sap.m.Button",
                id: "sortButtonBalance",
                viewName: MainView._viewName,
            },
        });

        const oDialogSorting = await browser.asControl({
            selector: {
                interaction: "root",
                controlType: "sap.m.Dialog",
                id: "idSortDialog",
                viewName: MainView._viewName,
            },
        });

        //Simulate click on button and open dialog
        await oSortButton.press();

        const oSortDialogButtons = await oDialogSorting.getButtons();
        //position 1 should refer to the descending checkbox in the sorting dialog
        //position 2 should refer to net due date checkbox in the sorting dialog
        await oSortDialogButtons[0].firePress();
        await oSortDialogButtons[2].firePress();

        const oListAfter = await browser.asControl({
            selector: {
                interaction: "root",
                controlType: "sap.m.List",
                id: "idList",
                viewName: MainView._viewName,
            },
        });

        //Checks if sort order for the netDueDate option is ascending (default)
        const aListItemsAfter = await oListAfter.getItems();
        const aItemTextsAfter = await getListItemTitleTexts(aListItemsAfter);
        const sOrderDirection = await getSortDirection(aItemTextsAfter);
        expect(sOrderDirection).toBe("ascending");
    });
});

// netDueDate customerFullName AmountinDocumentCurrency
