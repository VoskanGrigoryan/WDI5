const MainView = require("./pageObjects/MainView");
// import allureReporter from "@wdio/allure-reporter";
// const allureReporter = require("@wdio/allure-reporter");
const { addFeature, addTestId } = require("@wdio/allure-reporter").default;

describe("The MainView page: ", async () => {
    // before(async () => {
    //     await MainView.open();
    // });

    it("should find the mainView button", async () => {
        const selector = {
            selector: {
                controlType: "sap.m.Button",
            },
        };

        // allureReporter.addFeature("Feature");
        // addFeature("Feature");

        // // allureReporter.addTestId("TESTID1");
        // addTestId("TESTID1");
        const buttons = await browser.allControls(selector);
        expect(buttons).toBeExisting();
    });
});
