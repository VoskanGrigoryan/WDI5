sap.ui.define(
    [
        "./BaseController",
        "demowdi5/demowdi5/util/Object",
        "sap/ui/model/json/JSONModel",
        "demowdi5/demowdi5/util/Constants",
        "sap/m/library",
        "sap/ui/Device",
        "sap/ui/model/FilterOperator",
        "sap/ui/model/Filter",
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Object, JSONModel, Constants, mLibrary, Device, FilterOperator, Filter) {
        "use strict";

        return Controller.extend("demowdi5.demowdi5.controller.MainView", {
            onInit: function () {
                this.mViewSettingsDialogs = {};
                var oComponent = this.getOwnerComponent();

                var oModel = new JSONModel(Object.DATA);

                oComponent.setModel(oModel, "listItemsModel");
            },

            onDefaultDialogPress: function () {
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "demowdi5.demowdi5.view.fragments.sorterPopup",
                    });
                }
                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },

            onSortListConfirm: function () {
                alert("sort dialog clicked");
                this.openSettingDialog(this.byId("sortDialog"), "demowdi5.demowdi5.view.fragments.sorterPopup");
            },

            openSettingDialog: function (oDialog, sFrgamentId) {
                try {
                    if (!oDialog) {
                        this.getViewSettingsDialog(sFrgamentId).then(
                            function (oViewSettingsDialog) {
                                this.getView().addDependent(oViewSettingsDialog);
                                oViewSettingsDialog.open();
                            }.bind(this)
                        );
                    } else {
                        oDialog.open();
                    }
                } catch (oError) {
                    console.log(oError);
                }
            },

            getViewSettingsDialog: function (sDialogFragmentName) {
                let pDialog = this._mViewSettingsDialogs[sDialogFragmentName];

                if (!pDialog) {
                    pDialog = Fragment.load({
                        id: this.getView().getId(),
                        name: sDialogFragmentName,
                        controller: this,
                    }).then(function (oDialog) {
                        if (Device.system.desktop) {
                            oDialog.addStyleClass("sapUiSizeCompact");
                        }
                        return oDialog;
                    });
                    this._mViewSettingsDialogs[sDialogFragmentName] = pDialog;
                }
                return pDialog;
            },

            onFilterInstructions: function () {
                this.createViewSettingsDialog(Constants.ROUTES.fragments.filterDialog).open();
            },

            createViewSettingsDialog: function (sDialogFragment) {
                let oDialog = this.mViewSettingsDialogs[sDialogFragment];
                if (!oDialog) {
                    oDialog = sap.ui.xmlfragment(sDialogFragment, this);
                    this.mViewSettingsDialogs[sDialogFragment] = oDialog;
                    this.getView().addDependent(oDialog);

                    if (!Device.system.desktop) {
                        oDialog.addStyleClass("sapUiSizeCompact");
                    }
                    oDialog.setFilterSearchOperator(mLibrary.StringFilterOperator.Contains);

                    if (sDialogFragment === Constants.ROUTES.fragments.filterDialog) {
                        let oItemsModel = this.getOwnerComponent().getModel(Constants.MODEL.listItemsModel).getData();

                        let jsonIdInstruction = JSON.parse(JSON.stringify(oItemsModel, [Constants.FILTERFIELDS.fIdInstruction])),
                            jsonCompanyCode = JSON.parse(JSON.stringify(oItemsModel, [Constants.FILTERFIELDS.fCompanyCode])),
                            jsonBillingRequestorName = JSON.parse(JSON.stringify(oItemsModel, [Constants.FILTERFIELDS.fBillingRequestor])),
                            jsonBusinessPartnerName = JSON.parse(JSON.stringify(oItemsModel, [Constants.FILTERFIELDS.fBusinessPartnerName]));

                        oDialog.setModel(oItemsModel);

                        // --- Check duplicated values
                        jsonIdInstruction = jsonIdInstruction.filter(function (currentObject) {
                            if (currentObject.IdInstruction in jsonIdInstruction) {
                                return false;
                            } else {
                                jsonIdInstruction[currentObject.IdInstruction] = true;
                                return true;
                            }
                        });

                        jsonCompanyCode = jsonCompanyCode.filter(function (currentObject) {
                            if (currentObject.Companycode in jsonCompanyCode) {
                                return false;
                            } else {
                                jsonCompanyCode[currentObject.Companycode] = true;
                                return true;
                            }
                        });

                        jsonBillingRequestorName = jsonBillingRequestorName.filter(function (currentObject) {
                            if (currentObject.BillingRequestorName in jsonBillingRequestorName) {
                                return false;
                            } else {
                                jsonBillingRequestorName[currentObject.BillingRequestorName] = true;
                                return true;
                            }
                        });

                        jsonBusinessPartnerName = jsonBusinessPartnerName.filter(function (currentObject) {
                            if (currentObject.businessPartnerName in jsonBusinessPartnerName) {
                                return false;
                            } else {
                                jsonBusinessPartnerName[currentObject.businessPartnerName] = true;
                                return true;
                            }
                        });

                        // --- Iteration of items
                        var aIdInstruction = [];
                        for (var i = 0; i < jsonIdInstruction.length; i++) {
                            aIdInstruction.push(
                                new sap.m.ViewSettingsItem({
                                    text: jsonIdInstruction[i].IdInstruction,
                                    key: Constants.FILTERFIELDS.fIdInstruction,
                                })
                            );
                        }

                        var aCompanycode = [];
                        for (var i = 0; i < jsonCompanyCode.length; i++) {
                            aCompanycode.push(
                                new sap.m.ViewSettingsItem({
                                    text: jsonCompanyCode[i].Companycode,
                                    key: Constants.FILTERFIELDS.fCompanyCode,
                                })
                            );
                        }

                        var aBillingRequestor = [];
                        for (var i = 0; i < jsonBillingRequestorName.length; i++) {
                            aBillingRequestor.push(
                                new sap.m.ViewSettingsItem({
                                    text: jsonBillingRequestorName[i].BillingRequestorName,
                                    key: Constants.FILTERFIELDS.fBillingRequestor,
                                })
                            );
                        }

                        var aBusinessPartnerName = [];
                        for (var i = 0; i < jsonBillingRequestorName.length; i++) {
                            aBusinessPartnerName.push(
                                new sap.m.ViewSettingsItem({
                                    text: jsonBusinessPartnerName[i].businessPartnerName,
                                    key: Constants.FILTERFIELDS.fBusinessPartnerName,
                                })
                            );
                        }

                        //Setting filter items
                        oDialog.destroyFilterItems();
                        oDialog.addFilterItem(
                            new sap.m.ViewSettingsFilterItem({
                                key: Constants.FILTERFIELDS.fIdInstruction,
                                text: Constants.FILTERFIELDS.fTextIdIntruction,
                                items: aIdInstruction,
                            })
                        );

                        oDialog.addFilterItem(
                            new sap.m.ViewSettingsFilterItem({
                                key: Constants.FILTERFIELDS.fCompanyCode,
                                text: Constants.FILTERFIELDS.fTextCompanyCode,
                                items: aCompanycode,
                            })
                        );

                        oDialog.addFilterItem(
                            new sap.m.ViewSettingsFilterItem({
                                key: Constants.FILTERFIELDS.fBillingRequestor,
                                text: Constants.FILTERFIELDS.fTextBillingRequestor,
                                items: aBillingRequestor,
                            })
                        );

                        oDialog.addFilterItem(
                            new sap.m.ViewSettingsFilterItem({
                                key: Constants.FILTERFIELDS.fBusinessPartnerName,
                                text: Constants.FILTERFIELDS.fTextBusinessPartnerName,
                                items: aBusinessPartnerName,
                            })
                        );
                    }
                }
                return oDialog;
            },

            onFilterConfirm: function (oEvent) {
                let oList = this.getView().byId(Constants.IDS.list),
                    mParams = oEvent.getParameters(),
                    oBinding = oList.getBinding("items"),
                    aFilters = [];
                mParams.filterItems.forEach(function (oItem) {
                    let sPath = oItem.getKey(),
                        sOperator = FilterOperator.EQ,
                        sValue1 = oItem.getText(),
                        oFilter = new Filter(sPath, sOperator, sValue1);

                    aFilters.push(oFilter);
                });
                oBinding.filter(aFilters);
                this.toggleInfoToolbarLabel(aFilters);
                this.handleItemsCounter(oBinding.getLength());
            },
        });
    }
);
