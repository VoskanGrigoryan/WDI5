export const MasterSelector = async (sViewName) => {
    return {
        oDialog: {
            selector: {
                interaction: "root",
                // controlType: "sap.m.Dialog",
                id: "DialogId",
                viewName: MainView._viewName,
            },
        },
    };
};
