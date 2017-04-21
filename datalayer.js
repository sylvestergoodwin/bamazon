var Data = function () {}

Data.prototype.getProductList = function (cn, display, next) {
    cn.query('SELECT * from products', function (err, rows, fields) {
        if (!err) {
            display(rows);
            next();
        } else {
            console.log('Error while performing Query.');
        }
    });
}

Data.prototype.getItemDetail = function (cn, order, next) {
    cn.query('SELECT * from products where item_id = ?', [order.itemID], function (err, rows, fields) {
        if (!err) {
            next(order, rows);
        } else {
            console.log('Error while performing Query.');
        }
    });
}




Data.prototype.placeItemOrder = function (cn, order, next) {
    cn.query('UPDATE products SET stock_quantity = (stock_quantity - ?) WHERE item_id = ? and (stock_quantity - ?) > 0 ', [order.itemQuantity, order.itemID, order.itemQuantity], function (err, rows, fields) {
        if (!err) {
            var status = true;
            cn.commit(function (err) {
                if (!err) {;
                    if (rows.changedRows == 0) {
                        status = false
                    }
                    next(order, status);
                }
            });
        } else {
            console.log('Error while performing Query.');
        }
    });
}

Data.prototype.addToInventory = function (cn, order, next) {
    cn.query('UPDATE products SET stock_quantity = (stock_quantity + ?) WHERE item_id = ? ', [order.itemQuantity, order.itemID], function (err, rows, fields) {
        if (!err) {
            cn.commit(function (err) {
                if (!err) {
                    next();
                } else {
                    console.log('Error while performing Query.');
                }
            });
        } else {
            console.log('Error while performing Query.');
        }
    });
}


Data.prototype.addNewProduct = function (cn, product, next) {
    cn.query('INSERT INTO products SET ?', [{
        department_name: product.department_name,
        product_name: product.product_name,
        price: product.price,
        stock_quantity: product.stock_quantity
    }], function (err, rows, fields) {
        if (!err) {
            cn.commit(function (err) {
                if (!err) {
                    next();
                }
            });
        } else {
            console.log('Error while performing Query.');
        }
    });
}
Data.prototype.getLowProductList = function (cn, display, max, next) {
    cn.query('SELECT * from products where stock_quantity < ?', [max], function (err, rows, fields) {
        if (!err) {
            display(rows);
            next();
        } else {
            console.log('Error while performing Query.');
        }
    });
}


module.exports = new Data();
