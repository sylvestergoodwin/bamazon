var db = require("./datalayer");
var dbConnection = require("./mysqlconnection");
var UI = require("./cndlineinterface.js");

function showProductList() {
    db.getProductList(dbConnection, UI.displayProductList, takeUserBuyOrder);
}


function placeOrder(order) {
    db.placeItemOrder(dbConnection, order, getItemDetail)
}

function getItemDetail(order, isOrderPlaced) {
    if (isOrderPlaced) {
        db.getItemDetail(dbConnection, order, showCostOforder);
    } else {
        UI.unableToPlaceOrder();
        db.getProductList(dbConnection, UI.displayProductList, takeUserBuyOrder);
    }

}

function showCostOforder(order, itemDetail) {
    UI.showCostOfOrder(itemDetail, order, showProductList);
}


function takeUserBuyOrder() {
    UI.takeUserBuyOrder(placeOrder);
}

function start() {
    UI.startupMessage();
    dbConnection.connect(function (err) {
        if (err) {
            console.log("DL-MYSQL CONNECTION FAILED");
            this.isConnected = false;
        } else {
            this.isConnected = true;
            db.getProductList(dbConnection, UI.displayProductList, takeUserBuyOrder);
        }
    });
}


(function () {
    start();
})();
