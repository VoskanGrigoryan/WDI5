const Page = require("./page");

class Dialog extends Page {
    async open() {
        await super.open("#/");
    }

    // _viewName = "demowdi5.demowdi5.view.Dialog";
    _viewName = "demowdi5.demowdi5.view.Dialog";
    // _viewName = "demowdi5.demowdi5.fragments.FilterDialog.fragment.xml";
    // demo_wdi5\uimodule\webapp\fragments\FilterDialog.fragment.xml
}

module.exports = new Dialog();
