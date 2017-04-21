var userAction = [
    {

    }
]

var managerOptions = [
    {
        type: "list",
        message: "Choose one of the following operations",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "action"
                        }
]

var itemOrder = [
    {
        type: "item",
        message: "Enter the Item ID:",
        name: "itemID"
                        },
    {
        type: "item",
        message: "Enter the Quantity",
        name: "itemQuantity"
                        }
];

var addToInventory = [
    {
        type: "item",
        message: "Enter the Item ID:",
        name: "itemID"
                        },
    {
        type: "item",
        message: "Enter the Quantity",
        name: "itemQuantity"
                        }
    
]
var addNewProduct = [
    {
        type: "item",
        message: "Enter the Product Name:",
        name: "product_name"
                        },
    {
        type: "item",
        message: "Enter the Department name:",
        name: "department_name"
                        },
    {
        type: "item",
        message: "Enter the Item Price:",
        name: "price"
                        },
    {
        type: "item",
        message: "Enter the Quantity",
        name: "stock_quantity"
                        }
];

var appStatus = {

};

var appPrompt = {
    placeItemOrder: itemOrder,
    managerOptions: managerOptions,
    addToInventory: addToInventory,
    addNewProduct: addNewProduct
};

module.exports = appPrompt;
