var inquirer = require("inquirer");
var pad = require('pad');
var uiText = require("./uitext");


var CommandLineInterface = function () {};

function appMessage(msg) {
    console.log(msg);
}

CommandLineInterface.prototype.startupMessage = function () {
    appMessage("Starting in command line mode.")
}

CommandLineInterface.prototype.displayProductList = function (productList) {
    appMessage(pad(8, "Item ID") + " " + pad("Department Name", 20) + " " + pad("Product Name", 20) + " " + pad(8, "Price") + " " + pad(16, "Stock Quantity"));
    appMessage(pad(78, "-", "-"));
    for (i = 0; i < productList.length; i++) {
        appMessage(pad(8, productList[i].item_id) + " " + pad(productList[i].department_name, 20) + " " + pad(productList[i].product_name, 20) + " " + pad(8, productList[i].price) + " " + pad(16, productList[i].stock_quantity));
    }
    appMessage(pad(78, "-", "-"));
}

CommandLineInterface.prototype.showCostOfOrder = function (item, order, next) {
    appMessage("---------------------------------------------------------")
    appMessage("Cost of order for " + order.itemQuantity+" of "+ item[0].product_name + " is " + (order.itemQuantity * item[0].price));
    next();
}

CommandLineInterface.prototype.takeUserBuyOrder = function (next) {
    appMessage("Customer Item Purchase");
    inquirer.prompt(uiText.placeItemOrder).then(function (order) {
        next(order);
    });
}

CommandLineInterface.prototype.addToInventory = function (cn, add, next) {
    inquirer.prompt(uiText.addToInventory).then(function (inventory) {
        add(cn, inventory, next);
    });
}

CommandLineInterface.prototype.addNewProduct = function (cn, add, next) {
    inquirer.prompt(uiText.addNewProduct).then(function (product) {
        add(cn, product, next);
    });
}

CommandLineInterface.prototype.unableToPlaceOrder = function (){
    appMessage("---------------------------------------------------------")
    appMessage("No enough Inventory Available for of this item");    
}

CommandLineInterface.prototype.managerOptions = function (cn, next) {
    inquirer.prompt(uiText.managerOptions).then(function (option) {
        next(cn, option.action);
    });
}
module.exports = new CommandLineInterface();
