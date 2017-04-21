var db = require("./datalayer");
var dbConnection = require("./mysqlconnection");
var UI = require("./cndlineinterface.js");


function managerOptions(cn) {
    UI.managerOptions(dbConnection, processManagerOptions);
}

function processManagerOptions(cn, action) {
    switch (action) {
        case "View Products for Sale":
            db.getProductList(cn, UI.displayProductList, managerOptions);
            break;
        case "View Low Inventory":
            db.getLowProductList(cn, UI.displayProductList, 5, managerOptions);
            break;
        case "Add to Inventory":
            UI.addToInventory(cn, db.addToInventory, managerOptions);
            break;
        case "Add New Product":
            UI.addNewProduct(cn, db.addNewProduct, managerOptions);
            break;
    }
}


function connectToDB() {
    UI.startupMessage();
    dbConnection.connect(function (err) {
        if (err) {
            this.isConnected = false;
        } else {
            this.isConnected = true;
            managerOptions(dbConnection);
        }
    });
}

(function () {
    // connect to the database
    connectToDB();

})();
