var connection = require("mysql").createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Inuyasha89",
    database: "bamazon"
});


//console.log(connection);
module.exports = connection;