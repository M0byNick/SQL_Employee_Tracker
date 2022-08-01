//Enable MySQL
const mysql = require("mysql");
//Establish connection port
var connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "M0byNick",
    database: "employeesDB",
});
//Return an error if there is a connection error
connection.connect(function(err) {
    if(err){
        return Promise.reject(err);
    }
});

module.exports = connection;