/*!
 * ${copyright}
 */

// Provides the Design Time Metadata for the sap.m.Link control
sap.ui.define([],
	function () {
		"use strict";

	var oSelectTargetDialog = function(oControl, mPropertyBag) {
		return new Promise(function(fnResolve) {

			var oDialog = sap.ui.xmlfragment("sap.m.designtime.LinkTargetSelectDialog", this);
			oDialog.getBeginButton().attachPress(function(oEvent) {
				var sTargetValue = sap.ui.getCore().byId("targetCombo").getValue();

				fnResolve(sTargetValue);
				oDialog.close();
			});

			oDialog.getEndButton().attachPress(function(oEvent) {
				oDialog.close();
			});

			oDialog.attachEventOnce("afterClose", function(oEvent) {
				oDialog.destroy();
			});

			oDialog.addStyleClass(mPropertyBag.styleClass);
			oDialog.open();
		}).then(
				function (sTargetValue) {
					return [{
						selectorControl : oControl,
						changeSpecificData : {
							changeType : "changeLinkTarget",
							content : sTargetValue
						}
					}];
				}
			);
	};

	return {
		name : {
			singular : "LINK_NAME",
			plural : "LINK_NAME_PLURAL"
		},
		palette : {
			group : "ACTION",
			icons : {
				svg : "sap/m/designtime/Link.icon.svg"
			}
		},
		actions : {
			remove : {
				changeType : "hideControl"
			},
			reveal : {
				changeType : "unhideControl"
			},
			settings: function () {
				return {
					"changeLinkTarget": {
						name: "LINK_CHANGE_TARGET",
						isEnabled: function(oControl){
							return !!oControl.getHref();
						},
						handler: oSelectTargetDialog
					}
				};
			}
		},
		templates: {
			create: "sap/m/designtime/Link.create.fragment.xml"
		}
	};
}, /* bExport= */false);
